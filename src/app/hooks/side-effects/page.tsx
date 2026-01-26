'use client';

export default function SideEffects() {
  return (
    <div>
      <h2>Side Effects</h2>
      <i className="text-gray-400">(Read only)</i>
      <p>
        Good to keep the function inside the useEffect, internally, because of
        the dependencies are trigger when something has changed.
      </p>
      <code>
        {`useEffect(() => {
            // your side-effect code here.
            // this is where you can interact with browser APIs for example
            doSomeThing()
            return function cleanup() {
              // if you need to clean up after your side-effect (like unsubscribe from an
              // event), you can do it here
              doSomeCleanup()
            }
          }, [
            // this is where dependencies of your useEffect callback go
            // we'll talk about this in depth in a future exercise.
            // In this exercise, we'll just leave it as an empty array
            dep1,
            dep2,
          ])`}
      </code>
      <img src="/images/side-effects.png" alt="" className="max-w-96 mt-10" />
    </div>
  );
}
