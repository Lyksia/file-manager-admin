export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  adminApiKey: process.env.API_ADMIN_KEY || '',
} as const;
