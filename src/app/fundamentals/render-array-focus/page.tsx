'use client';
import { useEffect, useState } from 'react';

const PageRenderArray = () => {
  const [items, setItems] = useState([
    { id: 'apple', value: '🍎 apple' },
    { id: 'orange', value: '🍊 orange' },
    { id: 'grape', value: '🍇 grape' },
    { id: 'pear', value: '🍐 pear' },
  ]);

  const [autoShuffle, setAutoShuffle] = useState(true);

  useEffect(() => {
    if (autoShuffle) {
      const id = setInterval(() => setItems(shuffle), 1000);
      return () => clearInterval(id);
    }
  }, [autoShuffle]);

  function getChangeHandler(item: (typeof items)[number]) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value;
      setItems((allItems) =>
        allItems.map((i) => ({
          ...i,
          value: i.id === item.id ? newValue : i.value,
        }))
      );
    };
  }

  return (
    <>
      <main>
        <p className="text-xl text-gray-500">
          The key prop affects your inputs and components, including behaviors
          like focus. <br />
          Try focusing different elements, selecting some text, and editing it
          to see how the key prop changes their behavior.
        </p>
        <div>
          <h1 className="text-2xl font-bold my-4">Without a key</h1>
          <ul style={{ display: 'flex', gap: '10px' }}>
            {items.map((item, index) => (
              <li key={`none${index}`}>
                <label htmlFor={`no-key-${item.id}-input`}>
                  No key #{index + 1}
                </label>
                <input
                  id={`no-key-${item.id}-input`}
                  className={`${item.id}-input`}
                  value={item.value}
                  onChange={getChangeHandler(item)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className="text-2xl font-bold my-4">With array index as key</h1>
          <ul style={{ display: 'flex', gap: '10px' }}>
            {items.map((item, index) => (
              <li key={index}>
                <label htmlFor={`index-key-${item.id}-input`}>
                  Index key #{index + 1}
                </label>
                <input
                  id={`index-key-${item.id}-input`}
                  className={`${item.id}-input`}
                  value={item.value}
                  onChange={getChangeHandler(item)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className="text-2xl font-bold my-4">With a proper key</h1>
          <ul style={{ display: 'flex', gap: '10px' }}>
            {items.map((item, index) => (
              <li key={item.id}>
                <label htmlFor={`proper-key-${item.id}-input`}>
                  Proper key #{index + 1}
                </label>
                <input
                  id={`proper-key-${item.id}-input`}
                  className={`${item.id}-input`}
                  value={item.value}
                  //autoFocus={item.id === "orange"} // BR force to show the example
                  onChange={getChangeHandler(item)}
                />
              </li>
            ))}
          </ul>
        </div>
      </main>
      <aside style={{ marginTop: '40px' }}>
        <div style={{ alignItems: 'center', display: 'flex', gap: '8px' }}>
          <input
            id="autoshuffle"
            type="checkbox"
            checked={autoShuffle}
            onChange={(event) => setAutoShuffle(event.target.checked)}
          />
          <label htmlFor="autoshuffle">Auto-shuffle inputs</label>
        </div>
      </aside>
    </>
  );
};

export default PageRenderArray;

function shuffle<ArrayType>(originalArray: Array<ArrayType>) {
  const array = [...originalArray];
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    // @ts-expect-error
    array[currentIndex] = array[randomIndex];
    // @ts-expect-error
    array[randomIndex] = temporaryValue;
  }
  return array;
}
