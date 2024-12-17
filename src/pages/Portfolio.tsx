import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/projects/ProjectCard';
import { useProjects } from '../hooks/useProjects';
import { SOCIAL_LINKS } from '../config/constants';

const Portfolio = () => {
  const { featuredProjects, isFeaturedLoading, featuredError } = useProjects();

  // Filtrar solo los proyectos marcados como featured
  const filteredFeaturedProjects = featuredProjects.filter(project => project.isFeatured);

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 min-h-screen relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-electric-purple">
            Pedro Rodríguez
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Full Stack Developer & Software Engineer
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href={SOCIAL_LINKS.GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Github className="inline-block mr-2" size={20} />
              GitHub
            </a>
            <a
              href={SOCIAL_LINKS.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Linkedin className="inline-block mr-2" size={20} />
              LinkedIn
            </a>
            <a href={SOCIAL_LINKS.EMAIL} className="btn-primary">
              <Mail className="inline-block mr-2" size={20} />
              Contact
            </a>
            <Link to="/resume" className="btn-primary">
              <Download className="inline-block mr-2" size={20} />
              Resume
            </Link>
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 cursor-pointer"
          onClick={() => {
            document.getElementById('featured-projects')?.scrollIntoView({
              behavior: 'smooth',
            });
          }}
        >
          <ChevronDown size={32} className="text-neon-blue" />
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section
        id="featured-projects"
        className="py-20 px-4 md:px-8 bg-gradient-to-b from-dark-void to-space-gray"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-orbitron text-neon-blue mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my expertise in
              full-stack development, system architecture, and problem-solving.
            </p>
          </motion.div>

          {featuredError && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-lg mb-8 text-center">
              {featuredError instanceof Error ? featuredError.message : 'Failed to load featured projects'}
            </div>
          )}

          {isFeaturedLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredFeaturedProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <ProjectCard {...project} />
                  </motion.div>
                ))}
              </div>

              {filteredFeaturedProjects.length === 0 && !featuredError && (
                <p className="text-center text-gray-400">No featured projects yet.</p>
              )}
            </>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 btn-primary text-lg"
            >
              View All Projects
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;