export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  objective?: string;
  deployUrl?: string;
  frontendUrl?: string;
  backendUrl?: string;
  imageUrl: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  title: string;
  description: string;
  technologies: string[];
  objective?: string;
  deployUrl?: string;
  frontendUrl?: string;
  backendUrl?: string;
  image: FileList;
}