import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Mail, Phone, MapPin, Globe } from "lucide-react";
import { generateResumePDF } from "../services/pdfService";
import type { ResumeData } from "../types/resume";

const Resume = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeData] = useState<ResumeData>({
    name: "Pedro Rodríguez",
    title: `Full Stack Developer \n & \n Software Engineer`,
    contact: {
      email: "pro.pedro0413@gmail.com",
      phone: "+57 3228854498",
      location: "Bogota DC, Colombia",
      portfolio: "portfolio.pedrorodriguez.dev",
    },
    skills: {
      frontend: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Contenful",
      ],
      backend: ["Node.js", "Express.js", "PostgreSQL", "RESTful APIs"],
    },
    experience: [
      {
        role: "Junior Full Stack Developer",
        company: "Estarter Technology Sas.",
        period: "2024 - Present",
        achievements: [
          "Designed a transportation booking system with real-time management.",
          "Automated workflows using tools like Twilio and Make.",
          "Implemented a CRM to increase team efficiency by 30%.",
          "Mentored team members in technical skills.",
        ],
      },
      {
        role: "Commercial Manager",
        company: "Estarter Technology Sas.",
        period: "2023 - 2024",
        achievements: [
          "Led B2B sales operations through CRM platforms.",
          "Negotiated strategic contracts to boost revenue.",
          "Developed sales strategies for market expansion.",
        ],
      },
    ],
    education: [
      {
        degree: "Analisis y Desarrollo de Software",
        institution: "Servicio Nacional De Aprendizaje - SENA",
        period: "2023 - 2025",
      },
      {
        degree: "IA para Directores",
        institution: "Banana Script",
        period: "2024 - 2024",
      },
    ],
  });

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      const doc = generateResumePDF(resumeData);
      doc.save("pedro-rodriguez-resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-orbitron text-neon-blue">Resume</h1>
        <button
          onClick={handleDownload}
          className="btn-primary flex items-center gap-2"
          disabled={isGenerating}
        >
          <Download size={20} />
          {isGenerating ? "Generating PDF..." : "Download PDF"}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8"
      >
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-orbitron text-neon-blue mb-4">
            {resumeData.name}
          </h2>
          <p className="text-xl text-gray-300 mb-4">{resumeData.title}</p>
          <div className="flex flex-wrap gap-4 text-gray-300">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-electric-purple" />
              {resumeData.contact.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-electric-purple" />
              {resumeData.contact.phone}
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-electric-purple" />
              {resumeData.contact.location}
            </div>
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-electric-purple" />
              {resumeData.contact.portfolio}
            </div>
          </div>
        </div>

        {/* Skills */}
        <section className="mb-8">
          <h3 className="text-xl font-orbitron text-electric-purple mb-4">
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-neon-blue mb-2">Frontend Development</h4>
              <ul className="list-disc list-inside text-gray-300">
                {resumeData.skills.frontend.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-neon-blue mb-2">Backend Development</h4>
              <ul className="list-disc list-inside text-gray-300">
                {resumeData.skills.backend.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h3 className="text-xl font-orbitron text-electric-purple mb-4">
            Professional Experience
          </h3>
          {resumeData.experience.map((job, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between mb-2">
                <h4 className="text-neon-blue">{job.role}</h4>
                <span className="text-gray-400">{job.period}</span>
              </div>
              <p className="text-electric-purple mb-2">{job.company}</p>
              <ul className="list-disc list-inside text-gray-300">
                {job.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section>
          <h3 className="text-xl font-orbitron text-electric-purple mb-4">
            Education
          </h3>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mt-4">
              <div className="flex justify-between">
                <h4 className="text-neon-blue">{edu.degree}</h4>
                <span className="text-gray-400">{edu.period}</span>
              </div>
              <p className="text-electric-purple">{edu.institution}</p>
            </div>
          ))}
        </section>
      </motion.div>
    </div>
  );
};

export default Resume;
