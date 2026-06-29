'use client';
import { useState } from 'react';

function Footer({ color }: { color: string }) {
  return <footer style={{ color }}>I am the ({color}) footer</footer>;
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

export default function ContextPage() {
  const [color, setColor] = useState('black');
  const [appCount, setAppCount] = useState(0);

  return (
    <div>
      <h2>Context</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/tree/main/src/app/performance/context"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <p className="mb-4">
        Preventing the footer from being re-rendered when the app count is
        incremented using context.
      </p>
      <div>
        <p>Set the footer color:</p>
        <div style={{ display: 'flex', gap: 4 }}>
          <button onClick={() => setColor('black')}>Black</button>
          <button onClick={() => setColor('blue')}>Blue</button>
          <button onClick={() => setColor('green')}>Green</button>
        </div>
      </div>
      <button className="my-4" onClick={() => setAppCount((c) => c + 1)}>
        The app count is {appCount}
      </button>
      <Main footer={<Footer color={color} />} />

      <p className="mt-10 text-xs">Console view - Profiler</p>
      <img src="/images/performance-context.png" alt="" width={500} />
      <br />
      <img src="/images/performance-context2.png" alt="" width={500} />
    </div>
  );
}
