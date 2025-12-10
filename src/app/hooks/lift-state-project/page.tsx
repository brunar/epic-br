'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  type BlogPost,
  generateGradient,
  getMatchingPosts,
} from '@/shared/blog-posts';
import { useSetGlobalSearchParams } from '@/shared/utils';

// Hook to read a query param from Next.js search params
function useQueryParam(name: string) {
  const searchParams = useSearchParams();
  return searchParams.get(name) ?? '';
}

// Parent Component - Data Query
export default function App() {
  const urlQuery = useQueryParam('query');
  const [query, setQuery] = useState(urlQuery);

  // Keep local state in sync with URL (back/forward, etc.)
  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  return (
    <div className="app">
      <Form query={query} setQuery={setQuery} />
      <MatchingPosts query={query} />
    </div>
  );
}

// Child Component 1
function Form({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (query: string) => void;
}) {
  const setGlobalSearchParams = useSetGlobalSearchParams();

  const words = query.split(' ').map((w) => w.trim());

  const dogChecked = words.includes('dog');
  const catChecked = words.includes('cat');
  const caterpillarChecked = words.includes('caterpillar');

  function handleCheck(tag: string, checked: boolean) {
    const newWords = checked ? [...words, tag] : words.filter((w) => w !== tag);
    setQuery(newWords.filter(Boolean).join(' ').trim());
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // we handle URL update ourselves
    setGlobalSearchParams({ query });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="searchInput">Search:</label>
        <input
          id="searchInput"
          name="query"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
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
  );
}

// Child Component 2
function MatchingPosts({ query }: { query: string }) {
  const matchingPosts = getMatchingPosts(query);

  return (
    <ul className="post-list">
      {matchingPosts
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((post) => (
          <Card key={post.id} post={post} />
        ))}
    </ul>
  );
}

// Child Component 3
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
