'use client';
import { useState, useEffect, useCallback } from 'react';

function useCount() {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  return { count, increment };
}

function CounterBtn() {
  const { count, increment } = useCount();

  return (
    <button onClick={increment} className="mb-8">
      Click Increment {count}
    </button>
  );
}

function Counter() {
  const { count, increment } = useCount();

  useEffect(() => {
    const id = setInterval(() => {
      increment();
    }, 1000);

    return () => clearInterval(id);
  }, [increment]);

  return <div className="mb-8">{count}</div>;
}

function useCount2() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((c: number) => c + 1), []);
  return { count, increment };
}

function Counter2() {
  const { count, increment } = useCount2();

  useEffect(() => {
    const id = setInterval(increment, 1000);

    return () => clearInterval(id);
  }, [increment]);

  return <div>{count}</div>;
}

const IntroCustomHook = () => {
  return (
    <div>
      <h2>Intro Custom Hook</h2>
      <i className="text-gray-400 mb-4 block">(See readme.mdx)</i>
      <h3>Hook: useCount()</h3>
      <p>Increment with onClick button</p>
      <CounterBtn />

      <h3>useCount</h3>
      <p>Function increment inside useEffect()</p>
      <span className="text-red-600 text-sm font-normal">
        Here some concern about the dependencies array like [increment]
        dependency on useEffect.
        <br /> This means the increment function will be diferent every time we
        render. When increment is called, it is going to call setCount.
        <br /> Means you gonna create the setInterval many times, because it
        will get clear and it will create again.
        <br />
        Certainly not optimal to clear the interval and set a new one every
        single time
      </span>
      <Counter />

      <h3>
        useCount with hook useCallback{' '}
        <span className="text-green-600 text-sm font-normal mx-4">
          Better way!
        </span>
      </h3>
      <p>
        So you have to memoize function increment with useCallback() to be used
        inside useEffect()
      </p>
      <Counter2 />

      <a
        href="https://www.epicweb.dev/talks/caching-for-cash"
        target="_blank"
        className="link mt-8 block"
      >
        Watch Caching for Cash ➔
      </a>
    </div>
  );
};

export default IntroCustomHook;
