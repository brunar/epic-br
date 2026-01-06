'use client';
import { useReducer, useState } from 'react';

type State = { count: number };
type Action = State;

function countReducer(state: State, action: Action) {
  return { ...state, ...action };
}

type CounterProps = {
  initialCount?: number;
  step: number;
};

function Counter({ initialCount = 0, step = 1 }: CounterProps) {
  const [state, setState] = useReducer(countReducer, {
    count: initialCount,
    someOtherState: 'foo',
  });

  console.log(state);

  const { count } = state;

  const increment = () => setState({ count: count + step });
  const decrement = () => setState({ count: count - step });

  // <code>
  //     const decrement = () => setState({ ...state, count: count - step });
  // </code>

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
      <h2>Object State</h2>
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
