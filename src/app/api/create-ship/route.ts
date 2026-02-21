export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const delay = Number(searchParams.get('delay') ?? 0);
  if (delay) await new Promise((r) => setTimeout(r, delay));
  const res = await fetch('/api/ships', {
    method: 'POST',
    body: req.body,
  });

  if (!res.ok) throw new Error('Failed to create ship');
  return res.json();
}
