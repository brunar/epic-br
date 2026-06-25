'use client';
import { Switch } from '@/shared-patterns/switch';
import { useToggle } from '@/components/toggle/toggle-hook-initializer-stability';
import { useState } from 'react';

export default function DefaultStateReducerPage() {
  const [timesClicked, setTimesClicked] = useState(0);
  const clickedTooMuch = timesClicked >= 4;

  const { on, getTogglerProps, getResetterProps } = useToggle({
    reducer(state, action) {
      switch (action.type) {
        case 'toggle': {
          if (clickedTooMuch) {
            return state;
          }
          return { on: !state.on };
        }
        case 'reset': {
          return { on: false };
        }
      }
    },
  });

  return (
    <div>
      <h2>Default State Reducer</h2>
      <p className="mb-8">
        A better way to integrate a reusable reducer by extending state with new
        properties without rewriting existing cases or props.
      </p>

      <Switch
        {...getTogglerProps({
          on: on,
          onClick: () => setTimesClicked((count) => count + 1),
        })}
      />
      {clickedTooMuch ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : timesClicked > 0 ? (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      ) : null}

      <hr className="my-8" />
      <button {...getResetterProps({ onClick: () => setTimesClicked(0) })}>
        Reset
      </button>
    </div>
  );
}
