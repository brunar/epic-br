import { useId } from 'react';
import { SlotContext } from '@/components/slots/slots';

export function TextField({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  const generatedId = useId();
  id ??= generatedId; // If no id is provided it fallback to the generate id - useId()

  // 🐨 create a slots object that has props for both label and input slots
  // 💰 the label should provide an htmlFor prop and the input should provide an id
  const slots = {
    label: { htmlFor: id },
    input: { id },
  };
  // 🐨 wrap this in a SlotContext with the value set to the slots object
  return <SlotContext.Provider value={slots}>{children}</SlotContext.Provider>;
}
