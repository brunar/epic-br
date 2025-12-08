'use client';
import { useState } from 'react';

// useState
// useRef
// use
// useReducer
// useEffect

export default function ManagingUiState() {
  const [count, setCount] = useState(0);

  const Increment = () => setCount(count + 1);

  return <button onClick={Increment}>Count Click {count}</button>;
}
