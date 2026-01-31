"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import css from "@/styles/ProfilePage.module.css";
import { getMe, updateMe } from "@/lib/api/clientApi";

type User = {
  name: string;
  email: string;
  avatar?: string;
};

export default function EditProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getMe();
      setUser(data);
      setUsername(data.name);
    };

    fetchUser();
  }, []);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!user) return;

  try {
    await updateMe({ username }); 
    router.push("/profile");
  } catch (error) {
    console.error("Update failed", error);
  }
};
  if (!user) return null;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar || "https://ui-avatars.com/api/?name=User&size=120"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
<form className={css.profileInfo} onSubmit={handleSubmit}>
  <div className={css.usernameWrapper}>
    <label htmlFor="username">Username:</label>
    <input
      id="username"
      type="text"
      className={css.input}
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  </div>

  <p>Email: {user.email}</p>

  <div className={css.actions}>
    <button type="submit" className={css.saveButton}>
      Save
    </button>
    <button
      type="button"
      className={css.cancelButton}
      onClick={() => router.push("/profile")}
    >
      Cancel
    </button>
  </div>
</form>
      </div>
    </main>
  );
}
