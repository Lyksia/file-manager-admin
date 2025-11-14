import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiKeyApi } from '../services/api-key-api';

export function useApiKeyList() {
  return useQuery({
    queryKey: ['api-keys'],
    queryFn: () => apiKeyApi.list(),
  });
}

export function useApiKeyStats() {
  return useQuery({
    queryKey: ['api-keys', 'stats'],
    queryFn: () => apiKeyApi.stats(),
  });
}

export function useApiKeyCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; rateLimit?: number }) => apiKeyApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
    },
  });
}

export function useApiKeyDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (keyId: string) => apiKeyApi.delete(keyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
    },
  });
}
