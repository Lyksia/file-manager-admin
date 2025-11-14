export interface File {
  id: string;
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  hash: string;
  storagePath: string;
  width?: number;
  height?: number;
  thumbnailPath?: string;
  tags: string[];
  description?: string;
  metadata?: Record<string, unknown>;
  userId: string;
  folderId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Folder {
  id: string;
  name: string;
  path: string;
  parentId?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    files: number;
    children: number;
  };
}

export interface ApiKey {
  id: string;
  name: string;
  rateLimit: number;
  lastUsedAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface FileListResponse {
  files: File[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  error: string;
  details?: unknown;
}
