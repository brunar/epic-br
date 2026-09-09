'use client';
import { createContext, memo, use, useMemo, useState } from 'react';

const FooterContext = createContext<{
  color: string;
  setColor: (color: string) => void;
  name: string;
  setName: (name: string) => void;
} | null>(null);


function FooterProvider({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState('black');
  const [name, setName] = useState('');

  const value = useMemo(() => ({ color, name, setColor, setName }), [color, name]);

  return (
    <FooterContext.Provider value={value}>
      {children}
    </FooterContext.Provider>
  );
}

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

function FooterSetters() {
  const { setColor, setName } = useFooter();

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

  return (
    <div>
      <h2>Provider Component</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/tree/main/src/app/performance/provider-component"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <p>
        Creating a provider component means that changes to the context value do not necessarily cause all of the provider's children to re-render.
      </p>
      <p className="mb-4">
        To test it start recording and click on the buttons to change the footer color and name. You should see that the footer re-renders but the main count does not.
      </p>

      <FooterProvider>
        <div>
          <FooterSetters />
          <button className="my-4" onClick={() => setAppCount((c) => c + 1)}>
            The app count is {appCount}
          </button>
          <Main footer={<Footer />} />
        </div>
      </FooterProvider>
    </div>
  );
}
