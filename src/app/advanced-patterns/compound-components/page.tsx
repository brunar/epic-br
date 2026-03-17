import {
  Toggle,
  ToggleOn,
  ToggleOff,
  ToggleButton,
} from '@/components/toggle/toggle';

export default function CompoundComponentsApp() {
  return (
    <div>
      <h2>Compound Components</h2>
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
    </div>
  );
}
