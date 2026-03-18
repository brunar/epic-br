import { createContext, use } from 'react';

// create a Slots type that's just an object of objects
type Slots = Record<string, Record<string, unknown>>;
// default it to an empty object
export const SlotContext = createContext<Slots>({});

function useSlotProps<Props>(props: Props, slot: string): Props {
  const slots = use(SlotContext);

  return { ...slots[slot], slot, ...props };
}

export function Label(props: React.ComponentProps<'label'>) {
  props = useSlotProps(props, 'label');

  return <label {...props} />;
}

export function Input(props: React.ComponentProps<'input'>) {
  props = useSlotProps(props, 'input');

  return <input {...props} />;
}
