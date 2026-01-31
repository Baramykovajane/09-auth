import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import css from "@/styles/ProfilePage.module.css";
import { getMe } from "@/lib/api/serverApi";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "User profile page",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProfilePage() {
  const user = await getMe();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>

          <Link href="/profile/edit">
            <button className={css.editProfileButton}>
              Edit Profile
            </button>
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || "https://ui-avatars.com/api/?name=User&size=120"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}