'use client';
import { useToggle } from '@/components/toggle/toggle-hook-better';
import { Switch } from '@/shared-patterns/switch';

export default function PropCollectionApp() {
  const { on, getTogglerProps } = useToggle();

  return (
    <div>
      <h2>Prop Getters</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/blob/main/src/app/advanced-patterns/prop-getters/"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <p>
        See the video again!{' '}
        <a
          className="ml-2 text-blue-500 underline"
          href="https://www.epicreact.dev/workshops/advanced-react-patterns/prop-getters/solution"
          target="_blank"
        >
          Prop Getters Video Course
        </a>
      </p>
      <p className="mb-8">
        This implementation ensures all functions are called correctly and that
        styles and class names are merged properly, so you don’t have to worry
        about the implementation details of which props are being applied.
      </p>

      <Switch {...getTogglerProps({ on })} />
      <hr className="my-8" />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  );
}
