'use client';
import { createContext, use, useState } from 'react';

type CounterContextType = {
  count: number;
  increment: () => void;
};

const CountContext = createContext<CounterContextType | null>(null);

function CounterProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  const value = { count, increment };

  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
}

function useCount() {
  const context = use(CountContext);
  if (!context) {
    throw new Error('useCount must be used within a CounterProvider');
  }
  return context;
}

function CounterDisplay() {
  const { count } = useCount();

  return <div className="mb-4">Count: {count}</div>;
}

function IncrementCount() {
  const { increment } = useCount();

  return (
    <button onClick={increment} className="mb-8">
      Increment
    </button>
  );
}

const IntroUseContext = () => {
  return (
    <div>
      <h2>Create Context with Custom Hook use()</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/tree/main/src/app/advanced-apis/intro-use-context"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <p>It used to share state between components without prop drilling.</p>
      <p className="mb-4">
        More like for Libraries or Ui, not too much for server components.
      </p>
      <CounterProvider>
        <CounterDisplay />
        <IncrementCount />
      </CounterProvider>
    </div>
  );
};

export default IntroUseContext;
