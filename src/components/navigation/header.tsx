import Link from "next/link";

export function Header() {
  return (
    <div className="border rounded-2xl p-3 col-span-4">
      <h1 className="text-center text-3xl">
        <Link href="/">Epic React V2</Link>
      </h1>
    </div>
  );
}
