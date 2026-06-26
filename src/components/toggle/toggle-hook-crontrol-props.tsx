'use client';
import { useReducer, useRef } from 'react';
import { Switch } from '@/shared-patterns/switch';

function callAll<Args extends Array<unknown>>(
  ...fns: Array<((...args: Args) => unknown) | undefined>
) {
  return (...args: Args) => fns.forEach((fn) => fn?.(...args));
}

export type ToggleState = { on: boolean };
export type ToggleAction =
  | { type: 'toggle' }
  | { type: 'reset'; initialState: ToggleState };

export function toggleReducer(state: ToggleState, action: ToggleAction) {
  switch (action.type) {
    case 'toggle': {
      return { on: !state.on };
    }
    case 'reset': {
      return action.initialState;
    }
  }
}

export function useToggle({
  on: controlledOn,
  onChange,
  initialOn = false,
  reducer = toggleReducer,
}: {
  on?: boolean;
  onChange?: (state: ToggleState, action: ToggleAction) => void;
  initialOn?: boolean;
  reducer?: typeof toggleReducer;
} = {}) {
  const { current: initialState } = useRef<ToggleState>({ on: initialOn });
  const [state, dispatch] = useReducer(reducer, initialState);

  const onIsControled = controlledOn != null;

  const on = onIsControled ? controlledOn : state.on;

  function dispatchWithOnChange(action: ToggleAction) {
    if (!onIsControled) {
      return dispatch(action);
    }
    // {...state, on} - merge our current state with the externally managed state
    const newState = reducer({ ...state, on }, action);
    // if on change function is available, call the new state
    onChange?.(newState, action);
  }

  const toggle = () => dispatchWithOnChange({ type: 'toggle' });
  const reset = () => dispatchWithOnChange({ type: 'reset', initialState });

  function getTogglerProps<Props>({
    onClick,
    ...props
  }: { onClick?: React.ComponentProps<'button'>['onClick'] } & Props) {
    return {
      'aria-checked': on,
      onClick: callAll(onClick, toggle),
      ...props,
    };
  }

  function getResetterProps<Props>({
    onClick,
    ...props
  }: { onClick?: React.ComponentProps<'button'>['onClick'] } & Props) {
    return {
      onClick: callAll(onClick, reset),
      ...props,
    };
  }

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
    getResetterProps,
  };
}

export function Toggle({
  on: controlledOn,
  onChange,
}: {
  on?: boolean;
  onChange?: (state: ToggleState, action: ToggleAction) => void;
}) {
  const { on, getTogglerProps } = useToggle({
    on: controlledOn,
    onChange,
  });
  const props = getTogglerProps({ on });
  return <Switch {...props} />;
}
