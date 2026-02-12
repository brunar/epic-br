import fs from 'node:fs';
import path from 'node:path';
import { invariantResponse } from '@epic-web/invariant';
import shipData from './ships.json';

const MIN_DELAY = 200;
const MAX_DELAY = 500;

export type Ship = (typeof shipData)[number];

const atRoot = (...paths: Array<string>) => path.join(process.cwd(), ...paths);

const formatDate = (date: Date) =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
    date.getSeconds(),
  ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`;

function getDelay(request: Request) {
  const raw = new URL(request.url).searchParams.get('delay');
  const parsed = raw ? Number(raw) : NaN;
  const delay = Number.isFinite(parsed)
    ? parsed
    : Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;
  return Math.max(0, delay);
}

export async function searchShips(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') ?? '';
  const endTime = Date.now() + getDelay(request);

  const ships = shipData
    .filter((ship) => ship.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 13);

  await new Promise((resolve) => setTimeout(resolve, endTime - Date.now()));

  return {
    ships: ships.map((ship) => ({ name: ship.name })),
    fetchedAt: formatDate(new Date()),
  };
}

export async function getShip(request: Request) {
  const url = new URL(request.url);
  const name = url.searchParams.get('name');
  const endTime = Date.now() + getDelay(request);

  invariantResponse(name, 'No name provided', { status: 400 });

  const ship = shipData.find(
    (ship) => ship.name.toLowerCase() === name.toLowerCase(),
  );

  await new Promise((resolve) => setTimeout(resolve, endTime - Date.now()));

  invariantResponse(ship, `No ship with the name "${name}"`, { status: 404 });

  return { ...ship, fetchedAt: formatDate(new Date()) };
}

export async function createShip(request: Request) {
  const endTime = Date.now() + getDelay(request);

  const formData = await request.formData();
  const name = formData.get('name');
  const image = formData.get('image');
  const topSpeed = Number(formData.get('topSpeed'));

  invariantResponse(
    typeof name === 'string' && name.trim().length > 0,
    'Name incorrect type',
  );
  const safeName = name.trim();

  invariantResponse(!image || image instanceof File, 'Image incorrect type');
  invariantResponse(
    Number.isFinite(topSpeed) && topSpeed > 0,
    'Top speed must be > 0',
  );

  let imageName: string | null = null;
  if (image instanceof File && image.name) {
    imageName = image.name;
    const filePath = atRoot('public', 'img', 'custom-ships', image.name);

    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.writeFile(
      filePath,
      Buffer.from(await image.arrayBuffer()),
    );
  }

  const ship = {
    name: safeName,
    image: imageName
      ? `/img/custom-ships/${imageName}`
      : `/img/ships/battleship.webp`,
    topSpeed,
    weapons: [],
  };

  shipData.push(ship);

  await new Promise((resolve) => setTimeout(resolve, endTime - Date.now()));

  return new Response('OK', { status: 201 });
}
