'use client';
import React, {
  Suspense,
  use,
  useOptimistic,
  useState,
  useTransition,
} from 'react';
import { useFormStatus } from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { type Ship, getShip, createShip, imgSrc } from '@/utils/suspense/ship2';
import { useSpinDelay } from 'spin-delay';

export default function ShipPromiseCache() {
  const [count, setCount] = useState(0);
  const [shipName, setShipName] = useState('Dreadnought');
  const [isTransitionPending, startTransition] = useTransition();
  const isPending = useSpinDelay(isTransitionPending, {
    delay: 300,
    minDuration: 350,
  });

  // 🐨 add a useOptimistic call here
  // 🦺 The type should be a Ship | null, (initialized to null)
  const [optimisticShip, setOptimisticShip] = useOptimistic<Ship | null>(null);

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
              <ShipDetails
                shipName={shipName}
                optimisticShip={optimisticShip}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
      {/* 🐨 pass the setOptimisticShip function to CreateForm here */}
      <CreateForm
        setShipName={setShipName}
        setOptimisticShip={setOptimisticShip}
      />
    </div>
  );
}

// 🐨 accept setOptimisticShip here
function CreateForm({
  setShipName,
  setOptimisticShip,
}: {
  // 🦺 I'll give this one to you
  // setOptimisticShip: (ship: Ship | null) => void
  setShipName: (name: string) => void;
  setOptimisticShip: (ship: Ship | null) => void;
}) {
  const [message, setMessage] = useOptimistic('Create');
  // Means the message button will be, Create, Creating..., Created! Loading... and then back to Create.

  return (
    <div>
      <p>Create a new ship</p>
      <ErrorBoundary FallbackComponent={FormErrorFallback}>
        <form
          action={async (formData) => {
            setMessage('Creating...');
            setOptimisticShip(await createOptimisticShip(formData));

            await createShip(formData, 6000);
            setMessage('Created! Loading...');

            setShipName(formData.get('name') as string);
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex gap-2">
            <label htmlFor="shipName">Ship Name</label>
            <input id="shipName" type="text" name="name" required />
          </div>
          <div className="flex gap-2">
            <label htmlFor="topSpeed">Top Speed</label>
            <input id="topSpeed" type="number" name="topSpeed" required />
          </div>
          <div className="flex gap-2">
            <label htmlFor="image">Image</label>
            <input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              required
            />
          </div>
          <CreateButton />
          <p className="text-sm text-gray-500">
            Example Button with messages from useOptimistic()
          </p>
          <CreateButton2>{message}</CreateButton2>
        </form>
      </ErrorBoundary>
    </div>
  );
}

function CreateButton2({ children }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {children}
    </button>
  );
}

function CreateButton() {
  const formStatus = useFormStatus();
  console.log('formStatus', formStatus);
  //const pending = formStatus.pending; // Means same bellow, but with destructuring
  const { pending } = formStatus;

  return (
    <button type="submit" disabled={pending}>
      {pending ? `Creating ${formStatus.data?.get('name')}...` : 'Create'}
    </button>
  );
}

async function createOptimisticShip(formData: FormData) {
  return {
    name: formData.get('name') as string,
    topSpeed: Number(formData.get('topSpeed')),
    image: await fileToDataUrl(formData.get('image') as File),
    weapons: [],
    fetchedAt: '...',
  };
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function FormErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{ color: 'red', whiteSpace: 'normal' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
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

function ShipDetails({
  shipName,
  optimisticShip,
}: {
  shipName: string;
  optimisticShip: Ship | null;
}) {
  const delay = 500; // for testing, add an artificial delay to the fetch
  //// 💯 Set different delays for different ships. Feel free to play around with the values.
  //const delay = shipName === 'Interceptor' ? 200 : shipName === 'Galaxy Cruiser' ? 400 : 10
  const ship = optimisticShip ?? use(getShip(shipName, delay)); // add delay here to simulate a slow network and show the fallback UI

  return (
    <div className="ship-info">
      <div className="ship-info__img-wrapper">
        <Img src={ship.image} alt={ship.name} />
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

// function Img({ src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
function Img({ src = '', ...props }: React.ComponentProps<'img'>) {
  src = use(imgSrc(src));
  return <img src={src} {...props} />;
}
