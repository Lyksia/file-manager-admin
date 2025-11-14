import { NextRequest } from "next/server";

const API_URL = process.env.API_URL!;
const API_KEY = process.env.API_KEY!;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const response = await fetch(`${API_URL}/api/keys/${id}`, {
    headers: {
      "X-API-Key": API_KEY,
    },
  });

  const data = await response.json();
  return Response.json(data, { status: response.status });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();

  const response = await fetch(`${API_URL}/api/keys/${id}`, {
    method: "PUT",
    headers: {
      "X-API-Key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return Response.json(data, { status: response.status });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const response = await fetch(`${API_URL}/api/keys/${id}`, {
    method: "DELETE",
    headers: {
      "X-API-Key": API_KEY,
    },
  });

  const data = await response.json();
  return Response.json(data, { status: response.status });
}
