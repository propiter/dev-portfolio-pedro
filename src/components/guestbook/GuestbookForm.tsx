import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import type { CreateGuestbookEntryData } from "../../types/guestbook";

interface GuestbookFormProps {
  onSubmit: (data: CreateGuestbookEntryData) => void;
  isSubmitting?: boolean;
}

const GuestbookForm = ({ onSubmit, isSubmitting }: GuestbookFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateGuestbookEntryData>();

  const handleFormSubmit = (data: CreateGuestbookEntryData) => {
    onSubmit(data);
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 mb-12"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Name"
          {...register("name", { required: "Name is required" })}
          error={errors.name?.message}
        />
        <Input label="Company (optional)" {...register("company")} />
        <Input
          label="Website URL (optional)"
          {...register("websiteUrl")}
          placeholder="example.com"
        />
        <Input
          label="Avatar URL (optional)"
          {...register("avatarUrl")}
          placeholder="https://example.com/avatar.jpg"
        />
        <TextArea
          label="Message"
          {...register("message", {
            required: "Message is required",
            minLength: {
              value: 10,
              message: "Message must be at least 10 characters long",
            },
          })}
          error={errors.message?.message}
          placeholder="Leave your message here..."
          rows={4}
        />
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing..." : "Sign Guestbook"}
        </button>
      </form>
    </motion.div>
  );
};

export default GuestbookForm;
