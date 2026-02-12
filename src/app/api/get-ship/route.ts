import { getShip } from '@/shared/ship-api-utils.server';

export const runtime = 'nodejs'; // important because api.server imports node:fs

export async function GET(request: Request) {
  const data = await getShip(request);
  return Response.json(data);
}
