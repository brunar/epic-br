"use client";
import { useState } from "react";

export default function DeriveState() {
  const [count, setCount] = useState(0);
  //const [isEven, setIsEven] = useState(true); //Avoiding extra state

  function handleClick() {
    const newCount = count + 1;
    setCount(newCount);
    //setIsEven(newCount % 2 === 0); //Avoiding extra state
  }

  //Avoiding extra state example
  const isEven = count % 2 === 0;

  return (
    <>
      <div>
        <h2>Derive State</h2>
        <p>{count}</p>
        <p>{isEven ? "Even" : "Odd"}</p>
        <button onClick={handleClick}>Increment</button>
      </div>
    </>
  );
}
