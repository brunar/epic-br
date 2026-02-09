'use client';

import { useCallback, useEffect, useState, createContext, use } from 'react';
import {
  type BlogPost,
  generateGradient,
  getMatchingPosts,
} from '@/shared/blog-posts';
import { setGlobalSearchParamsNotNextJS } from '@/shared/utils';
import { ButtonWithTooltip } from '@/components/tooltip/tooltip';

type SearchParamsTuple = readonly [
  URLSearchParams,
  typeof setGlobalSearchParamsNotNextJS,
];

const SearchParamsContext = createContext<SearchParamsTuple | null>(null);

function SearchParamsProvider({ children }: { children: React.ReactNode }) {
  const [searchParams, setSearchParamsState] = useState(
    //() => new URLSearchParams(window.location.search),
    () => new URLSearchParams(), // 👈 safe default (no window) *** because next js
  );

  useEffect(() => {
    function updateSearchParams() {
      setSearchParamsState((prevParams) => {
        const newParams = new URLSearchParams(window.location.search);
        return prevParams.toString() === newParams.toString()
          ? prevParams
          : newParams;
      });
    }
    window.addEventListener('popstate', updateSearchParams);
    return () => window.removeEventListener('popstate', updateSearchParams);
  }, []);

  const setSearchParams = useCallback(
    (...args: Parameters<typeof setGlobalSearchParamsNotNextJS>) => {
      const searchParams = setGlobalSearchParamsNotNextJS(...args);
      setSearchParamsState((prevParams) => {
        return prevParams.toString() === searchParams.toString()
          ? prevParams
          : searchParams;
      });
      return searchParams;
    },
    [],
  );

  const searchParamsTuple = [searchParams, setSearchParams] as const;

  return (
    <SearchParamsContext value={searchParamsTuple}>
      {children}
    </SearchParamsContext>
  );
}

export function useSearchParams() {
  const context = use(SearchParamsContext);
  if (!context) {
    throw new Error(
      'useSearchParams must be used within a SearchParamsProvider',
    );
  }
  return context;
}

const getQueryParam = (params: URLSearchParams) => params.get('query') ?? '';

export function SearchParamsNotNextJSContext() {
  return (
    <SearchParamsProvider>
      <div className="app">
        <Form />
        <MatchingPosts />
      </div>
    </SearchParamsProvider>
  );
}

function Form() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = getQueryParam(searchParams);

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
    <form onSubmit={(e) => e.preventDefault()}>
      <h2>Context Provider</h2>
      <p className="mb-4">
        And Tooltips with <b>Create Portals</b> and{' '}
        <b>useLayoutEffect exercises</b>{' '}
        <i className="text-gray-400">(See it on commits)</i>
      </p>
      <div>
        <label htmlFor="searchInput">Search:</label>
        <input
          id="searchInput"
          name="query"
          type="search"
          value={query}
          onChange={(e) =>
            setSearchParams({ query: e.currentTarget.value }, { replace: true })
          }
        />
      </div>
      <div className="my-4">
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
    </form>
  );
}

function MatchingPosts() {
  const [searchParams] = useSearchParams();
  const query = getQueryParam(searchParams);
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
        <ButtonWithTooltip
          tooltipContent="Remove favorite"
          onClick={() => setIsFavorited(false)}
        >
          ❤️
        </ButtonWithTooltip>
      ) : (
        <ButtonWithTooltip
          tooltipContent="Add favorite"
          onClick={() => setIsFavorited(true)}
        >
          🤍
        </ButtonWithTooltip>
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
