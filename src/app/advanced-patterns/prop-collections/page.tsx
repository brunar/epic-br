'use client';
import { useToggle } from '@/components/toggle/toggle-hook';
import { Switch } from '@/shared-patterns/switch';

export default function PropCollectionApp() {
  const { on, togglerProps } = useToggle();

  return (
    <div>
      <h2>Prop Collections</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/blob/main/src/app/advanced-patterns/prop-collections/"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <Switch on={on} {...togglerProps} />
      <hr className="my-8" />
      <button aria-label="custom-button">{on ? 'on' : 'off'}</button>
    </div>
  );
}
