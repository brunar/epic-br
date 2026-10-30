const EagerLoadingPage = () => {
  return (
    <>
      <h2>Eager Loading</h2>

      <p>
        Example of coding added at lazy page.tsx to load the Globe component
        eagerly.
      </p>
      <p className="mb-10">
        The Globe component is imported lazily, but the code to load it is
        executed when the checkbox is focused or hovered over.
      </p>
      <p className="text-xs text-gray-400">(The changes that are committed)</p>
      <pre>
        <code>
          {`const loadGlobe = () => import('@/components/globe/globe');
const Globe = lazy(loadGlobe);

<Label
  style={{ marginBottom: '1rem' }}
  onFocus={loadGlobe}
  onPointerEnter={loadGlobe}
>
  <input
    type="checkbox"
    checked={showGlobe}
    onChange={(e) => setShowGlobe(e.currentTarget.checked)}
  />
</Label>`}
        </code>
      </pre>
    </>
  );
};

export default EagerLoadingPage;
