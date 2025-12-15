'use client';
import { useState, useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

interface HTMLVanillaTiltElement extends HTMLDivElement {
  vanillaTilt?: VanillaTilt;
}

function Tilt({
  children,
  max = 25,
  speed = 400,
  glare = true,
  maxGlare = 0.5,
}: {
  children: React.ReactNode;
  max?: number;
  speed?: number;
  glare?: boolean;
  maxGlare?: number;
}) {
  const tiltRef = useRef<HTMLVanillaTiltElement>(null);

  useEffect(() => {
    const { current: tiltNode } = tiltRef;

    if (!tiltNode) return;

    const vanillaTiltOptions = {
      max,
      speed,
      glare,
      'max-glare': maxGlare,
    };

    VanillaTilt.init(tiltNode, vanillaTiltOptions);

    // Cleanup function
    return () => {
      console.log('cleanup');
      tiltNode.vanillaTilt?.destroy();
    };
  }, [max, speed, glare, maxGlare]);

  return (
    <div ref={tiltRef} className="tilt-root mt-4">
      <div className="tilt-child">{children}</div>
    </div>
  );
}

export default function TiltApp() {
  const [showTilt, setShowTilt] = useState(true);
  const [count, setCount] = useState(0);
  const [options, setOptions] = useState({
    max: 25,
    speed: 400,
    glare: true,
    maxGlare: 0.5,
  });
  return (
    <div>
      <h2>Dependencies and Primitive Dependencies</h2>
      <i className="text-gray-400 block">
        (See readme.mdx and committes for Primitive Dependencies)
      </i>
      <p>
        Adding it as a primitive dependency: if you click on the corner of the
        white square (button), it increments without resetting the position.
      </p>

      <button className="my-4" onClick={() => setShowTilt((s) => !s)}>
        Toggle Visibility
      </button>
      {showTilt ? (
        <div>
          <form
            className="flex gap-6 items-center"
            onSubmit={(e) => e.preventDefault()}
            onChange={(event) => {
              const formData = new FormData(event.currentTarget);
              setOptions({
                max: Number(formData.get('max')),
                speed: Number(formData.get('speed')),
                glare: formData.get('glare') === 'on',
                maxGlare: Number(formData.get('maxGlare')),
              });
            }}
          >
            <div>
              <label htmlFor="max">Max:</label>
              <input
                className="w-20"
                id="max"
                name="max"
                type="number"
                defaultValue={25}
              />
            </div>
            <div>
              <label htmlFor="speed">Speed:</label>
              <input
                className="w-20"
                id="speed"
                name="speed"
                type="number"
                defaultValue={400}
              />
            </div>
            <div>
              <label>
                <input id="glare" name="glare" type="checkbox" defaultChecked />
                Glare
              </label>
            </div>
            <div>
              <label htmlFor="maxGlare">Max Glare:</label>
              <input
                className="w-20"
                id="maxGlare"
                name="maxGlare"
                type="number"
                defaultValue={0.5}
              />
            </div>
          </form>
          <br />
          <Tilt {...options}>
            <div className="totally-centered">
              <button
                className="count-button text-gray-900"
                onClick={() => setCount((c) => c + 1)}
              >
                {count}
              </button>
            </div>
          </Tilt>
        </div>
      ) : null}
    </div>
  );
}
