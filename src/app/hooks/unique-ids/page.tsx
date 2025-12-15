import { useId } from 'react';

export default function UniqueIds() {
  const id = useId();

  return (
    <>
      <div>
        <h2>Hook Unique Ids</h2>
        <p className="mb-4 font-bold">useId()</p>
        <p className="mb-8 block">
          This guaranteed to be unique on the page. And not going to clash with
          anything.
        </p>
        <label htmlFor={id}>Name:</label>
        <input id={id} type="text" />
        <p className="mt-4">
          Example Id: <b>{id}</b>
        </p>
      </div>
    </>
  );
}
