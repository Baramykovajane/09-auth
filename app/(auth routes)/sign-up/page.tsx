"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import css from "@/styles/SignUpPage.module.css";
import { register } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignUpPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (user) => {
      setUser(user);
      router.push("/profile");
    },
    onError: () => setError("Registration failed"),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      setError("Please fill in all fields");
      return;
    }

    mutation.mutate({ email, password });
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>

      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            {mutation.isPending ? "Registering..." : "Register"}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}