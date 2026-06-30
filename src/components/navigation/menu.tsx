'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';

type LinkItem = { href: string; label: string };
type Section = { id: string; title: string; items: readonly LinkItem[] };

const SECTIONS = [
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    items: [
      { href: '/fundamentals/greeting', label: 'greeting' },
      { href: '/fundamentals/form', label: 'form' },
      { href: '/fundamentals/style', label: 'style' },
      { href: '/fundamentals/style2', label: 'style2' },
      { href: '/fundamentals/calculator', label: 'calculator' },
      { href: '/fundamentals/render-array', label: 'render-array' },
      { href: '/fundamentals/render-array-focus', label: 'renderarray-focus' },
      { href: '/fundamentals/key-reset', label: 'key-reset' },
    ],
  },
  {
    id: 'hooks',
    title: 'Hooks',
    items: [
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
      { href: '/hooks/dom-side-effects', label: 'dom-side-effects' },
      { href: '/hooks/refs', label: 'refs' },
      { href: '/hooks/dependencies', label: 'dependencies' },
      { href: '/hooks/unique-ids', label: 'unique-ids' },
      { href: '/hooks/use-id', label: 'use-id' },
      { href: '/hooks/tic-tac-toe', label: 'tic-tac-toe' },
      { href: '/hooks/tic-tac-toe-history', label: 'tic-tac-toe-history' },
    ],
  },
  {
    id: 'advanced-apis',
    title: 'Advanced React APIs',
    items: [
      {
        href: '/advanced-apis/advanced-state-management',
        label: 'advanced-state-management',
      },
      {
        href: '/advanced-apis/new-state',
        label: 'new-state',
      },
      {
        href: '/advanced-apis/previous-state',
        label: 'previous-state',
      },
      {
        href: '/advanced-apis/object-state',
        label: 'object-state',
      },
      {
        href: '/advanced-apis/action-function',
        label: 'action-function',
      },
      {
        href: '/advanced-apis/tradicional-reducer',
        label: 'tradicional-reducer',
      },
      {
        href: '/advanced-apis/tic-tac-toe-history',
        label: 'tic-tac-toe-history',
      },
      {
        href: '/advanced-apis/optimize-state',
        label: 'optimize-state-updates',
      },
      {
        href: '/advanced-apis/intro-custom-hooks',
        label: 'intro-custom-hooks',
      },
      {
        href: '/advanced-apis/use-callback',
        label: 'use-callback',
      },
      {
        href: '/advanced-apis/intro-use-context',
        label: 'intro-use-context',
      },
      {
        href: '/advanced-apis/context-provider',
        label: 'context-provider',
      },
      {
        href: '/advanced-apis/intro-portals',
        label: 'intro-portals',
      },
      {
        href: '/advanced-apis/use-layout-effect',
        label: 'use-layout-effect',
      },
      {
        href: '/advanced-apis/intro-imperative-handle',
        label: 'intro-imperative-handle',
      },
      {
        href: '/advanced-apis/use-imperative-handle',
        label: 'use-imperative-handle',
      },
      {
        href: '/advanced-apis/intro-focus-management',
        label: 'intro-focus-management',
      },
      {
        href: '/advanced-apis/flush-sync',
        label: 'flush-sync',
      },
      {
        href: '/advanced-apis/intro-sync-external-state',
        label: 'intro-sync-external-state',
      },
      {
        href: '/advanced-apis/use-sync-external-store',
        label: 'use-sync-external-store',
      },
      {
        href: '/advanced-apis/make-store-utility',
        label: 'make-store-utility',
      },
    ],
  },
  {
    id: 'suspense',
    title: 'React Suspense',
    items: [
      { href: '/suspense/intro-data-fetching', label: 'intro-data-fetching' },
      {
        href: 'https://github.com/brunar/epic-br/tree/main/src/app/suspense/utility',
        label: 'utility',
      },
      {
        href: '/suspense/intro-dynamic-promise',
        label: 'intro-dynamic-promise',
      },
      {
        href: '/suspense/promise-cache',
        label: 'promise-cache / useTransition / useOptimistic',
      },
      {
        href: 'https://github.com/brunar/epic-br/tree/main/src/app/suspense/pending-flash',
        label: 'pending-flash',
      },
      {
        href: 'https://github.com/brunar/epic-br/tree/main/src/app/suspense/use-optimistic',
        label: 'use-optimistic',
      },
      {
        href: 'https://github.com/brunar/epic-br/tree/main/src/app/suspense/form-status',
        label: 'form-status',
      },
      {
        href: 'https://github.com/brunar/epic-br/tree/main/src/app/suspense/multi-step-actions',
        label: 'multi-step-actions',
      },
      {
        href: 'https://github.com/brunar/epic-br/tree/main/src/app/suspense/intro-suspense-img',
        label: 'intro-suspense-img',
      },
      {
        href: 'https://github.com/brunar/epic-br/tree/main/src/app/suspense/img-error-boundary',
        label: 'img-error-boundary',
      },
      {
        href: 'https://github.com/brunar/epic-br/tree/main/src/app/suspense/key-prop',
        label: 'key-prop',
      },
      {
        href: '/suspense/use-deferred-value',
        label: 'use-deferred-value',
      },
      {
        href: 'https://github.com/brunar/epic-br/tree/main/src/app/suspense/parallel-loading',
        label: 'parallel-loading',
      },
      {
        href: 'https://github.com/brunar/epic-br/tree/main/src/app/suspense/server-cache',
        label: 'server-cache',
      },
    ],
  },
  {
    id: 'advanced-patterns',
    title: 'Advanced React Patterns',
    items: [
      { href: '/advanced-patterns/composition', label: 'composition' },
      { href: '/advanced-patterns/latest-ref', label: 'latest-ref' },
      {
        href: '/advanced-patterns/compound-components',
        label: 'compound-components',
      },
      {
        href: '/advanced-patterns/slot-context',
        label: 'slot-context',
      },
      {
        href: '/advanced-patterns/slot-prop',
        label: 'slot-prop',
      },
      {
        href: '/advanced-patterns/prop-collections',
        label: 'prop-collections',
      },
      {
        href: '/advanced-patterns/prop-getters',
        label: 'prop-getters',
      },
      {
        href: '/advanced-patterns/state-initializer',
        label: 'state-initializer',
      },
      {
        href: '/advanced-patterns/state-initializer-stability',
        label: 'state-initializer-stability',
      },
      {
        href: '/advanced-patterns/state-reducer',
        label: 'state-reducer',
      },
      {
        href: '/advanced-patterns/default-state-reducer',
        label: 'default-state-reducer',
      },
      {
        href: '/advanced-patterns/control-props',
        label: 'control-props',
      },
    ],
  },
  {
    id: 'performance',
    title: 'React Performance',
    items: [
      {
        href: '/performance/element-optimization',
        label: 'element-optimization',
      },
      {
        href: '/performance/element-props',
        label: 'element-props',
      },
      {
        href: '/performance/context',
        label: 'context',
      },
      {
        href: '/performance/memoize-elements',
        label: 'memoize-elements',
      },
      {
        href: '/performance/memoize-components',
        label: 'memoize-components',
      },
    ],
  },
] as const satisfies readonly Section[];

type MenuId = (typeof SECTIONS)[number]['id'];

function findSectionForPath(pathname: string): MenuId | null {
  const match = SECTIONS.find((section) =>
    section.items.some(
      (item) => pathname === item.href || pathname.startsWith(item.href + '/'),
    ),
  );
  return (match?.id ?? null) as MenuId | null;
}

export function MenuAside() {
  const pathname = usePathname();
  const baseId = useId();

  const [openMenu, setOpenMenu] = useState<MenuId | null>(() => {
    // initial open based on current path (good for first render)
    return findSectionForPath(pathname) ?? 'fundamentals';
  });

  // keep the correct section open when route changes
  useEffect(() => {
    const next = findSectionForPath(pathname);
    if (next) setOpenMenu(next);
  }, [pathname]);

  const toggleMenu = (id: MenuId) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  };

  const isBlank = (href: string) =>
    href.startsWith('http') || href.startsWith('https');

  return (
    <nav className="col-span-1 border rounded-2xl p-4" aria-label="Sidebar">
      <ul>
        {SECTIONS.map((section) => {
          const isOpen = openMenu === section.id;
          const panelId = `${baseId}-${section.id}-panel`;

          return (
            <li key={section.id}>
              <button
                type="button"
                className="w-full text-left text-gray-400 hover:text-blue-600 hover:bg-gray-200 text-sm flex items-center justify-start gap-2 py-1 bg-transparent"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleMenu(section.id)}
              >
                <span>{section.title}</span>
                <span
                  aria-hidden
                  className={`transition-transform duration-200 text-[11px] ${
                    isOpen ? 'rotate-90' : 'rotate-0'
                  }`}
                >
                  ➔
                </span>
              </button>

              <ul id={panelId} className="mt-2 pl-2 mb-4" hidden={!isOpen}>
                {section.items.map((item) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(item.href + '/');

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        target={isBlank(item.href) ? '_blank' : undefined}
                        className={[
                          'text-sm block px-2 py-1 font-semibold rounded-md',
                          active
                            ? 'text-white bg-gray-400'
                            : 'text-blue-600 hover:bg-gray-200',
                        ].join(' ')}
                      >
                        {item.label}
                        {isBlank(item.href) && (
                          <span className="mx-2 text-sm text-gray-400">𓄲</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
