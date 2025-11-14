import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { folderApi } from '../services/folder-api';

export function useFolderList(parentId?: string) {
  return useQuery({
    queryKey: ['folders', parentId],
    queryFn: () => folderApi.list(parentId),
  });
}

export function useFolderTree() {
  return useQuery({
    queryKey: ['folders', 'tree'],
    queryFn: () => folderApi.tree(),
  });
}

export function useFolderCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; parentId?: string }) => folderApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
    },
  });
}

export function useFolderDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderId: string) => folderApi.delete(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
    },
  });
}
