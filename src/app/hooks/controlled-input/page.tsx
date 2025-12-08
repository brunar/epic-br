'use client';
import { useState } from 'react';

export default function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <>
      <div>
        <h2>Controlled Input Example</h2>
        <h3>Inputs needs props onChange or readOnly</h3>
        <p>
          If you are using only value and not using <b>onChange</b> props you
          need to add <b>readOnly</b> props
        </p>
        <p>Example Read Only you can&#39;t edit it</p>
        <input value={value} readOnly />
      </div>
      <div className="mt-10">
        <h3>Write the word koala</h3>
        <input
          value={value}
          onChange={(e) =>
            setValue(e.currentTarget.value.replace(/koala/gi, '🐨'))
          }
        />
        <p>You typed: {value}</p>
      </div>
    </>
  );
}
