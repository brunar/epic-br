'use client';
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';

function IntroFocusManagement() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);

  return (
    <div>
      <h2>Intro Focus Management</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/tree/main/src/app/advanced-apis/intro-focus-management"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <p>
        With flushSync, we can ensure that the DOM is updated before we try to
        focus the input.
      </p>
      <button
        className="mr-3"
        onClick={() => {
          flushSync(() => {
            setShow(true);
          });
          inputRef.current?.focus();
        }}
      >
        Show
      </button>

      {show ? <input ref={inputRef} /> : null}

      <p className="mt-10 text-red-600 text-sm font-normal">
        Not trying guessing with setTimeout() or requestAnimationFrame() to wait
        for the DOM to update before focusing the input. flushSync() is the way
        to go!
      </p>
    </div>
  );
}

export default IntroFocusManagement;
