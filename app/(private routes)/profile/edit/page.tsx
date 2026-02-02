"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { User } from "@/types/user";
import css from "@/styles/EditProfilePage.module.css";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfilePage() {
  const router = useRouter();
  const { setUser } = useAuthStore(); 

  const [user, setLocalUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setLocalUser(data);
        setUsername(data.username);
        setUser(data); // синхронізація глобального стану з сервером
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, [setUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    setError("");

    try {
      const updatedUser = await updateMe({ username });
      setLocalUser(updatedUser);
      setUser(updatedUser); 
      router.push("/profile");
    } catch (err) {
      console.error("Update failed", err);
      setError("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&size=120`}
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

          {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button type="submit" className={css.saveButton} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
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
