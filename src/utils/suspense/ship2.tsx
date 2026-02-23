import { type Ship } from '@/shared/api.server';

export type { Ship };

export async function createShip(formData: FormData, delay?: number) {
  const searchParams = new URLSearchParams();
  if (delay) searchParams.set('delay', String(delay));

  const r = await fetch(`/api/create-ship?${searchParams.toString()}`, {
    method: 'POST',
    body: formData,
  });

  if (!r.ok) {
    const text = await r.text();
    throw new Error(`Create ship failed (${r.status}): ${text}`);
  }

  return r.json(); // ✅ return created ship
}

const shipCache = new Map<string, Promise<Ship>>();

export function getShip(name: string, delay?: number) {
  const shipPromise = shipCache.get(name) ?? getShipImpl(name, delay);
  shipCache.set(name, shipPromise);
  return shipPromise;
}

async function getShipImpl(name: string, delay?: number) {
  const searchParams = new URLSearchParams({ name });
  if (delay) searchParams.set('delay', String(delay));
  const response = await fetch(`/api/get-ship?${searchParams.toString()}`);
  if (!response.ok) {
    return Promise.reject(new Error(await response.text()));
  }
  const ship = await response.json();
  return ship as Ship;
}

const imgCache = new Map<string, Promise<string>>();

export function imgSrc(src: string) {
  const imgPromise = imgCache.get(src) ?? preloadImage(src);
  imgCache.set(src, imgPromise);
  return imgPromise;
}

function preloadImage(src: string) {
  return new Promise<string>(async (resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
    img.onerror = reject;
  });
}

export function preloadShipImage(shipName: string, size: number) {
  const src = getImageUrlForShip(shipName, { size });
  return imgSrc(src);
}

export function getImageUrlForShip(
  shipName: string,
  { size }: { size: number },
) {
  return `/img/ships/${shipName.toLowerCase().replaceAll(' ', '-')}.webp?size=${size}`;
}
