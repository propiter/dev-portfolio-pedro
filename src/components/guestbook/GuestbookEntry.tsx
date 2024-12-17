import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Avatar from "../ui/Avatar";
import { formatDate } from "../../utils/dateUtils";
import type { GuestbookEntry as GuestbookEntryType } from "../../types/guestbook";

interface GuestbookEntryProps {
  entry: GuestbookEntryType;
}

const GuestbookEntry = ({ entry }: GuestbookEntryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card p-6"
    >
      <div className="flex items-start gap-4">
        <Avatar name={entry.name} imageUrl={entry.avatarUrl} />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-orbitron text-neon-blue">{entry.name}</span>
            {entry.company && (
              <span className="text-gray-400">at {entry.company}</span>
            )}
            {entry.websiteUrl && (
              <a
                href={entry.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-electric-purple hover:text-neon-blue transition-colors"
              >
                <ExternalLink size={14} />
                Website
              </a>
            )}
          </div>
          <p className="text-gray-300 whitespace-pre-wrap">{entry.message}</p>
          <div className="mt-2 text-sm text-gray-400">
            {formatDate(entry.createdAt)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GuestbookEntry;
