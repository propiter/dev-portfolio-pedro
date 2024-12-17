import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectStorage } from "../services/storage/projetStorage";

export const useProjects = () => {
  const queryClient = useQueryClient();

  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: projectStorage.getAllProjects.bind(projectStorage),
  });

  const {
    data: featuredProjects = [],
    isLoading: isFeaturedLoading,
    error: featuredError,
  } = useQuery({
    queryKey: ["featuredProjects"],
    queryFn: projectStorage.getFeaturedProjects.bind(projectStorage),
  });

  const createProject = useMutation({
    mutationFn: (data: any) => projectStorage.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["featuredProjects"] });
    },
  });

  const toggleFeatured = useMutation({
    mutationFn: ({ id, featured }: { id: string; featured: boolean }) =>
      projectStorage.toggleProjectFeatured(id, featured),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["featuredProjects"] });
    },
  });

  const deleteProject = useMutation({
    mutationFn: (id: string) => projectStorage.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["featuredProjects"] });
    },
  });

  return {
    projects,
    featuredProjects,
    isLoading,
    isFeaturedLoading,
    error,
    featuredError,
    createProject,
    toggleFeatured,
    deleteProject,
  };
};