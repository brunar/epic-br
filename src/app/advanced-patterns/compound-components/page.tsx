import {
  Toggle,
  ToggleOn,
  ToggleOff,
  ToggleButton,
} from '@/components/toggle/toggle';

export default function CompoundComponentsApp() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
      </Toggle>
    </div>
  );
}
