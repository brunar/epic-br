'use client';
import { createContext, memo, use, useMemo, useState } from 'react';

// rename this to FooterStateContext

const FooterContext = createContext<{
  color: string;
  // move this to the new FooterDispatchContext
  setColor: (color: string) => void;
  name: string;
  // move this to the new FooterDispatchContext
  setName: (name: string) => void;
} | null>(null);


// If you want to be able to easily distinguish between the two providers in
// the react dev tools, add a .displayName property to the context object:
// FooterStateContext.displayName = 'FooterStateContext'

// create a FooterDispatchContext that has the setColor and setName properties

function FooterProvider({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState('black');
  const [name, setName] = useState('');

  // split this value into two variables: footerStateValue and footerDispatchValue
  const value = useMemo(() => ({ color, name, setColor, setName }), [color, name]);

  return (
    // render both context providers here with the appropriate values
    <FooterContext.Provider value={value}>
      {children}
    </FooterContext.Provider>
  );
}

// rename this to useFooterState and update the implementation
function useFooter() {
  const context = use(FooterContext);
  if (!context) throw new Error('FooterContext not found');
  return context;
}

// create a useFooterDispatch function similar to the hook above

const Footer = memo(function FooterImpl() {
  // update this to useFooterState
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

// as extra credit, you can memo this component and it will *never* re-render
function FooterSetters() {
  // update this to useFooterDispatch
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
