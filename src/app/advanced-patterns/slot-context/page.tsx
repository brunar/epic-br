import { useId } from 'react';
import { Input, Label } from '@/components/slots/slots';
import { TextField } from '@/components/text-field/text-field';
import {
  Toggle,
  ToggleButton,
  ToggleOff,
  ToggleOn,
} from '@/components/toggle/toggle';

export default function SlotsContextApp() {
  const partyModeId = useId();
  return (
    <div>
      <div>
        <Toggle>
          <label htmlFor={partyModeId}>Party mode</label>
          <ToggleButton id={partyModeId} />
          <ToggleOn>Let&apos;s party 🥳</ToggleOn>
          <ToggleOff>Sad town 😭</ToggleOff>
        </Toggle>
      </div>
      <hr className="my-8" />
      <div>
        {/* 🦉 feel free to test the id customization by passing an id here */}
        <TextField>
          {/* 🦉 feel free to test the prop merging by passing props here */}
          <Label>Venue</Label>
          <Input />
        </TextField>
      </div>
    </div>
  );
}
