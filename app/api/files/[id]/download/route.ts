import { NextRequest } from "next/server";

const API_URL = process.env.API_URL!;
const API_KEY = process.env.API_KEY!;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const response = await fetch(`${API_URL}/api/files/${id}/download`, {
    headers: {
      "X-API-Key": API_KEY,
    },
  });

  // Forward the file stream directly
  if (!response.ok) {
    const error = await response.json();
    return Response.json(error, { status: response.status });
  }

  // Get the headers from the backend response
  const contentType = response.headers.get("content-type");
  const contentDisposition = response.headers.get("content-disposition");

  const headers: Record<string, string> = {};
  if (contentType) headers["content-type"] = contentType;
  if (contentDisposition) headers["content-disposition"] = contentDisposition;

  return new Response(response.body, {
    status: 200,
    headers,
  });
}
