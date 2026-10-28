'use client';
import { createContext, memo, use, useMemo, useState } from 'react';

const FooterStateContext = createContext<{
  color: string;
  name: string;
} | null>(null);

FooterStateContext.displayName = 'FooterStateContext';

const FooterDispatchContext = createContext<{
  setColor: (color: string) => void;
  setName: (name: string) => void;
} | null>(null);

FooterDispatchContext.displayName = 'FooterDispatchContext'; // displayName is helpful for debugging in React DevTools

function FooterProvider({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState('black');
  const [name, setName] = useState('');

  // split this value into two variables: footerStateValue and footerDispatchValue
  const footerStateValue = useMemo(() => ({ color, name }), [color, name]);
  const footerDispatchValue = useMemo(
    () => ({ setColor, setName }),
    [setColor, setName],
  );

  return (
    <FooterStateContext.Provider value={footerStateValue}>
      <FooterDispatchContext.Provider value={footerDispatchValue}>
        {children}
      </FooterDispatchContext.Provider>
    </FooterStateContext.Provider>
  );
}

function useFooterState() {
  const context = use(FooterStateContext);
  if (!context) throw new Error('FooterStateContext not found');
  return context;
}

function useFooterDispatch() {
  const context = use(FooterDispatchContext);
  if (!context) throw new Error('FooterDispatchContext not found');
  return context;
}

const Footer = memo(function FooterImpl() {
  const { color, name } = useFooterState();
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

const FooterSetters = memo(function FooterSetters() {
  const { setColor, setName } = useFooterDispatch();

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
});

export default function OptimizeContextPage() {
  const [appCount, setAppCount] = useState(0);

  return (
    <div>
      <h2>Split Context</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/tree/main/src/app/performance/split-context"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <p>
        The footer setters are re-rendering when we make a change, even to the
        context value. Nothing in the footer setter that depends on the color or
        name values.
      </p>
      <p className="mb-4">
        Instead of having a single value, you actually have two values, one for
        the setters and one for the state. And then you have two separate
        contexts, one context for the state, one context for the setters. That's
        the idea behind splitting context. Only need if you have two much things
        going on in your context value.
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
