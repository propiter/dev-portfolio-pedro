import { motion } from "framer-motion";
import GuestbookEntry from "./GuestbookEntry";
import type { GuestbookEntry as GuestbookEntryType } from "../../types/guestbook";

interface GuestbookListProps {
  entries: GuestbookEntryType[];
}

const GuestbookList = ({ entries }: GuestbookListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {entries.length === 0 ? (
        <p className="text-center text-gray-400">
          No entries yet. Be the first to sign the guestbook!
        </p>
      ) : (
        entries.map((entry) => <GuestbookEntry key={entry.id} entry={entry} />)
      )}
    </motion.div>
  );
};

export default GuestbookList;
