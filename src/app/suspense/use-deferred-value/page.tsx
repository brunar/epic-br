'use client';
import dynamic from 'next/dynamic';

const ShipResponsive = dynamic(() => import('@/components/responsive-ship'), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <h2>Intro Responsive and useDeferredValue()</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/tree/main/src/app/suspense/use-deferred-value"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <ShipResponsive />
    </>
  );
}
