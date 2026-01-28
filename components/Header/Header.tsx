'use client';

import Link from "next/link";
import css from "@/styles/Header.module.css";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname(); 

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.logo}>
        NoteHub
      </Link>

      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link
              href="/"
              className={pathname === "/" ? css.active : ""}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/notes/filter/all"
              className={pathname.startsWith("/notes") ? css.active : ""}
            >
              Notes
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
