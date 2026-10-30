'use client';
import { useState } from 'react';
// remove this import
import Globe from '@/components/globe/globe';

const LazyPage = () => {
  const [showGlobe, setShowGlobe] = useState(false);

  // wrap the code below in a <Suspense /> component
  // with a fallback.
  // try putting it in a few different places and observe how that
  // impacts the user experience.
  return (
    <>
      <h2>lazy</h2>
      <p>Importing the Globe component lazily.</p>
      <p className="text-xs">
        Keep in mind the location of the Suspense boundary when placing it.
      </p>
      <p className="text-xs mb-10">
        Example leave the checkbox outside the Suspense boundary.
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%',
          padding: '0 2rem 2rem',
        }}
      >
        <label style={{ marginBottom: '1rem' }}>
          <input
            type="checkbox"
            checked={showGlobe}
            onChange={(e) => setShowGlobe(e.currentTarget.checked)}
          />
          {' show globe'}
        </label>
        <div style={{ width: 400, height: 400 }}>
          {/* stick a Suspense boundary around this with a fallback of "loading..." */}
          {showGlobe ? <Globe /> : null}
        </div>
      </div>

      <style>{`
        .pin-0 {
            animation: pulse 2s cubic-bezier(0, 0.55, 0.45, 1) infinite;
            pointer-events: none;
        }
        .pin-1 {
            animation: pulse 2s cubic-bezier(0, 0.55, 0.45, 1) infinite;
            animation-delay: 1s;
            pointer-events: none;
        }

        @keyframes pulse {
            0% {
                opacity: 0;
                r: 0;
            }
            50% {
                opacity: 1;
                r: auto;
            }
            100% {
                opacity: 0;
                r: auto;
            }
        }
      `}</style>
    </>
  );
};

export default LazyPage;
