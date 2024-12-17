import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  link?: string;
}

const experiences: Experience[] = [
  {
    title: "Junior Full Stack Developer",
    company: "Estarter technololy SAS",
    location: "Bogotá DC, Colombia",
    period: "2024 - Present",
    description: [
      "Designed and implemented a transportation booking system with dynamic fare calculation, Wompi payment integration, and real-time driver assignment management.",
      "Automated processes using tools like Twilio and Make, optimizing internal workflows",
      "Implemented a complete CRM for managing clients and sales teams at Estarter.co, increasing team efficiency by 30%",
    ],
    technologies: ["React", "Node.js", "TypeScript", "Mui", "Postgresql"],
    link: "https://estarter.co/",
  },
  // Add more experiences as needed
];

const Experience = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-orbitron text-neon-blue mb-8">Experience</h1>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-electric-purple/30 ml-6 md:ml-8" />

        {/* Experience cards */}
        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={`${experience.company}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-16 md:pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 w-12 h-12 rounded-full bg-dark-void border-2 border-electric-purple flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-electric-purple animate-pulse" />
              </div>

              <div className="glass-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-orbitron text-neon-blue">
                      {experience.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 text-gray-300 mt-2">
                      <span className="flex items-center gap-2">
                        <Calendar size={16} className="text-electric-purple" />
                        {experience.period}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin size={16} className="text-electric-purple" />
                        {experience.location}
                      </span>
                    </div>
                  </div>
                  {experience.link && (
                    <a
                      href={experience.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-electric-purple hover:text-neon-blue transition-colors"
                    >
                      <ExternalLink size={16} />
                      Visit Company
                    </a>
                  )}
                </div>

                <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
                  {experience.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-electric-purple/20 rounded-full border border-electric-purple"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
