import { apiClient } from "@/lib/api-client";
import type { Folder } from "@/types/api";

export const folderApi = {
  async list(parentId?: string): Promise<Folder[]> {
    const query = parentId ? `?parentId=${parentId}` : "";
    return apiClient.get(`/folders${query}`);
  },

  async tree(): Promise<Folder[]> {
    return apiClient.get("/folders/tree");
  },

  async getById(id: string): Promise<Folder> {
    return apiClient.get(`/folders/${id}`);
  },

  async create(data: { name: string; parentId?: string }): Promise<Folder> {
    return apiClient.post("/folders", data);
  },

  async update(
    id: string,
    data: { name?: string; parentId?: string | null },
  ): Promise<Folder> {
    return apiClient.put(`/folders/${id}`, data);
  },

  async delete(id: string): Promise<{ success: boolean }> {
    return apiClient.delete(`/folders/${id}`);
  },
};
