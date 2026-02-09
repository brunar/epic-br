'use client';
import { useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { allMessages } from '@/components/messages/messages';

type ScrollableImperativeAPI = {
  scrollToTop: () => void;
  scrollToBottom: () => void;
};

// 🐨 Accept `scrollableRef` as a prop here
// 🦺 it's type should be React.RefObject<ScrollableImperativeAPI | null>
function Scrollable({
  children,
  scrollableRef,
}: {
  children: React.ReactNode;
  scrollableRef: React.RefObject<ScrollableImperativeAPI | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollToBottom();
  });

  function scrollToTop() {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = 0;
  }

  function scrollToBottom() {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }

  // 🐨 call useImperativeHandle here with the scrollableRef and a callback function
  // that returns an object with scrollToTop and scrollToBottom
  // 🦉 you can omit the dependency array argument here. Re-assigning new
  // functions to the ref object every render won't cause any issues in our case
  // 💯 for extra credit, try adding the functions as dependencies and see how
  // that spiders out into having to add useCallback around the functions. So
  // annoying! Maybe you can think of another way we can have the dependency
  // array without having to use useCallback. 🤔

  useImperativeHandle(scrollableRef, () => ({ scrollToTop, scrollToBottom }));
  // This case is a good example of why you might want to omit the dependency array argument in useImperativeHandle. If we included scrollToTop and scrollToBottom in the dependency array, we'd have to wrap them in useCallback to prevent them from being re-created on every render, which would cause the ref object to be re-assigned every render, defeating the purpose of using useImperativeHandle in the first place.

  return (
    <div ref={containerRef} role="log">
      {children}
    </div>
  );
}

function ImperativeHandleHook() {
  // 🐨 create a scrollableRef with useRef that is a ScrollableImperativeAPI type (initialize it to null)
  const scrollableRef = useRef<ScrollableImperativeAPI | null>(null);

  const [messages, setMessages] = useState(allMessages.slice(0, 8));
  function addMessage() {
    if (messages.length < allMessages.length) {
      setMessages(allMessages.slice(0, messages.length + 1));
    }
  }
  function removeMessage() {
    if (messages.length > 0) {
      setMessages(allMessages.slice(0, messages.length - 1));
    }
  }

  // 🐨 make this function call the scrollToTop function on the ref
  const scrollToTop = () => scrollableRef.current?.scrollToTop();

  // 🐨 make this function call the scrollToBottom function on the ref
  // Uses current? because the ref might not be attached to the Scrollable component yet, so it could be null. The optional chaining operator (?.) allows us to safely call scrollToBottom only if scrollableRef.current is not null, preventing potential runtime errors.
  const scrollToBottom = () => scrollableRef.current?.scrollToBottom();

  return (
    <div>
      <h2>useImperativeHandle Hook</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/commits/main/src/app/advanced-apis/use-imperative-handle"
        target="_blank"
      >
        (See history of commits)
      </a>

      <div className="messaging-app">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={addMessage}>add message</button>
          <button onClick={removeMessage}>remove message</button>
        </div>
        <hr className="my-4" />
        <div className="mb-4">
          <button onClick={scrollToTop}>scroll to top</button>
        </div>
        {/* 🐨 add scrollableRef prop here */}
        <Scrollable scrollableRef={scrollableRef}>
          {messages.map((message, index, array) => (
            <div key={message.id}>
              <strong>{message.author}</strong>: <span>{message.content}</span>
              {array.length - 1 === index ? null : <hr />}
            </div>
          ))}
        </Scrollable>
        <div className="my-4">
          <button onClick={scrollToBottom}>scroll to bottom</button>
        </div>
      </div>
    </div>
  );
}

export default ImperativeHandleHook;
