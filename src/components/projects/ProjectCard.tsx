import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface ProjectProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  deployUrl?: string;
  frontendUrl?: string;
  backendUrl?: string;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  imageUrl,
  deployUrl,
  frontendUrl,
  backendUrl,
}: ProjectProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-orbitron text-neon-blue mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {Array.isArray(technologies) &&
            technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm bg-electric-purple/20 rounded-full border border-electric-purple"
              >
                {tech}
              </span>
            ))}
        </div>
        <div className="flex gap-4">
          {deployUrl && (
            <a
              href={deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-neon-blue hover:text-white transition-colors"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
          {frontendUrl && (
            <a
              href={frontendUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-neon-blue hover:text-white transition-colors"
            >
              <Github size={16} />
              Frontend
            </a>
          )}
          {backendUrl && (
            <a
              href={backendUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-neon-blue hover:text-white transition-colors"
            >
              <Github size={16} />
              Backend
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
