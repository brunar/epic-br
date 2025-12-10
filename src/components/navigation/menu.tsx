import Link from 'next/link';

const MenuFundamentals = [
  { href: '/fundamentals/greeting', label: 'greeting' },
  { href: '/fundamentals/form', label: 'form' },
  { href: '/fundamentals/style', label: 'style' },
  { href: '/fundamentals/style2', label: 'style2' },
  { href: '/fundamentals/calculator', label: 'calculator' },
  { href: '/fundamentals/render-array', label: 'render-array' },
  { href: '/fundamentals/render-array-focus', label: 'renderarray-focus' },
  { href: '/fundamentals/key-reset', label: 'key-reset' },
];

const MenuHooks = [
  { href: '/hooks/managing-ui-state', label: 'managing-ui-state' },
  { href: '/hooks/use-state', label: 'use-state' },
  { href: '/hooks/controlled-input', label: 'controlled-input' },
  { href: '/hooks/derive-state', label: 'derive-state' },
  { href: '/hooks/initialize-state', label: 'initialize-state' },
  { href: '/hooks/init-callback', label: 'init-callback' },
  { href: '/hooks/side-effects', label: 'side-effects' },
  { href: '/hooks/effect-cleanup', label: 'effect-cleanup' },
  { href: '/hooks/lifting-state', label: 'lifting-state' },
  { href: '/hooks/lift-state-project', label: 'lift-state-project' },
];

export function MenuAside() {
  return (
    <nav className="col-span-1 border rounded-2xl p-8">
      <ul>
        <li className="text-gray-400">Fundamentals</li>
        {MenuFundamentals.map((item) => (
          <li key={item.label}>
            <Link
              className="text-blue-500 hover:text-blue-800 font-bold text-sm"
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}

        <li className="pt-8 text-gray-400">Hooks</li>
        {MenuHooks.map((item) => (
          <li key={item.label}>
            <Link
              className="text-blue-500 hover:text-blue-800 font-bold text-sm"
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
