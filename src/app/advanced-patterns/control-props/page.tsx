'use client';
import { useState } from 'react';
import {
  Toggle,
  type ToggleAction,
  type ToggleState,
} from '@/components/toggle/toggle-hook-crontrol-props';

export default function ControlPropsPage() {
  const [bothOn, setBothOn] = useState(false);
  const [timesClicked, setTimesClicked] = useState(0);

  function handleToggleChange(state: ToggleState, action: ToggleAction) {
    if (action.type === 'toggle' && timesClicked > 4) {
      return;
    }
    setBothOn(state.on);
    setTimesClicked((c) => c + 1);
  }

  function handleResetClick() {
    setBothOn(false);
    setTimesClicked(0);
  }

  return (
    <div>
      <h2>Control Props</h2>
      <p className="mb-8">
        The point here is to have one component or hook that supports both being{' '}
        <b>controlled</b> and <b>uncontrolled</b> with the same code path.
      </p>
      <p>Controlled Toggle:</p>
      <div>
        <Toggle on={bothOn} onChange={handleToggleChange} />
        <Toggle on={bothOn} onChange={handleToggleChange} />
      </div>
      {timesClicked > 4 ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      )}
      <button onClick={handleResetClick}>Reset</button>
      <hr className="my-8" />
      <div>
        <p>Uncontrolled Toggle:</p>
        <Toggle
          onChange={(...args) =>
            console.info('Uncontrolled Toggle onChange', ...args)
          }
        />
      </div>
    </div>
  );
}
