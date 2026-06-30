'use client';
import { createContext, use, useState, memo } from 'react';

const ColorContext = createContext<string | null>(null);

function useColor() {
  const color = use(ColorContext);
  if (!color) throw new Error('ColorContext not found');
  return color;
}

const Footer = memo(function FooterImpl({ name }: { name: string }) {
  const color = useColor();
  return (
    <footer style={{ color }}>
      I am the ({color}) footer, {name || 'Unnamed'}
    </footer>
  );
});

// Does not matter if you leave it as a composition. React would compare component footer1 === footer2  - anyway boths works well
// Here in the case it will compare the props
function Main({ name }: { name: string }) {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  return (
    <div>
      <button onClick={increment}>The count is {count}</button>
      <Footer name={name} />
    </div>
  );
}

export default function MemoizeElementsPage() {
  const [appCount, setAppCount] = useState(0);
  const [color, setColor] = useState('black');
  const [name, setName] = useState('Kody');

  return (
    <div>
      <h2>Memoize Components</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/tree/main/src/app/performance/memoize-components"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <p>
        React has a built-in optimizer called <b>memo</b> which allows you to
        memoize an entire component based on its props.
      </p>
      <p className="mb-4">
        The aim is to avoid re-rendering when clicking the{' '}
        <b>count or app count</b> increment button, and only re-render when the
        name or colour changes.
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
          <Main name={name} />
        </div>
      </ColorContext.Provider>
    </div>
  );
}
