'use client';
import { useMemo, useState, useRef, useEffect } from 'react';

function debounce<Callback extends (...args: Array<unknown>) => void>(
  fn: Callback,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<Callback>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

function useDebounce<Callback extends (...args: Array<unknown>) => unknown>(
  callback: Callback,
  delay: number,
) {
  // 🐨 create a latest ref (via useRef and useEffect) here
  const latestCallbackRef = useRef(callback);
  useEffect(() => {
    latestCallbackRef.current = callback;
  });

  // use the latest version of the callback here:
  // 💰 you'll need to pass an anonymous function to debounce. Do *not*
  // simply change this to `debounce(latestCallbackRef.current, delay)`
  // as that won't work. Can you think of why?
  return useMemo(
    () => debounce((...args) => latestCallbackRef.current(...args), delay),
    [delay],
  );
}

function LatestRefApp() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  // 🦉 feel free to swap these two implementations and see they don't make
  // any difference to the user experience
  // const increment = useCallback(() => setCount(c => c + step), [step])
  const increment = () => setCount((c) => c + step);
  const debouncedIncrement = useDebounce(increment, 3000);
  return (
    <div>
      <h2>Latest Ref</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/blob/main/src/app/advanced-patterns/latest-ref/"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <p>
        To test this example, click the increment button, then change the step
        value; it will update based on the new step value, independent of
        whether you have already clicked.
      </p>
      <div className="mb-4">
        <label>
          Step:{' '}
          <input
            type="number"
            step="1"
            min="1"
            max="10"
            onChange={(e) => setStep(Number(e.currentTarget.value))}
            defaultValue={step}
          />
        </label>
      </div>
      <button onClick={debouncedIncrement}>Increment {count}</button>
    </div>
  );
}

export default LatestRefApp;
