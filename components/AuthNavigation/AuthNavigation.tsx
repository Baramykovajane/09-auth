"use client";

import css from "@/styles/AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthNavigation() {
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      router.push("/sign-in"); 
      router.refresh();
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <ul className={css.navigation}>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link href="/profile" className={css.navigationLink} prefetch={false}>
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button onClick={handleLogout} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link href="/sign-in" className={css.navigationLink} prefetch={false}>
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/sign-up" className={css.navigationLink} prefetch={false}>
              Sign up
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
