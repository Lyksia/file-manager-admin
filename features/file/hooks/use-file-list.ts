import { useQuery } from '@tanstack/react-query';
import { fileApi } from '../services/file-api';

interface UseFileListParams {
  page?: number;
  limit?: number;
  search?: string;
  tags?: string[];
  mimeType?: string;
  folderId?: string;
}

export function useFileList(params: UseFileListParams = {}) {
  return useQuery({
    queryKey: ['files', params],
    queryFn: () => fileApi.list(params),
  });
}
