import { Project } from "../../types/project";
import { StorageBase } from "./storageBase";

export class ProjectStorage extends StorageBase {
  getAllProjects(): Project[] {
    const data = this.getData();
    return data.projects || [];
  }

  getFeaturedProjects(): Project[] {
    const data = this.getData();
    return (data.projects || []).filter((p: Project) => p.isFeatured);
  }

  createProject(projectData: any) {
    const data = this.getData();
    const newProject = {
      id: crypto.randomUUID(),
      title: projectData.title,
      description: projectData.description,
      technologies: projectData.technologies
        .split(",")
        .map((t: string) => t.trim()),
      deployUrl: projectData.deployUrl,
      frontendUrl: projectData.frontendUrl,
      backendUrl: projectData.backendUrl,
      imageUrl: projectData.image,
      isFeatured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.projects = [...(data.projects || []), newProject];
    this.saveData(data);
    return newProject;
  }

  toggleProjectFeatured(id: string, featured: boolean) {
    const data = this.getData();
    data.projects = (data.projects || []).map((p: Project) =>
      p.id === id ? { ...p, isFeatured: featured } : p
    );
    this.saveData(data);
    return data.projects.find((p: Project) => p.id === id);
  }

  deleteProject(id: string) {
    const data = this.getData();
    data.projects = (data.projects || []).filter((p: Project) => p.id !== id);
    this.saveData(data);
  }
}

export const projectStorage = new ProjectStorage();
