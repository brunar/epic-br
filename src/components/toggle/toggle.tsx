'use client';
import { createContext, useState, use, useId } from 'react';
import { Switch } from '@/shared-patterns/switch';
import { SlotContext } from '@/components/slots/slots';

// https://react.dev/reference/react/createContext
type ToggleValue = { id: string; on: boolean; toggle: () => void };

const ToggleContext = createContext<ToggleValue | null>(null);

export function Toggle({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  const [on, setOn] = useState(false);
  const generatedId = useId();
  id ??= generatedId; // If no id is provided it fallback to the generate id - useId()

  const toggle = () => setOn(!on);

  // Create Slots object for the label
  const slots = {
    label: { htmlFor: id },
  };

  return (
    <SlotContext.Provider value={slots}>
      <ToggleContext.Provider value={{ id, on, toggle }}>
        {children}
      </ToggleContext.Provider>
    </SlotContext.Provider>
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
  const { id, on, toggle } = useToggle();
  return <Switch id={id} on={on} onClick={toggle} {...props} />;
}
