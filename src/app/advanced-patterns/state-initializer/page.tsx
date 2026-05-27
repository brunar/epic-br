'use client';
import { Switch } from '@/shared-patterns/switch';
import { useToggle } from '@/components/toggle/toggle-hook-initializer';

export default function StateInitializerPage() {
  // 🐨 add an initialOn option (set it to true) and get the reset callback from useToggle
  const { on, getTogglerProps } = useToggle();
  // 💣 delete this reset callback in favor of what you get from useToggle
  const reset = () => {};
  return (
    <div>
      <h2>State Initializer</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/blob/main/src/app/advanced-patterns/state-initializer/"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <p className="mb-8">
        Adding an initializer to the useReducer hook allows us to set the
        initial state based on props or other dynamic values, and also provides
        a way to reset the state back to its initial value. In this example, we
        can initialize the toggle state to be on or off based on an `initialOn`
        prop, and we can reset it back to that initial state when needed.
      </p>
      <p className="mb-4 font-bold">
        Attention the initial state is setted to TRUE, to reset it to FALSE you
        need to click on the toggle button and then click on reset
      </p>
      <p className="mb-4 text-xs">
        To reset it to FALSE you need to click on the toggle button and then
        click on reset
      </p>
      <Switch {...getTogglerProps({ on })} />
      <hr className="my-8" />
      <button onClick={reset}>Reset</button>
      <hr className="my-8" />
      <h2>With Keys</h2>
      <p>
        Example adding and changing keys it removes the <b>animation</b> on
        reset
      </p>
    </div>
  );
}
