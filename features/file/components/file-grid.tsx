"use client";

import { File } from "@/types/api";
import { Download, Trash2, FileIcon, ImageIcon } from "lucide-react";
import { useFileDelete } from "../hooks/use-file-delete";

interface FileGridProps {
  files: File[];
}

export function FileGrid({ files }: FileGridProps) {
  const deleteMutation = useFileDelete();

  const handleDelete = async (fileId: string, fileName: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${fileName}" ?`)) {
      await deleteMutation.mutateAsync(fileId);
    }
  };

  const handleDownload = (fileId: string, fileName: string) => {
    // Use Next.js Route Handler (secure, no API key exposed)
    const url = `/api/files/${fileId}/download`;
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.target = "_blank";

    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        link.href = blobUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const isImage = (mimeType: string) => mimeType.startsWith("image/");

  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <FileIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600">Aucun fichier trouvé</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition group"
        >
          {/* Preview */}
          <div className="aspect-square bg-gray-100 relative">
            {isImage(file.mimeType) && file.thumbnailPath ? (
              <img
                src={`/api/files/${file.id}/thumbnail`}
                alt={file.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                {isImage(file.mimeType) ? (
                  <ImageIcon className="w-16 h-16 text-gray-400" />
                ) : (
                  <FileIcon className="w-16 h-16 text-gray-400" />
                )}
              </div>
            )}

            {/* Actions overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button
                onClick={() => handleDownload(file.id, file.originalName)}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition"
                title="Télécharger"
              >
                <Download className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => handleDelete(file.id, file.name)}
                disabled={deleteMutation.isPending}
                className="p-2 bg-white rounded-full hover:bg-red-50 transition"
                title="Supprimer"
              >
                <Trash2 className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="p-3">
            <h3
              className="font-medium text-sm text-gray-900 truncate mb-1"
              title={file.name}
            >
              {file.name}
            </h3>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{formatFileSize(file.size)}</span>
              <span>{formatDate(file.createdAt)}</span>
            </div>
            {file.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {file.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
                {file.tags.length > 2 && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    +{file.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
