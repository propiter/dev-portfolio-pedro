import { apiClient } from "../../utils/api";
import type { Project } from "../../types/project";
import type { GuestbookEntry } from "../../types/guestbook";

interface DataUpdate {
  projects?: Project[];
  guestbook?: GuestbookEntry[];
}

export const dataApi = {
  async updateData(update: DataUpdate) {
    try {
      await apiClient.post('/api/data/update', update);
    } catch (error) {
      console.error('Failed to update data:', error);
    }
  }
};