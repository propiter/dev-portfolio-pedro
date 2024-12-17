import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";

interface ProjectFormData {
  title: string;
  description: string;
  technologies: string;
  deployUrl?: string;
  frontendUrl?: string;
  backendUrl?: string;
  image: string;
}

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
}

const ProjectForm = ({ onSubmit }: ProjectFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ProjectFormData>({
    mode: "onChange",
  });

  return (
    <div className="max-h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4">
        <Input
          label="Project Title"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
          })}
          error={touchedFields.title ? errors.title?.message : undefined}
        />

        <TextArea
          label="Description"
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
          error={
            touchedFields.description ? errors.description?.message : undefined
          }
          rows={4}
        />

        <Input
          label="Technologies (comma separated)"
          {...register("technologies", {
            required: "Technologies are required",
          })}
          placeholder="React, Node.js, PostgreSQL"
          error={
            touchedFields.technologies
              ? errors.technologies?.message
              : undefined
          }
        />

        <Input
          label="Deploy URL"
          {...register("deployUrl")}
          placeholder="example.com or https://example.com"
        />

        <Input
          label="Frontend Repository"
          {...register("frontendUrl")}
          placeholder="github.com/username/repo"
        />

        <Input
          label="Backend Repository"
          {...register("backendUrl")}
          placeholder="github.com/username/repo"
        />

        <div className="space-y-2">
          <Input
            label="Image URL"
            {...register("image", {
              required: "Image URL is required",
            })}
            error={touchedFields.image ? errors.image?.message : undefined}
          />
          <p className="text-xs text-gray-400">
            Inserte la url de la imagen del proyecto
          </p>
        </div>

        <button type="submit" className="btn-primary w-full mb-4">
          Add Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
