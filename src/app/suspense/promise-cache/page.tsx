'use client';
import dynamic from 'next/dynamic';

const ShipPromiseCache = dynamic(() => import('@/components/promise-cache'), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <h2>Promise Cache AND useTransition</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/tree/main/src/app/suspense/promise-cache"
        target="_blank"
      >
        (See promise cache readme.mdx)
      </a>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/tree/main/src/app/suspense/use-transition"
        target="_blank"
      >
        (See useTransition readme.mdx)
      </a>
      <p>
        Fixed: If you look at the browser network tab, fetching the same ship
        multiple times should only happen once.
      </p>
      <p>
        TO DO: But keep in mind in the real application, if you change the
        states need to handle the cache invalidation properly.
      </p>
      <ShipPromiseCache />
    </>
  );
}
