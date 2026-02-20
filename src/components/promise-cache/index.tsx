'use client';
import { Suspense, use, useState, useTransition } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { getImageUrlForShip, getShip } from '@/utils/suspense/ship2';
import { useSpinDelay } from 'spin-delay';

export default function ShipPromiseCache() {
  const [count, setCount] = useState(0);
  const [shipName, setShipName] = useState('Dreadnought');
  const [isTransitionPending, startTransition] = useTransition();
  const isPending = useSpinDelay(isTransitionPending, {
    delay: 300,
    minDuration: 350,
  });

  function handleShipSelection(newShipName: string) {
    startTransition(() => {
      setShipName(newShipName);
    });
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button onClick={() => setCount((c) => c + 1)}>
        Click to re-render: {count}
      </button>
      <ShipButtons shipName={shipName} onShipSelect={handleShipSelection} />
      <div className="app-ship">
        <div className="details" style={{ opacity: isPending ? 0.6 : 1 }}>
          <ErrorBoundary fallback={<ShipError shipName={shipName} />}>
            <Suspense fallback={<ShipFallback shipName={shipName} />}>
              <ShipDetails shipName={shipName} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

function ShipButtons({
  shipName,
  onShipSelect,
}: {
  shipName: string;
  onShipSelect: (shipName: string) => void;
}) {
  const ships = ['Dreadnought', 'Interceptor', 'Galaxy Cruiser'];

  return (
    <div className="ship-buttons">
      {ships.map((ship) => (
        <button
          key={ship}
          onClick={() => onShipSelect(ship)}
          className={shipName === ship ? 'active' : ''}
        >
          {ship}
        </button>
      ))}
    </div>
  );
}

function ShipDetails({ shipName }: { shipName: string }) {
  const delay = 500; // for testing, add an artificial delay to the fetch
  const ship = use(getShip(shipName, delay)); // add delay here to simulate a slow network and show the fallback UI

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

function ShipFallback({ shipName }: { shipName: string }) {
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

function ShipError({ shipName }: { shipName: string }) {
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
