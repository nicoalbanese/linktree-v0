"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { title: "Home", href: "/app" },
  { title: "Settings", href: "/app/settings" },
  { title: "Pages", href: "/app/pages" },
];

const Navbar = () => {
  const pathName = usePathname();
  const session = useSession();
  return (
    <nav className="flex justify-between">
      <ul className="flex gap-2">
        {LINKS.map((link) => (
          <li key={link.title}>
            <Link
              href={link.href}
              className={
                (pathName as string) == link.href ? "active-route" : ""
              }
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        {session.status == "authenticated" ? (
          <Link href="/api/auth/signout">Sign out</Link>
        ) : null}
        {session.status == "unauthenticated" ? (
          <Link href="/api/auth/signin">Sign in</Link>
        ) : null}
        {session.status == "loading" ? (
          <div className="w-20 h-full animate-pulse bg-slate-100 rounded-md" />
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
