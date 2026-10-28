import { SearchParamsNotNextJSDeferredValue } from '@/components/search-params/search-params-react-deferred-value';

const UseDeferredValueMemoPage = () => {
  return (
    <div>
      <h2>Use Deferred Value + Memo</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/tree/main/src/app/performance/use-deferred-value-memo"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <p className="mb-10">
        To test the performance of the useDeferredValue + memo, you can type in
        the search input dog and remove it, by recording it.
      </p>

      <SearchParamsNotNextJSDeferredValue />

      <p className="mt-10 text-xs">
        Console view Performance DevTool record it with Screenshots Checkedbox
        to see the frameworks.
      </p>
      <img src="/images/performance-slowdown-cpu.png" alt="" width={500} />
      <p className="mt-10 text-xs">
        The point is to remove the red frames in the profiler. The red frames
        are the ones that take more than 16ms to render.
        <br />
        OBS: To scroll down the console view need to hold down the [shift key]
      </p>
      <img src="/images/performance-frames.png" alt="" width={500} />
    </div>
  );
};

export default UseDeferredValueMemoPage;
