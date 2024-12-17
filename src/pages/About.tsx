import { motion } from "framer-motion";
import { Code2, Database, Server, Globe } from "lucide-react";

const About = () => {
  const skills = [
    {
      icon: Code2,
      title: "Frontend Development",
      description:
        "Creating responsive and interactive user interfaces using modern frameworks and libraries.",
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    },
    {
      icon: Server,
      title: "Backend Development",
      description:
        "Building scalable server-side applications and RESTful APIs.",
      technologies: ["Node.js", "Express", "NestJS"],
    },
    {
      icon: Database,
      title: "Database Management",
      description:
        "Designing and optimizing database schemas for efficient data",
      technologies: ["PostgreSQL", "SQLServer", "MongoDB"],
    },
    {
      icon: Globe,
      title: "DevOps & Cloud",
      description:
        "Deploying and maintaining applications in cloud environments.",
      technologies: ["Docker", "AWS", "Vercel"],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-orbitron text-neon-blue mb-8">About Me</h1>

      {/* Bio Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 mb-8"
      >
        <h2 className="text-2xl font-orbitron text-electric-purple mb-4">
          Hello, I'm Pedro 👋
        </h2>
        <div className="space-y-4 text-gray-300">
          <p>
            I'm a Full Stack Developer passionate about creating impactful and
            scalable web solutions. My journey in development is driven by a
            strong curiosity to understand and build systems that solve
            real-world problems. I've had the privilege of working on diverse
            projects, from automating workflows to building complete CRM systems
            and booking platforms.
          </p>
          <p>
            I specialize in Backend Development, where I craft robust APIs and
            manage relational databases using PostgreSQL. I take pride in
            building scalable solutions that can grow with the business needs.
            For Frontend Development, I focus on creating seamless user
            experiences, using modern tools like React to ensure the interfaces
            are intuitive and visually appealing.{" "}
          </p>

          <p>
            {" "}
            Additionally, I have experience in Process Automation—streamlining
            workflows and reducing manual tasks using powerful tools like N8N
            and Make. By automating processes, I help businesses improve
            efficiency and free up valuable time for more strategic work.
          </p>
          <p>
            When I'm not coding, you'll find me creating educational content for
            my YouTube channel, CodeAmigos, where I share tutorials and insights
            about programming and technology. I'm also a firm believer in the
            power of mentorship, actively supporting peers and team members to
            grow their technical skills.
          </p>
        </div>
      </motion.section>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <Icon size={32} className="text-electric-purple mb-4" />
              <h3 className="text-xl font-orbitron text-neon-blue mb-2">
                {skill.title}
              </h3>
              <p className="text-gray-300 mb-4">{skill.description}</p>
              <div className="flex flex-wrap gap-2">
                {skill.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm bg-electric-purple/20 rounded-full border border-electric-purple"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default About;
