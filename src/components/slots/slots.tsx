import React, { createContext, use } from 'react';
import { Switch as BaseSwitch } from '@/shared-patterns/switch';

// create a Slots type that's just an object of objects
type Slots = Record<string, Record<string, unknown>>;
// default it to an empty object
export const SlotContext = createContext<Slots>({});

function useSlotProps<Props>(
  props: Props & { slot?: string },
  defaultSlot: string,
): Props {
  const slot = props.slot ?? defaultSlot; //if has props slot return it otherwise return defaultSlot
  if (!slot) return props; // if doesn't have a prop slot return props

  const slots = use(SlotContext);

  return { ...slots[slot], slot: defaultSlot, ...props } as Props;
}

export function Label(
  props: React.ComponentProps<'label'> & { slot?: string },
) {
  props = useSlotProps(props, 'label');

  return <label {...props} />;
}

export function Input(
  props: React.ComponentProps<'input'> & { slot?: string },
) {
  props = useSlotProps(props, 'input');

  return <input {...props} />;
}

export function Text(props: React.ComponentProps<'span'> & { slot?: string }) {
  props = useSlotProps(props, 'text');

  return <span {...props} />;
}

type SwitchProps = Omit<React.ComponentProps<typeof BaseSwitch>, 'on'> & {
  slot?: string;
};
export function Switch(props: SwitchProps) {
  return (
    <BaseSwitch
      {...(useSlotProps(props, 'switch') as React.ComponentProps<
        typeof BaseSwitch
      >)}
    />
  );
}
