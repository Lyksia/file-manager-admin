import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileApi } from '../services/file-api';

export function useFileDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (fileId: string) => fileApi.delete(fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'stats'] });
    },
  });
}
