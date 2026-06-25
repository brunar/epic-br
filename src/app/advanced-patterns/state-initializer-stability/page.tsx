'use client';
import { Switch } from '@/shared-patterns/switch';
import { useToggle } from '@/components/toggle/toggle-hook-initializer-stability';
import { useState } from 'react';

export default function StateInitializerStabilityPage() {
  const [initialOn, setInitialOn] = useState(true);
  const { on, reset, getTogglerProps } = useToggle({ initialOn });

  return (
    <div>
      <h2>State Initializer Stability</h2>
      <p>
        The point is initial value should not change after you make a state
        change from outside the component.
      </p>
      <p>
        This is what <b>initial state</b> means.
      </p>
      <p>
        So them you make a useRef state current as default in the useToggle
        hook, and It never changes.
      </p>
      <p className="text-xs">See the difference in the starting committe.</p>
      <p className="text-xs bg-yellow-300">
        Does NOT matter if you click in the button to change the states it will
        NOT change because the initial state is stable and never changes.
      </p>
      <p className="text-xs mb-8">
        Unless if you change the key it will change because it will re-render
        the component and the initial state will be re-evaluated.
      </p>
      <button className="mb-8" onClick={() => setInitialOn((prev) => !prev)}>
        initialOn is: {initialOn ? 'true' : 'false'}
      </button>
      <Switch {...getTogglerProps({ on })} />
      <hr className="my-8" />
      <button onClick={reset}>Reset</button>
    </div>
  );
}
