import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { guestbookStorage } from "../services/storage/guestbookStorage";

export const useGuestbook = () => {
  const queryClient = useQueryClient();

  const {
    data: entries = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guestbookEntries"],
    queryFn: guestbookStorage.getAllEntries.bind(guestbookStorage),
  });

  const createEntry = useMutation({
    mutationFn: guestbookStorage.createEntry.bind(guestbookStorage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guestbookEntries"] });
    },
  });

  return {
    entries,
    isLoading,
    error,
    createEntry,
  };
};
