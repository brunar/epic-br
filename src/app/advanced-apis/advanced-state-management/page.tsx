'use client';
import { useReducer } from 'react';

function nameReducer(previousName: string, newName: string) {
  return newName;
}

const initialNameValue = 'Joe';

export default function IntroApis() {
  const [name, setName] = useReducer(nameReducer, initialNameValue);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.currentTarget.value);

  return (
    <div>
      <h2>Intro to Advanced State Management</h2>
      <label className="mb-2 block">
        Name: <input defaultValue={name} onChange={handleChange} />
      </label>
      <div>You typed: {name}</div>
    </div>
  );
}
