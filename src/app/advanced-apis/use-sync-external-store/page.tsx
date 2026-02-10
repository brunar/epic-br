// 💰 this is the mediaQuery we're going to be matching against:
// const mediaQuery = '(max-width: 600px)'

// 🐨 make a getSnapshot function here that returns whether the media query matches

// 🐨 make a subscribe function here which takes a callback function
// 🐨 create a matchQueryList variable here with the mediaQuery from above (📜 https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList)
// 🐨 add a change listener to the mediaQueryList which calls the callback
// 🐨 return a cleanup function which removes the change event listener for the callback

function NarrowScreenNotifier() {
  // 🐨 assign this to useSyncExternalStore with the subscribe and getSnapshot functions above
  const isNarrow = false;
  return isNarrow ? 'You are on a narrow screen' : 'You are on a wide screen';
}

function useSyncExternalStorePage() {
  return (
    <>
      <h2>useSyncExternalStore Hook</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/tree/main/src/app/advanced-apis/use-sync-external-store"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <p>
        Drag the window to see changes between narrow/wide screen (Eg: narrow
        &lt; 600px)
      </p>
      <NarrowScreenNotifier />
    </>
  );
}

export default useSyncExternalStorePage;
