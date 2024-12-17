import { useState } from "react";
import { PlusCircle, Star, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Modal from "../components/ui/Modal";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectForm from "../components/projects/ProjectForm";
import Input from "../components/ui/Input";
import { useProjects } from "../hooks/useProjects";
import type { Project } from "../types/project";

const Projects = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pendingAction, setPendingAction] = useState<{
    type: "add" | "delete" | "feature";
    projectId?: string;
    featured?: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { projects, isLoading, createProject, toggleFeatured, deleteProject } =
    useProjects();

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Verificar credenciales contra data.json
    try {
      const response = await fetch("/src/data/data.json");
      const data = await response.json();
      
      if (data.auth.username === username && data.auth.password === password) {
        setIsAuthModalOpen(false);
        if (pendingAction) {
          switch (pendingAction.type) {
            case "add":
              setIsAddModalOpen(true);
              break;
            case "delete":
              if (pendingAction.projectId) {
                deleteProject.mutate(pendingAction.projectId);
              }
              break;
            case "feature":
              if (pendingAction.projectId !== undefined && pendingAction.featured !== undefined) {
                toggleFeatured.mutate({
                  id: pendingAction.projectId,
                  featured: pendingAction.featured,
                });
              }
              break;
          }
        }
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("Authentication failed");
    }

    setPendingAction(null);
    setUsername("");
    setPassword("");
  };

  const handleAction = (
    type: "add" | "delete" | "feature",
    projectId?: string,
    featured?: boolean
  ) => {
    setPendingAction({ type, projectId, featured });
    setIsAuthModalOpen(true);
  };

  const handleProjectSubmit = (formData: any) => {
    createProject.mutate(formData);
    setIsAddModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-orbitron text-neon-blue">Projects</h1>
        <button
          onClick={() => handleAction("add")}
          className="btn-primary flex items-center gap-2"
        >
          <PlusCircle size={20} />
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: Project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative group">
              <ProjectCard {...project} />
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() =>
                    handleAction("feature", project.id, !project.isFeatured)
                  }
                  className={`p-2 rounded-full ${
                    project.isFeatured
                      ? "bg-yellow-500/20 text-yellow-500"
                      : "bg-gray-500/20 text-gray-400"
                  } hover:bg-yellow-500/40 transition-colors`}
                  title={
                    project.isFeatured
                      ? "Remove from featured"
                      : "Add to featured"
                  }
                >
                  <Star
                    size={20}
                    fill={project.isFeatured ? "currentColor" : "none"}
                  />
                </button>
                <button
                  onClick={() => handleAction("delete", project.id)}
                  className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors"
                  title="Delete project"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Authentication Modal */}
      <Modal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setPendingAction(null);
          setError(null);
          setUsername("");
          setPassword("");
        }}
        title="Authentication Required"
      >
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-lg">
              {error}
            </div>
          )}
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <button type="submit" className="btn-primary w-full">
            Login
          </button>
        </form>
      </Modal>

      {/* Add Project Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Project"
      >
        <ProjectForm onSubmit={handleProjectSubmit} />
      </Modal>
    </div>
  );
};

export default Projects;