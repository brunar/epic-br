'use client';
import { useReducer, useState } from 'react';

function countReducer(count: number, change: number) {
  return count + change;
}

type CounterProps = {
  initialCount?: number;
  step: number;
};

function Counter({ initialCount = 0, step = 1 }: CounterProps) {
  const [count, changeCount] = useReducer(countReducer, initialCount);

  const increment = () => changeCount(step);
  const decrement = () => changeCount(-step);

  return (
    <div className="mt-4">
      <output className="mb-4 inline-block bg-gray-100 px-4 py-2 rounded-lg">
        {count}
      </output>
      <div className="flex gap-2">
        <button onClick={decrement}>←</button>
        <button onClick={increment}>→</button>
      </div>
    </div>
  );
}

export default function PreviousState() {
  const [step, setStep] = useState(1);

  return (
    <div>
      <h2>Previous State</h2>
      <i className="text-gray-400 block mb-8">(See readme.mdx)</i>
      <p>
        <b>Counter:</b>
      </p>
      <form>
        <div>
          <label htmlFor="step-input" className="mr-2">
            Step
          </label>
          <input
            id="step-input"
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.currentTarget.value))}
          />
        </div>
      </form>
      <Counter step={step} />
    </div>
  );
}
