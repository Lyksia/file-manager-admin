import { useQuery } from "@tanstack/react-query";
import { fileApi } from "@/features/file/services/file-api";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => {
      // Récupérer la première page pour avoir le total et les fichiers récents
      const filesData = await fileApi.list({ page: 1, limit: 10 });

      return {
        totalFiles: filesData.pagination.total,
        recentFiles: filesData.files,
        totalSize: filesData.files.reduce((acc, file) => acc + file.size, 0),
      };
    },
  });
}
