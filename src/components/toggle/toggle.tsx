'use client';
import { createContext, useState, use } from 'react';
import { Switch } from '@/shared-patterns/switch';

// https://react.dev/reference/react/createContext
type ToggleValue = { on: boolean; toggle: () => void };

const ToggleContext = createContext<ToggleValue | null>(null);

export function Toggle({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

function useToggle() {
  const context = use(ToggleContext);
  // context === null
  if (!context) {
    throw new Error(
      'ToggleContext not found. All Toggle components must be render in a <Toggle />',
    ); //Toggle must be used within a ToggleProvider
  }
  return context;
}

export function ToggleOn({ children }: { children: React.ReactNode }) {
  const { on } = useToggle();
  return <>{on ? children : null}</>;
}

export function ToggleOff({ children }: { children: React.ReactNode }) {
  const { on } = useToggle();
  return <>{on ? null : children}</>;
}

type ToggleButtonProps = Omit<React.ComponentProps<typeof Switch>, 'on'> & {
  on?: boolean;
};
export function ToggleButton(props: ToggleButtonProps) {
  const { on, toggle } = useToggle();
  return <Switch on={on} onClick={toggle} {...props} />;
}
