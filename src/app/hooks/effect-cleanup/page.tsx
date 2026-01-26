'use client';
import { useState, useEffect } from 'react';

function SideEffects() {
  useEffect(() => {
    const hugeData = new Array(1_000_000).fill(
      new Array(1_000_000).fill('🐶🐱🐛'),
    );

    const handler = () => {
      console.log(hugeData);
      console.log('popstate event listener called');
    };

    window.addEventListener('popstate', handler);

    //Return the cleanup function isnide useEffect
    return () => {
      console.log('cleaning up');

      window.removeEventListener('popstate', handler);
    };
  }, []);

  return (
    <div>
      <h2>Effect Cleanup</h2>

      <i className="text-gray-400">
        (See on the console, in the memory tab, and in the browser/more
        tools/task manager)
      </i>

      <p>
        To test <b>memory leaks</b>, comment out the <b>cleanup function</b> in
        useEffect. Also, test with the cleanup function inside useEffect to see
        great memory working.
      </p>

      <p className="mb-6">
        Checked and unchecked the checkbox hundred times to see the action
        described above.
      </p>

      <div className="max-w-md">
        <i>
          The huge data is being generate 2 millions array on console inside
          useEffect 🐶🐱🐛
        </i>
        {new Array(30).fill('🐶🐱🐛')}
      </div>

      <img
        src="/images/console-tab-memory.png"
        alt=""
        className="max-w-md mt-10"
      />
      <img
        src="/images/browser-task-manager.png"
        alt=""
        className="max-w-md mt-10"
      />
    </div>
  );
}

export default function DemoSideEffects() {
  const [showData, setShowData] = useState(true);

  return (
    <div>
      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          checked={showData}
          onChange={(e) => setShowData(e.currentTarget.checked)}
        />{' '}
        show data
      </label>
      {showData ? <SideEffects /> : null}
    </div>
  );
}
