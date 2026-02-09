'use client';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

type InputAPI = { focusInput: () => void };

const MyInput = forwardRef<
  InputAPI,
  React.InputHTMLAttributes<HTMLInputElement>
>(function MyInput(props, ref) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      focusInput: () => inputRef.current?.focus(),
    }),
    [],
  );

  return <input ref={inputRef} {...props} />;
});

export default function IntroImperativeHandle() {
  const myInputRef = useRef<InputAPI>(null);

  return (
    <div>
      <h2>Intro useImperativeHandle</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/tree/main/src/app/advanced-apis/intro-imperative-handle"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <p className="mb-8">
        Performing imperative actions, such as instructing the computer to
        execute a command to focus on this input.
      </p>
      <MyInput ref={myInputRef} placeholder="Enter your name" />
      <button className="mx-3" onClick={() => myInputRef.current?.focusInput()}>
        Focus the input
      </button>
    </div>
  );
}
