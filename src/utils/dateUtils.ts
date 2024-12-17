import { format, parseISO, isValid } from "date-fns";

export const formatDate = (dateString?: string): string => {
  if (!dateString) return "Date not available";

  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return "Invalid date";
    return format(date, "MMMM d, yyyy h:mm a");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date format";
  }
};
