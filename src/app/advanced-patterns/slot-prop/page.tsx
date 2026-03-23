'use client'; // For the Context Provider
import { Input, Label, Switch, Text } from '@/components/slots/slots';
import { TextField } from '@/components/text-field/text-field';
import { Toggle, ToggleText } from '@/components/toggle/toggle-slot-context';
//import { Switch } from '@/shared-patterns/switch';

export default function SlotsContextApp() {
  return (
    <div>
      <h2>Slot Prop</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/blob/main/src/app/advanced-patterns/slot-prop/"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <p className="mb-8">Changing the toggle to switch and text components</p>
      <div>
        <Toggle>
          <Label>Party mode</Label>
          <Switch />
          <ToggleText slot="onText">Let&apos;s party 🥳</ToggleText>
          <Text slot="onText">Let&apos;s party 🥳</Text>
          <Text slot="offText">Sad town 😭</Text>
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
