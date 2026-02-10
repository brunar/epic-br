'use client';
import { useSyncExternalStore } from 'react';

const mediaQuery = '(max-width: 600px)';

// 🐨 put getSnapshot and subscribe in a new function called makeMediaQueryStore
// which accepts a mediaQuery and returns a hook that uses useSyncExternalStore
// with the subscribe and getSnapshot functions.
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
// 🐨 put everything above in the makeMediaQueryStore function

// 🐨 call makeMediaQueryStore with '(max-width: 600px)' and assign the return
// value to a variable called useNarrowMediaQuery

function NarrowScreenNotifier() {
  // 🐨 call useNarrowMediaQuery here instead of useSyncExternalStore
  const isNarrow = useSyncExternalStore(subscribe, getSnapshot);
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
