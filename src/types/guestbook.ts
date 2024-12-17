export interface GuestbookEntry {
  id: string;
  name: string;
  company?: string;
  websiteUrl?: string;
  avatarUrl?: string;
  message: string;
  createdAt: string;
}

export interface CreateGuestbookEntryData {
  name: string;
  company?: string;
  websiteUrl?: string;
  avatarUrl?: string;
  message: string;
}
