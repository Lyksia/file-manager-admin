import { apiClient } from '@/lib/api-client';
import type { File, FileListResponse } from '@/types/api';

export const fileApi = {
  async list(params?: {
    page?: number;
    limit?: number;
    search?: string;
    tags?: string[];
    mimeType?: string;
    folderId?: string;
  }): Promise<FileListResponse> {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.search) searchParams.set('search', params.search);
    if (params?.tags) searchParams.set('tags', params.tags.join(','));
    if (params?.mimeType) searchParams.set('mimeType', params.mimeType);
    if (params?.folderId) searchParams.set('folderId', params.folderId);

    const query = searchParams.toString();
    return apiClient.get(`/api/files${query ? `?${query}` : ''}`);
  },

  async getById(id: string): Promise<File> {
    return apiClient.get(`/api/files/${id}`);
  },

  async upload(formData: FormData): Promise<{ files: File[] }> {
    return apiClient.post('/api/files/upload', formData);
  },

  async update(id: string, data: Partial<File>): Promise<File> {
    return apiClient.patch(`/api/files/${id}`, data);
  },

  async delete(id: string): Promise<{ success: boolean }> {
    return apiClient.delete(`/api/files/${id}`);
  },

  getDownloadUrl(id: string): string {
    return `${apiClient['baseUrl']}/api/files/${id}/download`;
  },

  getThumbnailUrl(id: string): string {
    return `${apiClient['baseUrl']}/api/files/${id}/thumbnail`;
  },
};
