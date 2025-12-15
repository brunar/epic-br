'use client';
import React, { useId } from 'react';

function Field({
  label,
  id,
  ...inputProps
}: {
  label: string;
  id?: string;
} & React.ComponentProps<'input'>) {
  const generatedId = useId();
  id ??= generatedId; // This ??= means OR fallback to generatedId

  return (
    <div>
      <label htmlFor={id} className="mr-1">
        {label}:
      </label>
      <input {...inputProps} id={id} />
    </div>
  );
}

export default function ExampleUseId() {
  return (
    <div>
      <h2>Hook useId()</h2>
      <i className="text-gray-400 block">(Example of generated id)</i>
      <p>When you click on the label, it will focus on the correct input.</p>
      <code className="block mt-6">const generatedId = useId();</code>
      <code className="block">id ??= generatedId;</code>
      <i className="text-gray-400 block mb-6">
        ??= means <b>OR</b> fallback to generatedId
      </i>

      <div className="flex gap-6 items-center">
        <Field
          className="w-20"
          id="max"
          label="Max"
          name="max"
          type="number"
          defaultValue={25}
        />

        <Field
          className="w-20"
          label="Speed"
          name="speed"
          type="number"
          defaultValue={400}
        />

        <div>
          <label>
            <input id="glare" name="glare" type="checkbox" defaultChecked />
            Glare
          </label>
        </div>

        <Field
          className="w-20"
          label="Max Glare"
          name="maxGlare"
          type="number"
          defaultValue={0.5}
        />
      </div>
    </div>
  );
}
