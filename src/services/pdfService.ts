import jsPDF from "jspdf";
import { format } from "date-fns";
import type { ResumeData } from "../types/resume";

// Constantes para el diseño
const COLORS = {
  primary: [29, 118, 203], // #1d76cb
  white: [255, 255, 255],
  black: [0, 0, 0],
  gray: [128, 128, 128],
};

const LAYOUT = {
  leftPanel: {
    width: 74, // 35% of 210mm (A4 width)
    x: 0,
    color: COLORS.primary,
  },
  rightPanel: {
    width: 136, // 65% of 210mm
    x: 74,
    color: COLORS.white,
  },
};

export const generateResumePDF = (data: ResumeData) => {
  // Crear documento A4
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageHeight = doc.internal.pageSize.height;

  // Dibujar paneles de fondo
  doc.setFillColor(...LAYOUT.leftPanel.color);
  doc.rect(0, 0, LAYOUT.leftPanel.width, pageHeight, "F");

  doc.setFillColor(...LAYOUT.rightPanel.color);
  doc.rect(LAYOUT.leftPanel.width, 0, LAYOUT.rightPanel.width, pageHeight, "F");

  // Panel Izquierdo
  const drawLeftPanel = () => {
    doc.setTextColor(...COLORS.white);

    // Nombre y título
    doc.setFontSize(20);
    doc.text(data.name, 10, 40);

    doc.setFontSize(14);
    doc.text(data.title, 10, 50);

    // Perfil
    doc.setFontSize(12);
    doc.text("PROFILE", 10, 70);
    const profileText = doc.splitTextToSize(
      "Full Stack Developer with extensive experience in web development and software engineering. Passionate about creating efficient and scalable solutions.",
      LAYOUT.leftPanel.width - 20
    );
    doc.setFontSize(10);
    doc.text(profileText, 10, 80);

    // Contacto
    doc.setFontSize(12);
    doc.text("CONTACT", 10, 120);
    doc.setFontSize(10);
    doc.text(data.contact.email, 10, 130);
    doc.text(data.contact.phone, 10, 138);
    doc.text(data.contact.location, 10, 146);
    if (data.contact.portfolio) {
      doc.text(data.contact.portfolio, 10, 154);
    }

    // Idiomas
    doc.setFontSize(12);
    doc.text("LANGUAGES", 10, 180);
    doc.setFontSize(10);

    const languages = [
      { name: "English", level: 100 },
      { name: "Spanish", level: 100 },
    ];

    let yPos = 190;
    languages.forEach((lang) => {
      doc.text(lang.name, 10, yPos);
      // Barra de nivel
      doc.setDrawColor(...COLORS.white);
      doc.setFillColor(...COLORS.white);
      doc.rect(40, yPos - 3, 25 * (lang.level / 100), 2, "F");
      yPos += 10;
    });
  };

  // Panel Derecho
  const drawRightPanel = () => {
    doc.setTextColor(...COLORS.black);

    // Experiencia Profesional
    doc.setFontSize(16);
    doc.text("PROFESSIONAL EXPERIENCE", LAYOUT.leftPanel.width + 10, 40);

    let yPos = 50;
    data.experience.forEach((exp) => {
      doc.setFontSize(12);
      doc.text(exp.role, LAYOUT.leftPanel.width + 10, yPos);

      doc.setFontSize(10);
      doc.setTextColor(...COLORS.gray);
      doc.text(
        `${exp.company} | ${exp.period}`,
        LAYOUT.leftPanel.width + 10,
        yPos + 6
      );

      doc.setTextColor(...COLORS.black);
      yPos += 12;

      exp.achievements.forEach((achievement) => {
        const bulletPoint = "•";
        const text = doc.splitTextToSize(
          achievement,
          LAYOUT.rightPanel.width - 20
        );
        doc.text(bulletPoint, LAYOUT.leftPanel.width + 10, yPos);
        doc.text(text, LAYOUT.leftPanel.width + 15, yPos);
        yPos += text.length * 5;
      });

      yPos += 5;
    });

    // Educación
    yPos += 10;
    doc.setFontSize(16);
    doc.text("EDUCATION", LAYOUT.leftPanel.width + 10, yPos);

    data.education.forEach((edu) => {
      yPos += 10;
      doc.setFontSize(12);
      doc.text(edu.degree, LAYOUT.leftPanel.width + 10, yPos);

      doc.setFontSize(10);
      doc.setTextColor(...COLORS.gray);
      doc.text(
        `${edu.institution} | ${edu.period}`,
        LAYOUT.leftPanel.width + 10,
        yPos + 6
      );
      doc.setTextColor(...COLORS.black);

      yPos += 15;
    });

    // Habilidades Técnicas
    yPos += 10;
    doc.setFontSize(16);
    doc.text("TECHNICAL SKILLS", LAYOUT.leftPanel.width + 10, yPos);

    yPos += 10;
    doc.setFontSize(12);
    doc.text("Frontend:", LAYOUT.leftPanel.width + 10, yPos);
    doc.setFontSize(10);
    const frontendSkills = doc.splitTextToSize(
      data.skills.frontend.join(" • "),
      LAYOUT.rightPanel.width - 20
    );
    doc.text(frontendSkills, LAYOUT.leftPanel.width + 10, yPos + 6);

    yPos += frontendSkills.length * 6 + 10;
    doc.setFontSize(12);
    doc.text("Backend:", LAYOUT.leftPanel.width + 10, yPos);
    doc.setFontSize(10);
    const backendSkills = doc.splitTextToSize(
      data.skills.backend.join(" • "),
      LAYOUT.rightPanel.width - 20
    );
    doc.text(backendSkills, LAYOUT.leftPanel.width + 10, yPos + 6);
  };

  // Dibujar ambos paneles
  drawLeftPanel();
  drawRightPanel();

  // Pie de página
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.gray);
  const today = format(new Date(), "MMMM d, yyyy");
  doc.text(`Generated on ${today}`, 10, pageHeight - 10);

  return doc;
};
