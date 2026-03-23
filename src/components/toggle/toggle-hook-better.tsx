'use client';
import { useState } from 'react';

// This case is better with the function getTogglerProps than togglerProps

export function useToggle() {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  function callAll(...fns: Array<Function | undefined>) {
    return (...args: any) => fns.forEach((fn) => fn?.(...args));
  }

  // Making the type Props generic on typescript and giving onClick as optional
  // or could be onClick?: () => void
  function getTogglerProps<Props>({
    onClick,
    ...props
  }: Props & { onClick?: React.ComponentProps<'button'>['onClick'] }) {
    return {
      'aria-checked': on,
      // OR you could make a funtion instead on passing all this bellow
      // onClick(event: React.MouseEvent<HTMLButtonElement>) {
      //   onClick?.(event);
      //   toggle();
      // },
      onClick: callAll(onClick, toggle),
      ...props, // Example need to pass back the props on
    };
  }

  return {
    on,
    toggle,
    getTogglerProps,
  };
}
