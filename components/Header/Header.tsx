'use client';

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "@/styles/Header.module.css";

import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";
import { checkSession } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const Header = () => {
  const pathname = usePathname();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await checkSession();
        if (user) {
          setUser(user);
        }
      } catch {
        // якщо не залогінений — просто ігноруємо
      }
    };

    initAuth();
  }, [setUser]);

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

          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
