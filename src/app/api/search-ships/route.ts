import { searchShips } from '@/shared/ship-api-utils.server';

export const runtime = 'nodejs'; // important because api.server imports node:fs

export async function GET(request: Request) {
  const data = await searchShips(request);
  return Response.json(data);
}
