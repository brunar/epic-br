'use client';
import { useState } from 'react';

type CounterProps = {
  initialCount?: number;
  step: number;
};

function Counter({ initialCount = 0, step = 1 }: CounterProps) {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);

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

export default function NewState() {
  const [step, setStep] = useState(1);

  return (
    <div>
      <h2>New State</h2>
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
