'use client';
import { useState, useId } from 'react';
import { SlotContext } from '@/components/slots/slots';
import { Text } from '@/components/slots/slots';

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
    switch: { id, on, onClick: toggle },
    onText: { hidden: !on },
    offText: { hidden: on },
  };

  return <SlotContext.Provider value={slots}>{children}</SlotContext.Provider>;
}

export function ToggleText(
  props: React.ComponentProps<'span'> & { slot: 'onText' | 'offText' },
) {
  return <Text {...props} />;
}
