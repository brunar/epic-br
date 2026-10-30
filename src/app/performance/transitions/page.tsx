'use client';
import { useState, lazy, Suspense, useTransition } from 'react';
import { useSpinDelay } from 'spin-delay';

const loadGlobe = () => import('@/components/globe/globe');
const Globe = lazy(loadGlobe);

const TransitionPage = () => {
  const [showGlobe, setShowGlobe] = useState(false);
  const [isTransitionPending, startTransition] = useTransition();
  const isPending = useSpinDelay(isTransitionPending);

  return (
    <>
      <h2>Transitions</h2>
      <p className="text-sm">
        Adding a transition to the checkbox state change with{' '}
        <span className="bg-yellow-300">useTransition()</span> from react.
      </p>
      <p className="text-sm text-gray-500 mb-4">
        const [isPending, startTransition] = useTransition(false)
      </p>
      <pre>
        <code>
          {`const [isPending, startTransition] = useTransition();

<input
  onChange={(e) => {
    startTransition(() => {
      setShowGlobe(e.currentTarget.checked);
    });
  }}
/>`}
        </code>
      </pre>
      <p className="text-sm">
        <b>Avoiding flash of pending state</b>
        <br />
        <span className="bg-yellow-300">useSpinDelay</span> delays displaying
        the pending state to prevent unnecessary flickering when a transition
        completes quickly.
        <br />
        The default delay is 200ms, but you can customise it by passing an
        options object with a delay property to the hook.
      </p>
      <pre>
        <code>
          {
            'const isPending = useSpinDelay(isTransitionPending, { delay: 200 });'
          }
        </code>
      </pre>

      <p className="text-xs mb-10">
        To test it on console tab network choose Fast 4G, clear cache, and click
        the checkbox to show the globe.
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%',
          padding: '0 2rem 2rem',
          opacity: isPending ? 0.6 : 1, // show a pending state when the transition is in progress
        }}
      >
        <label
          style={{ marginBottom: '1rem' }}
          onFocus={loadGlobe}
          onPointerEnter={loadGlobe}
        >
          <input
            type="checkbox"
            checked={showGlobe}
            onChange={(e) => {
              startTransition(() => {
                setShowGlobe(e.currentTarget.checked);
              });
            }}
          />
          {' show globe'}
        </label>
        <div style={{ width: 400, height: 400 }}>
          <Suspense fallback={<div>Loading...</div>}>
            {showGlobe ? <Globe /> : null}
          </Suspense>
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

export default TransitionPage;
