
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getMe } from "@/lib/api/serverApi";

type Props = { children: ReactNode };

export default async function AuthLayout({ children }: Props) {
  try {
    const user = await getMe(); 
    if (!user) redirect("/sign-in");
  } catch {
    redirect("/sign-in");
  }
  return <>{children}</>;
}

