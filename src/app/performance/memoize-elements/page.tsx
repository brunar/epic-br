'use client';
import { createContext, use, useState, useMemo } from 'react';

const ColorContext = createContext<string | null>(null);

function useColor() {
  const color = use(ColorContext);
  if (!color) throw new Error('ColorContext not found');
  return color;
}

function Footer({ name }: { name: string }) {
  const color = useColor();
  return (
    <footer style={{ color }}>
      I am the ({color}) footer, {name || 'Unnamed'}
    </footer>
  );
}

function Main({ footer }: { footer: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  return (
    <div>
      <button onClick={increment}>The count is {count}</button>
      {footer}
    </div>
  );
}

export default function MemoizeElementsPage() {
  const [appCount, setAppCount] = useState(0);
  const [color, setColor] = useState('black');
  const [name, setName] = useState('Kody');

  const footer = useMemo(() => <Footer name={name} />, [name]);

  return (
    <div>
      <h2>Memoize Element</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/tree/main/src/app/performance/memoize-elements"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <p>Another way is to use Memo</p>
      <p>
        The aim is to avoid re-rendering when clicking the{' '}
        <b>count or app count</b> increment button, and only re-render when the
        name or colour changes.
      </p>
      <p className="mb-4">
        Do not use context all the time unless you have tried everything else.
      </p>
      <ColorContext.Provider value={color}>
        <div>
          <div>
            <p>Set the footer color:</p>
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={() => setColor('black')}>Black</button>
              <button onClick={() => setColor('blue')}>Blue</button>
              <button onClick={() => setColor('green')}>Green</button>
            </div>
          </div>
          <div>
            <p>Set the footer name:</p>
            <label>
              Name:
              <input
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </label>
          </div>
          <button className="my-4" onClick={() => setAppCount((c) => c + 1)}>
            The app count is {appCount}
          </button>
          <Main footer={footer} />
        </div>
      </ColorContext.Provider>

      <p className="mt-10 text-xs">
        Console video recording – testing improvement
      </p>
      <video
        src="/video/performance-memoize-elements.mp4"
        autoPlay
        loop
        muted
        playsInline
        width={400}
        className="border rounded-xl"
      />
    </div>
  );
}
