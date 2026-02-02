'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  type BlogPost,
  generateGradient,
  getMatchingPosts,
} from '@/shared/blog-posts';
import { setGlobalSearchParamsNotNextJS } from '@/shared/utils';

const getQueryParam = (params: URLSearchParams) => params.get('query') ?? '';

function useSearchParams() {
  const [searchParams, setSearchParamsState] = useState(() => {
    if (typeof window === 'undefined') {
      return new URLSearchParams();
    }
    return new URLSearchParams(window.location.search);
  });

  useEffect(() => {
    function updateSearchParams() {
      console.log('popstate hapenning, updating maybe');
      // Not optimized
      //setSearchParamsState(new URLSearchParams(window.location.search));

      //Here it's optimized
      setSearchParamsState((prevParams) => {
        const newParams = new URLSearchParams(window.location.search);

        if (prevParams.toString() === newParams.toString()) {
          return prevParams;
        }
        return newParams;
      });
    }
    window.addEventListener('popstate', updateSearchParams);
    return () => window.removeEventListener('popstate', updateSearchParams);
  }, []);

  const setSearchParams = useCallback(
    (...args: Parameters<typeof setGlobalSearchParamsNotNextJS>) => {
      console.log('setting search params');
      const searchParams = setGlobalSearchParamsNotNextJS(...args);

      // Not optimized **** uncomment this line and commented the optimized ****
      //setSearchParamsState(searchParams);

      //Here it's optimized
      setSearchParamsState((prevParams) => {
        const newParams = searchParams;

        if (prevParams.toString() === newParams.toString()) {
          return prevParams;
        }
        return newParams;
      });

      return searchParams;
    },
    [],
  );

  return [searchParams, setSearchParams] as const;
}

export function SearchParamsNotNextJSVersion() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = getQueryParam(searchParams);
  console.log('rerendering component for new query', query);

  return (
    <div className="app">
      <Form query={query} setSearchParams={setSearchParams} />
      <MatchingPosts query={query} />
    </div>
  );
}

function Form({
  query,
  setSearchParams,
}: {
  query: string;
  setSearchParams: typeof setGlobalSearchParamsNotNextJS;
}) {
  const words = query.split(' ').map((w) => w.trim());

  const dogChecked = words.includes('dog');
  const catChecked = words.includes('cat');
  const caterpillarChecked = words.includes('caterpillar');

  function handleCheck(tag: string, checked: boolean) {
    const newWords = checked ? [...words, tag] : words.filter((w) => w !== tag);
    setSearchParams(
      { query: newWords.filter(Boolean).join(' ').trim() },
      { replace: true },
    );
  }

  return (
    <>
      <h2>Optimize State Updates</h2>
      <h3>
        The intention is to show optimized states, between{' '}
        <span className="bg-yellow-300">prevParams and newParams</span>, not
        re-render the page if the newParams is equal prevParams
      </h3>
      <p>
        The search params is NOT made with <b>useSearchParams/Next.js</b> like
        this:
        <br />
        {`import {(useSearchParams, useRouter, usePathname)} from
        'next/navigation'`}{' '}
        <br />
        <span className="text-gray-400 text-sm">
          It means if refresh the page it will give a issue next.js;
        </span>
      </p>
      <p className="mb-8">
        On console tab to test code line 27:
        <br />
        Click 3 times in the button submit and after click back and forward
        history button in the browser.
        <br />
        To test code line 47:
        <br />
        To see the re-rendering the message on console, select params and click
        in the submit button
        <br />
        Test it by comment and uncoment the optimized code lines
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchParams({ query });
        }}
      >
        <div>
          <label htmlFor="searchInput">Search:</label>
          <input
            id="searchInput"
            name="query"
            type="search"
            value={query}
            onChange={(e) =>
              setSearchParams(
                { query: e.currentTarget.value },
                { replace: true },
              )
            }
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={dogChecked}
              onChange={(e) => handleCheck('dog', e.currentTarget.checked)}
            />{' '}
            🐶 dog
          </label>
          <label>
            <input
              type="checkbox"
              checked={catChecked}
              onChange={(e) => handleCheck('cat', e.currentTarget.checked)}
            />{' '}
            🐱 cat
          </label>
          <label>
            <input
              type="checkbox"
              checked={caterpillarChecked}
              onChange={(e) =>
                handleCheck('caterpillar', e.currentTarget.checked)
              }
            />{' '}
            🐛 caterpillar
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

function MatchingPosts({ query }: { query: string }) {
  const matchingPosts = getMatchingPosts(query);

  return (
    <ul className="post-list">
      {matchingPosts.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </ul>
  );
}

function Card({ post }: { post: BlogPost }) {
  const [isFavorited, setIsFavorited] = useState(false);
  return (
    <li>
      {isFavorited ? (
        <button
          aria-label="Remove favorite"
          onClick={() => setIsFavorited(false)}
        >
          ❤️
        </button>
      ) : (
        <button aria-label="Add favorite" onClick={() => setIsFavorited(true)}>
          🤍
        </button>
      )}
      <div
        className="post-image"
        style={{ background: generateGradient(post.id) }}
      />
      <a
        href={post.id}
        onClick={(event) => {
          event.preventDefault();
          alert(`Great! Let's go to ${post.id}!`);
        }}
      >
        <h2>{post.title}</h2>
        <p>{post.description}</p>
      </a>
    </li>
  );
}
