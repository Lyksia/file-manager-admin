import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileApi } from '../services/file-api';

export function useFileUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { files: File[]; tags?: string[]; description?: string; folderId?: string }) => {
      const formData = new FormData();

      data.files.forEach((file) => {
        formData.append('file', file);
      });

      if (data.tags) {
        formData.append('tags', JSON.stringify(data.tags));
      }

      if (data.description) {
        formData.append('description', data.description);
      }

      if (data.folderId) {
        formData.append('folderId', data.folderId);
      }

      return fileApi.upload(formData);
    },
    onSuccess: () => {
      // Invalider le cache des fichiers pour refetch
      queryClient.invalidateQueries({ queryKey: ['files'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'stats'] });
    },
  });
}
