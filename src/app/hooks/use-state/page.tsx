"use client";
//import { createRoot } from "react-dom/client";
import { generateGradient, getMatchingPosts } from "@/shared/blog-posts";
import { useState } from "react";

export default function UseStatePage() {
  // 🐨 call useState here and initialize the query with an empty string
  const [query, setQuery] = useState("");

  //const [isBoolean, setIsBoolean] = useState(true);
  //const [isObj, setIsObj] = useState({});
  //const [isArray, setIsArray] = useState([]);

  return (
    <>
      <form>
        <div>
          <label htmlFor="searchInput">Search:</label>
          <input
            id="searchInput"
            name="query"
            type="search"
            onChange={(e) => setQuery(e.currentTarget.value)}
            // 🐨 add an onChange handler here that calls setQuery with the event.currentTarget.value
          />
        </div>
        <div>
          <label>
            <input type="checkbox" /> 🐶 dog
          </label>
          <label>
            <input type="checkbox" /> 🐱 cat
          </label>
          <label>
            <input type="checkbox" /> 🐛 caterpillar
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {/* 🐨 pass the query state as a prop */}
      <MatchingPosts query={query} />
    </>
  );
}

type PostProps = {
  id: string;
  title: string;
  description: string;
};

function MatchingPosts({ query }: { query: string }) {
  const matchingPosts = getMatchingPosts(query);

  return (
    <ul className="post-list">
      {matchingPosts.map((post: PostProps) => (
        <li key={post.id}>
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
      ))}
    </ul>
  );
}
