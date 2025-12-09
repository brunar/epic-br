export default function InitCallback() {
  // https://www.example.com/search?query=cat+dog
  //const params = new URLSearchParams(window.location.search);
  //const initialQuery = params.get("query") ?? "";
  //comentary: ?? "" this means it can fallback if is a empty string

  return (
    <>
      <div>
        <h2>Init Callback</h2>
        <i className="text-gray-400">(Only text explanation)</i>

        <p>
          Initial value can <b>cost expensive</b> on react on the{' '}
          <b>first render</b>.
        </p>
        <p>
          Maybe it is parsing a giant JSON object, like just an enormous JSON
          object or something. Or it's like a string of JSON is parsing that to
          calculate this initial value.
        </p>
        <p>
          React is going to call our function every time whenever we update this
          value, then this computation is going to happen every time.
        </p>
        <p>
          Remember that the initial value only matters on the initial render. So
          having this computation every single render after the first is
          unnecessary because it's going to be ignored after that initial
          render. So that is kind of wasteful.
        </p>
        <p>
          React will re-render our components. We'll pass it this function again
          that does this computation.
        </p>

        <h3 className="mt-8">Passing value useState as a function ✅</h3>
        <p>
          Then you don't bother creating that variable every single time you
          render.
        </p>
        <code>
          {`const [val, setVal] = useState(() => {
              const initialVal = calculateInitialValue();
              return initialVal;
            });`}
        </code>

        <h3 className="mt-8 mb-4">Perform a computation unnecessarily</h3>
        <code>
          {`const initialVal = calculateInitialValue();
          const [val, setVal] = useState(initialVal);`}
        </code>
      </div>
    </>
  );
}
