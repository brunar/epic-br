import {
  Toggle,
  ToggleOn,
  ToggleOff,
  ToggleButton,
} from '@/components/toggle/toggle';

export default function CompoundComponentsApp() {
  return (
    <div>
      <h2>Compound Components and Validation</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/blob/main/src/app/advanced-patterns/compound-components/"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <hr className="my-4" />
        <ToggleButton />
      </Toggle>
      <p className="mt-10 mb-4">
        This validation fixes the types and add error handles using the best
        practice for creating a context with custom hook:
      </p>
      <pre>
        <code>{`function useToggle() {
            const context = use(ToggleContext);
            // context === null
            if (!context) {
              throw new Error(
                'ToggleContext not found. All Toggle components must be render in a <Toggle />',
              ); //Toggle must be used within a ToggleProvider
            }
            return context;
          }`}</code>
      </pre>
      <p className="mt-8">
        To test and see the error message handler(on console) delete all tags
        and just leave the tag:{' '}
        <span className="text-gray-400 text-xs">
          (see the error on console)
        </span>
      </p>
      <pre>
        <code>{`<ToggleButton />`}</code>
      </pre>
    </div>
  );
}
