import { apiClient } from '@/lib/api-client';
import type { ApiKey } from '@/types/api';

interface CreateApiKeyResponse {
  message: string;
  key: string;
  apiKey: ApiKey;
}

export const apiKeyApi = {
  async list(): Promise<ApiKey[]> {
    return apiClient.get('/api/keys');
  },

  async create(data: { name: string; rateLimit?: number; expiresAt?: string }): Promise<CreateApiKeyResponse> {
    return apiClient.post('/api/keys', data);
  },

  async delete(id: string): Promise<{ success: boolean }> {
    return apiClient.delete(`/api/keys/${id}`);
  },

  async stats(): Promise<{ total: number; active: number; expired: number }> {
    return apiClient.get('/api/keys/stats');
  },
};
