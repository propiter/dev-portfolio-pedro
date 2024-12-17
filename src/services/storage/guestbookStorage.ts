import { GuestbookEntry } from "../../types/guestbook";
import { StorageBase } from "./storageBase";

class GuestbookStorage extends StorageBase {
  getAllEntries(): GuestbookEntry[] {
    const data = this.getData();
    return (data.guestbook || []).sort(
      (a: GuestbookEntry, b: GuestbookEntry) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  createEntry(entry: Omit<GuestbookEntry, "id" | "createdAt">) {
    const data = this.getData();
    const newEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    data.guestbook = [...(data.guestbook || []), newEntry];
    this.saveData(data);
    return newEntry;
  }
}

export const guestbookStorage = new GuestbookStorage();