export default function InitializeState() {
  // https://www.example.com/search?query=cat+dog
  //const params = new URLSearchParams(window.location.search);
  //const initialQuery = params.get("query") ?? "";
  //comentary: ?? "" this means it can fallback if is a empty string

  return (
    <>
      <div>
        <h2>Initialize State </h2>
        <i className="text-gray-400">(Only text explanation)</i>

        <p>Url search parameters</p>
        <p>
          <b>https://www.example.com/search?query=cat+dog</b>
        </p>

        <h3 className="mt-8">React way</h3>
        <code>
          const params = new URLSearchParams(window.location.search);
          <br />
          <br />
          const initialQuery = params.get("query") ?? "";
        </code>

        <h3 className="mt-8 mb-4">Next.js way</h3>
        <p>import useSearchParams from next/navigation</p>
        <i className="text-gray-400">
          (example how to import commented in the code in the page)
        </i>
        <code>
          {/* import {useSearchParams} from "next/navigation"; */}
          <br />
          <br />
          const searchParams = useSearchParams();
          <br />
          <br />
          const initialQuery = searchParams.get("query") ?? "";
        </code>
      </div>
    </>
  );
}
