'use client';
import { useState } from 'react';

const allItems = [
  { id: 'apple', value: '🍎 apple' },
  { id: 'orange', value: '🍊 orange' },
  { id: 'grape', value: '🍇 grape' },
  { id: 'pear', value: '🍐 pear' },
];

const PageRenderArray = () => {
  // const ui = (
  //   <ul>
  //     <li>One</li>
  //     <li>Two</li>
  //     <li>Three</li>
  //   </ul>
  // );

  // const list = ["One", "Two", "Three"];

  // const ui = (
  //   <ul>
  //     {list.map((listItem) => (
  //       <li key={listItem}>{listItem}</li>
  //     ))}
  //   </ul>
  // );

  const [items, setItems] = useState(allItems);

  function addItem() {
    const itemIds = items.map((i) => i.id);
    const itemToAdd = allItems.find((i) => !itemIds.includes(i.id));
    if (itemToAdd) setItems([...items, itemToAdd]);
  }

  function removeItem(id: string) {
    setItems(items.filter((i) => i.id !== id));
  }

  return (
    <div className="m-auto max-w-lg">
      <h1 className="text-2xl font-bold my-4">Render Array Key Props id</h1>
      <button
        className="my-8"
        disabled={items.length >= allItems.length}
        onClick={addItem}
      >
        add item
      </button>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="mb-4">
            <button onClick={() => removeItem(item.id)}>remove</button>{' '}
            <label htmlFor={`${item.id}-input`}>{item.value}</label>{' '}
            <input id={`${item.id}-input`} defaultValue={item.value} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageRenderArray;
