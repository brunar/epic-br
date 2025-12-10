'use client';
import { useEffect, useRef } from 'react';

export default function DomSideEffects() {
  const myDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const myDiv = myDivRef.current;

    // myDiv is the div DOM node!
    console.log(myDiv);
  }, []);

  return (
    <div>
      <h2>Dom Side Effects - useRef</h2>
      <i className="text-gray-400">(See div ref on the console)</i>

      <div className="mt-4" ref={myDivRef}>
        Hi
      </div>
    </div>
  );
}
