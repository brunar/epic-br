'use client';
import { useState } from 'react';
// import VanillaTilt from 'vanilla-tilt';

// interface HTMLVanillaTiltElement extends HTMLDivElement {
//   vanillaTilt?: VanillaTilt;
// }

// const vanillaTiltOptions = {
//   max: 25,
//   speed: 400,
//   glare: true,
//   'max-glare': 0.5,
// };

function Tilt({ children }: { children: React.ReactNode }) {
  return (
    <div className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  );
}

export default function RefsExample() {
  const [showTilt, setShowTilt] = useState(true);
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setShowTilt((s) => !s)}>Toggle Visibility</button>
      {showTilt ? (
        <Tilt>
          <div className="totally-centered">
            <button
              className="count-button"
              onClick={() => setCount((c) => c + 1)}
            >
              {count}
            </button>
          </div>
        </Tilt>
      ) : null}
    </div>
  );
}
