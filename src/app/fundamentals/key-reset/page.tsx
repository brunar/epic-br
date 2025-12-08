'use client';
import { useState } from 'react';

export default function KeyReset() {
  const [key, setKey] = useState(0);
  return (
    <div>
      <h2>Using the key prop to reset the element</h2>
      <h3 className="pb-8">
        When you update the key prop react removes the element and put a new one
        with that new key
      </h3>
      {/* 🐨 add a key prop to this input and set it to the key state */}
      <input key={key} />
      <button onClick={() => setKey((key) => key + 1)}>Reset</button>
    </div>
  );
}
