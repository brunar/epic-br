'use client';
import { useReducer, useState } from 'react';

type State = { count: number };
type Action =
  | { type: 'increment'; step: number }
  | { type: 'decrement'; step: number };

function countReducer(state: State, action: Action) {
  const { type, step } = action;

  switch (type) {
    case 'increment': {
      return {
        ...state,
        count: state.count + step,
      };
      break;
    }
    case 'decrement': {
      return {
        ...state,
        count: state.count - step,
      };
      break;
    }
    // In this case no need default case because typescript is defining type increment or decrement only
    // default: {
    //   break;
    // }
  }
}

type CounterProps = {
  initialCount?: number;
  step: number;
};

function Counter({ initialCount = 0, step = 1 }: CounterProps) {
  const [state, dispatch] = useReducer(countReducer, {
    count: initialCount,
  });

  const { count } = state;

  // So no logic going here just passing an action, the logic is above
  const increment = () => dispatch({ type: 'increment', step });
  const decrement = () => dispatch({ type: 'decrement', step });

  return (
    <div className="mt-4">
      <output className="mb-4 inline-block bg-gray-100 px-4 py-2 rounded-lg">
        {count}
      </output>
      <div className="flex gap-2 mb-8">
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
      <h2>Tradicional Reducer</h2>
      <i className="text-gray-400 block mb-8">(See readme.mdx)</i>

      <p className="mt-8">
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
