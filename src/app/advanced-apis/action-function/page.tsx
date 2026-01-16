'use client';
import { useReducer, useState } from 'react';

type State = { count: number };
type Action = Partial<State> | ((state: State) => Partial<State>);

function countReducer(state: State, action: Action) {
  return {
    ...state,
    ...(typeof action === 'function' ? action(state) : action),
  }; // *** Best way *** to add the spread operator
}

type CounterProps = {
  initialCount?: number;
  step: number;
};

function Counter({ initialCount = 0, step = 1 }: CounterProps) {
  const [state, setState] = useReducer(countReducer, {
    count: initialCount,
  });

  const { count } = state;

  const increment = () =>
    setState((currentState) => ({ count: currentState.count + step }));

  const decrement = () =>
    setState((currentState) => ({ count: currentState.count - step }));

  const incrementTestCurrentState = () => {
    setTimeout(() => {
      setState((currentState) => ({ count: currentState.count + step }));
    }, 500);
  };

  const incrementTestNotCurrentState = () => {
    setTimeout(() => {
      setState({ count: count + step });
    }, 500);
  };

  const incrementMultipleTimesCurrentState = () => {
    setState((currentState) => ({ count: currentState.count + step }));
    setState((currentState) => ({ count: currentState.count + step }));
    setState((currentState) => ({ count: currentState.count + step }));
  };

  const incrementMultipleTimesNotCurrentState = () => {
    setState({ count: count + step });
    setState({ count: count + step });
    setState({ count: count + step });
  };

  return (
    <div className="mt-4">
      <output className="mb-4 inline-block bg-gray-100 px-4 py-2 rounded-lg">
        {count}
      </output>
      <div className="flex gap-2 mb-8">
        <button onClick={decrement}>←</button>
        <button onClick={increment}>→</button>
      </div>
      <div className="flex flex-col gap-2 mt-24 mb-8">
        <h3>
          TEST 2 EXAMPLES:{' '}
          <span className="text-gray-500">
            Why Action Function currentState?
          </span>
        </h3>
        <h3>1. This has a setTimeout 500ms, so to test it click many times</h3>
        <p>With the currentState (It knows how many times you clicked on it)</p>
        <button
          className="w-10 bg-green-600"
          onClick={incrementTestCurrentState}
        >
          →
        </button>
        <p>
          Without the currentState, only normal state (It goes one by one, no
          matter how many times you clicked on it)
        </p>
        <button
          className="w-10 bg-green-600"
          onClick={incrementTestNotCurrentState}
        >
          →
        </button>
      </div>
      <div className="flex flex-col gap-2 my-16 mb-8">
        <h3>2. Another reason is if you call the function multiple times</h3>
        <b>Example 3 times declared setState in the function</b>
        <p>With the currentState (It goes 3 by 3 beacuse currentState)</p>
        <button
          className="w-10 bg-blue-600"
          onClick={incrementMultipleTimesCurrentState}
        >
          →
        </button>
        <p>
          Without the currentState, It goes one by one, and the fuction is being
          declared 3 times
        </p>
        <button
          className="w-10 bg-blue-600"
          onClick={incrementMultipleTimesNotCurrentState}
        >
          →
        </button>
      </div>
      <b className="bg-yellow-300">
        So for these two reasons, if your state depends on previous versions of
        the state, then you should definitely be using the callback form
        (currentState).
      </b>
      <p>
        That is why it was important that we update our reducer to support in
        action(dispatch): function or state.
      </p>
      <code>
        ...(typeof action === &apos;function&apos; ? action(state) : action)
      </code>
    </div>
  );
}

export default function NewState() {
  const [step, setStep] = useState(1);

  return (
    <div>
      <h2>Action Function</h2>
      <i className="text-gray-400 block mb-8">(See readme.mdx)</i>
      <p>
        It is important if you have a promise async that awaiting for the state,
        you can get the current state.
      </p>
      <p>
        The reason this is actually really valuable is because if we were to put
        this setState call inside of a promise then handler, or after an await,
        then it will have previously state.
      </p>
      <p>
        If your state change depends on the current state, then you should use
        the function callback form like this, which we have in our useState hook
        also supports a callback like this
      </p>
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
