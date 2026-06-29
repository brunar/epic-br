'use client';
import { useState } from 'react';

function Footer() {
  return <footer>I am the footer</footer>;
}

export default function ElementOptimizationPage() {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  return (
    <div>
      <h2>Element Optimization</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/tree/main/src/app/performance/element-optimization"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <p className="mb-8">Limit unnecessary renders.</p>
      <button onClick={increment}>The count is {count}</button>
      <Footer />

      <hr className="mt-10 mb-4" />
      <p className="text-sm">
        This image shows the unnecessary re-render for the footer
      </p>
      <img
        src="/images/performance-element-optimization.png"
        alt="performance-element-optimization"
        width={400}
      />
      <img
        src="/images/performance-element-optimization2.png"
        alt="performance-element-optimization"
        width={400}
      />
    </div>
  );
}
