import { type Ship } from '@/shared/api.server';

export type { Ship };

export async function getShip(name: string, delay?: number) {
  const searchParams = new URLSearchParams({ name });
  if (delay) searchParams.set('delay', String(delay));

  const path = `/api/get-ship?${searchParams.toString()}`;

  // Client: relative is fine. Server: must be absolute.
  const url =
    typeof window === 'undefined'
      ? new URL(path, process.env.NEXT_PUBLIC_APP_URL!).toString()
      : path;

  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(await response.text());
  return (await response.json()) as Ship;
}

export function getImageUrlForShip(
  shipName: string,
  { size }: { size: number },
) {
  return `/img/ships/${shipName.toLowerCase().replaceAll(' ', '-')}.webp?size=${size}`;
}
