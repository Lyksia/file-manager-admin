import { NextRequest } from 'next/server';

const API_URL = process.env.API_URL!;
const API_KEY = process.env.API_KEY!;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();
  const url = queryString ? `${API_URL}/api/keys?${queryString}` : `${API_URL}/api/keys`;

  const response = await fetch(url, {
    headers: {
      'X-API-Key': API_KEY,
    },
  });

  const data = await response.json();
  return Response.json(data, { status: response.status });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const response = await fetch(`${API_URL}/api/keys`, {
    method: 'POST',
    headers: {
      'X-API-Key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return Response.json(data, { status: response.status });
}
