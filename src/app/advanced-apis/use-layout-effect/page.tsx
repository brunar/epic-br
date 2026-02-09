function IntroUseLayoutEffect() {
  return (
    <div>
      <h2>useLayoutEffect</h2>
      <p>
        A layout effect runs right after React updates the DOM but before the
        browser paints the screen.
      </p>
      <p>
        The more code between render and screen update, the slower the app
        feels.
      </p>
      <p>
        The only difference between <b>useEffect</b> and <b>useLayoutEffect</b>{' '}
        is that runs before the browser paints the DOM updates.
      </p>
      <img src="/images/side-effects.png" alt="" className="max-w-96 mt-10" />

      <p className="mt-12">
        In this case without useLayoutEffect the tooltip is jump to get their
        position
      </p>

      <div className="w-full max-w-5xl">
        <video
          src="/video/tooltip-before-useLayoutEffect.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full"
        />
      </div>

      <p className="mt-10 mb-4">Example code to slows down the rendering</p>
      <pre>
        <code>{`let now = performance.now();
          while (performance.now() - now < 100) {
            // do nothing for 100ms
          }`}</code>
      </pre>
    </div>
  );
}

export default IntroUseLayoutEffect;
