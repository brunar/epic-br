'use client';
import { useState } from 'react';

function Footer({ color }: { color: string }) {
  return <footer style={{ color }}>I am the ({color}) footer</footer>;
}

function Main({ footer }: { footer: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  return (
    <div className="space-y-4 mt-4">
      <button onClick={increment}>The count is {count}</button>
      {footer}
    </div>
  );
}

export default function ElementPropsPage() {
  const [color, setColor] = useState('black');
  return (
    <div>
      <h2>Element Props</h2>
      <p className="mb-8">
        Performance improvement is achieved using <b>composition</b>, the
        patterns that are learned in advanced React patterns.
      </p>
      <div>
        <p>Set the footer color:</p>
        <div style={{ display: 'flex', gap: 4 }}>
          <button onClick={() => setColor('black')}>Black</button>
          <button onClick={() => setColor('blue')}>Blue</button>
          <button onClick={() => setColor('green')}>Green</button>
        </div>
      </div>
      <Main footer={<Footer color={color} />} />
    </div>
  );
}
