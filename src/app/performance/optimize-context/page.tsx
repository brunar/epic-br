'use client';
import { createContext, memo, use, useMemo, useState } from 'react';

const FooterContext = createContext<{
  color: string;
  name: string;
} | null>(null);

function useFooter() {
  const context = use(FooterContext);
  if (!context) throw new Error('FooterContext not found');
  return context;
}

const Footer = memo(function FooterImpl() {
  const { color, name } = useFooter();
  return (
    <footer style={{ color }}>
      I am the ({color}) footer, {name || 'Unnamed'}
    </footer>
  );
});

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

function FooterSetters({
  setColor,
  setName,
}: {
  setColor: (color: string) => void;
  setName: (name: string) => void;
}) {
  return (
    <>
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
          <input onChange={(e) => setName(e.currentTarget.value)} />
        </label>
      </div>
    </>
  );
}

export default function OptimizeContextPage() {
  const [appCount, setAppCount] = useState(0);
  const [color, setColor] = useState('black');
  const [name, setName] = useState('');

  const value = useMemo(() => ({ color, name }), [color, name]);

  return (
    <div>
      <h2>Optimize Context - Memoize Context</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/tree/main/src/app/performance/optimize-context"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <p>
        You will notice all the components re-render whenever you change the
        counter in the App component. This is happening because the
        FooterContext is a new value prop every render.
      </p>
      <p className="mb-4">
        So if you memoize the value prop with useMemo, you can prevent the
        unnecessary rerender of consuming components when the value prop does
        not change.
      </p>
      <FooterContext.Provider value={value}>
        <div>
          <FooterSetters setName={setName} setColor={setColor} />
          <button className="my-4" onClick={() => setAppCount((c) => c + 1)}>
            The app count is {appCount}
          </button>
          <Main footer={<Footer />} />
        </div>
      </FooterContext.Provider>
    </div>
  );
}
