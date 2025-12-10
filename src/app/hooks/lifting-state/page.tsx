'use client';
import { useState } from 'react';

export default function LiftingState() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Lifting State</h2>

      <p>
        Has two components, and the states are lifted to the parent in the third
        component <br />
        <i className="text-gray-400">This case is not using custom hook</i>
      </p>

      <Counter count={count} setCount={() => setCount(count + 1)} />

      <CountDisplay count={count} />
    </div>
  );
}

type CounterProps = {
  count: number;
  setCount: () => void;
};

function Counter({ count, setCount }: CounterProps) {
  return (
    <div className="mt-8">
      <p>
        <i className="text-gray-400 text-sm">Component Counter with a Button</i>
      </p>
      <button onClick={setCount}>Increment {count}</button>
    </div>
  );
}

type CountDisplayProps = {
  count: number;
};

function CountDisplay({ count }: CountDisplayProps) {
  return (
    <div className="mt-12">
      <p>
        <i className="text-gray-400 text-sm">Component Counter with a Text</i>
      </p>
      <p>Count: {count}</p>
    </div>
  );
}
