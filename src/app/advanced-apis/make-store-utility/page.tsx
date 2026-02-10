'use client';
import { useSyncExternalStore } from 'react';

function makeMediaQueryStore(mediaQuery: string) {
  function getSnapshot() {
    return window.matchMedia(mediaQuery).matches;
  }

  function subscribe(callback: () => void) {
    const mediaQueryList = window.matchMedia(mediaQuery);
    mediaQueryList.addEventListener('change', callback);
    return () => {
      mediaQueryList.removeEventListener('change', callback);
    };
  }
  return function useMediaQuery() {
    return useSyncExternalStore(subscribe, getSnapshot);
  };
}

const useNarrowMediaQuery = makeMediaQueryStore('(max-width: 600px)');

function NarrowScreenNotifier() {
  const isNarrow = useNarrowMediaQuery();
  return isNarrow ? 'You are on a narrow screen' : 'You are on a wide screen';
}

function MakeStoreUtilityPage() {
  return (
    <>
      <h2>Make Store Utility</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/tree/main/src/app/advanced-apis/make-store-utility"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <p className="text-sm text-gray-500 mb-8">
        Creating a custom hook with useSyncExternalStore
      </p>
      <NarrowScreenNotifier />
    </>
  );
}

export default MakeStoreUtilityPage;
