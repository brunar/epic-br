'use client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { getImageUrlForShip, getShip } from '@/utils/suspense/ship';

const shipName = 'Dreadnought';

export default function IntroDataFetchClient() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="app">
        <div className="details">
          <ErrorBoundary fallback={<ShipError />}>
            <Suspense fallback={<ShipFallback />}>
              <ShipDetails />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

type UsePromise<Value> = Promise<Value> & {
  status: 'pending' | 'fulfilled' | 'rejected';
  value: Value;
  reason: unknown;
};

function use<Value>(promise: Promise<Value>): Value {
  const usePromise = promise as UsePromise<Value>;

  if (usePromise.status === 'fulfilled') return usePromise.value;
  if (usePromise.status === 'rejected') throw usePromise.reason;
  if (usePromise.status === 'pending') throw usePromise;

  usePromise.status = 'pending';
  usePromise.then(
    (result) => {
      usePromise.status = 'fulfilled';
      usePromise.value = result;
    },
    (err) => {
      usePromise.status = 'rejected';
      usePromise.reason = err;
    },
  );

  throw usePromise;
}

const shipPromise = getShip(shipName);

function ShipDetails() {
  const ship = use(shipPromise);

  return (
    <div className="ship-info">
      <div className="ship-info__img-wrapper">
        <img
          src={getImageUrlForShip(ship.name, { size: 200 })}
          alt={ship.name}
        />
      </div>
      <section>
        <h2>
          {ship.name}
          <sup>
            {ship.topSpeed} <small>lyh</small>
          </sup>
        </h2>
      </section>
      <section>
        {ship.weapons.length ? (
          <ul>
            {ship.weapons.map((weapon) => (
              <li key={weapon.name}>
                <label>{weapon.name}</label>:{' '}
                <span>
                  {weapon.damage} <small>({weapon.type})</small>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>NOTE: This ship is not equipped with any weapons.</p>
        )}
      </section>
      <small className="ship-info__fetch-time">{ship.fetchedAt}</small>
    </div>
  );
}

function ShipFallback() {
  return (
    <div className="ship-info">
      <div className="ship-info__img-wrapper">
        <img src="/img/fallback-ship.png" alt={shipName} />
      </div>
      <section>
        <h2>
          {shipName}
          <sup>
            XX <small>lyh</small>
          </sup>
        </h2>
      </section>
      <section>
        <ul>
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i}>
              <label>loading</label>:{' '}
              <span>
                XX <small>(loading)</small>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ShipError() {
  return (
    <div className="ship-info">
      <div className="ship-info__img-wrapper">
        <img src="/img/broken-ship.webp" alt="broken ship" />
      </div>
      <section>
        <h2>There was an error</h2>
      </section>
      <section>
        There was an error loading <b>{shipName}</b>
      </section>
    </div>
  );
}
