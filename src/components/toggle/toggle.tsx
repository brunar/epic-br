'use client';
import { createContext, useState, use } from 'react';
import { Switch } from '@/shared-patterns/switch';

// https://react.dev/reference/react/createContext
const ToggleContext = createContext<{ on: boolean; toggle: () => void } | null>(
  null,
);

export function Toggle({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  return <ToggleContext value={{ on, toggle }}>{children}</ToggleContext>;
}

export function ToggleOn({ children }: { children: React.ReactNode }) {
  const { on } = use(ToggleContext)!; // "!" do not do that to avoid type null, just to demosntrate this exercise, we will be talking about that in the next commit
  return <>{on ? children : null}</>;
}

export function ToggleOff({ children }: { children: React.ReactNode }) {
  const { on } = use(ToggleContext)!; // "!" do not do that
  return <>{on ? null : children}</>;
}

type ToggleButtonProps = Omit<React.ComponentProps<typeof Switch>, 'on'> & {
  on?: boolean;
};
export function ToggleButton(props: ToggleButtonProps) {
  const { on, toggle } = use(ToggleContext)!; // "!" do not do that
  return <Switch on={on} onClick={toggle} {...props} />;
}
