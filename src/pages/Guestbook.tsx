import { motion } from "framer-motion";
import GuestbookForm from "../components/guestbook/GuestbookForm";
import GuestbookList from "../components/guestbook/GuestbookList";
import { useGuestbook } from "../hooks/useGuestBook";
import type { CreateGuestbookEntryData } from "../types/guestbook";

const Guestbook = () => {
  const { entries, isLoading, createEntry } = useGuestbook();

  const handleSubmit = (data: CreateGuestbookEntryData) => {
    createEntry.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-orbitron text-neon-blue mb-4">
          Guestbook
        </h1>
        <p className="text-gray-300">
          Leave a message, share your thoughts, or just say hello! Your entry
          will be displayed below.
        </p>
      </motion.div>

      <GuestbookForm
        onSubmit={handleSubmit}
        isSubmitting={createEntry.isPending}
      />

      <GuestbookList entries={entries} />
    </div>
  );
};

export default Guestbook;
