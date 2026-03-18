'use client'; // For the Context Provider
import { Input, Label } from '@/components/slots/slots';
import { TextField } from '@/components/text-field/text-field';
import {
  Toggle,
  ToggleButton,
  ToggleOff,
  ToggleOn,
} from '@/components/toggle/toggle';

export default function SlotsContextApp() {
  return (
    <div>
      <h2>Slots Context AND Generic Slot Components</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/blob/main/src/app/advanced-patterns/slot-context/"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <p className="mb-8">
        Added id on toggle through slots context, if u click on toggle label it
        will turn ON/OFF
      </p>
      <div>
        <Toggle>
          <Label>Party mode</Label>
          <ToggleButton />
          <ToggleOn>Let&apos;s party 🥳</ToggleOn>
          <ToggleOff>Sad town 😭</ToggleOff>
        </Toggle>
      </div>
      <hr className="my-8" />
      <div>
        {/* 🦉 feel free to test the id customization by passing an id here */}
        <TextField id="my-text">
          {/* 🦉 feel free to test the prop merging by passing props here */}
          <Label>Venue</Label>
          <Input />
        </TextField>
      </div>
    </div>
  );
}
