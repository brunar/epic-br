import {
  getShip,
  searchShips,
  createShip,
} from '@/shared/ship-api-utils.server';

export type Ship = Awaited<ReturnType<typeof getShip>>;
export type ShipSearch = Awaited<ReturnType<typeof searchShips>>;

export async function loader({
  request,
  params,
}: {
  request: Request;
  params: Record<string, string>;
}) {
  const path = params['*'];
  switch (path) {
    case 'search-ships': {
      const result = await searchShips(request);
      return new Response(JSON.stringify(result), {
        headers: {
          'content-type': 'application/json',
          // To cache this response for 300 seconds (5 min)
          'cache-control': 'max-age=300',
        },
      });
    }
    case 'get-ship': {
      const result = await getShip(request);
      return new Response(JSON.stringify(result), {
        headers: {
          'content-type': 'application/json',
          // To cache this response for 300 seconds (5 min)
          'cache-control': 'max-age=300',
        },
      });
    }
    default: {
      return new Response('Not found', { status: 404 });
    }
  }
}

export async function action({
  request,
  params,
}: {
  request: Request;
  params: Record<string, string>;
}) {
  const path = params['*'];
  switch (path) {
    case 'create-ship': {
      return createShip(request);
    }
  }
}
