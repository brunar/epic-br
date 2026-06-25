'use client';
import { Switch } from '@/shared-patterns/switch';
import { useToggle } from '@/components/toggle/toggle-hook-initializer-stability';
import { useState } from 'react';

export default function StateReducerPage() {
  const [timesClicked, setTimesClicked] = useState(0);
  const clickedTooMuch = timesClicked >= 4;

  const { on, getTogglerProps, getResetterProps } = useToggle({
    // 🐨 create a reducer function here that accepts the state and action
    // It should do almost the same thing the regular reducer does in
    // ./toggle.tsx except in the action.type === 'toggle' case, it should check
    // whether the toggle has been clicked too much and if it has then it should
    // just return the state rather than make a new state object.
  });

  return (
    <div>
      <h2>State Reducer</h2>
      <p className="mb-8">
        A way to bring your reducer into an external component.
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
