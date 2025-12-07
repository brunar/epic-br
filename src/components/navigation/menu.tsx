import Link from "next/link";

const MenuLinks = [
  { href: "/greeting", label: "greeting" },
  { href: "/style", label: "style" },
  { href: "/style2", label: "style2" },
  { href: "/calculator", label: "calculator" },
  { href: "/render-array", label: "render-array" },
  { href: "/render-array-focus", label: "render-array-focus" },
];

export function MenuAside() {
  return (
    <nav className="col-span-1 border rounded-2xl p-8">
      <ul>
        {MenuLinks.map((item) => (
          <li key={item.label}>
            <Link
              className="hover:text-blue-600 font-bold text-sm"
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
