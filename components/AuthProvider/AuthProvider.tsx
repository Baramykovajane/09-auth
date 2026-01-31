"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { checkSession } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { user, setUser, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  const privateRoutes = ["/profile", "/notes"];
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  useEffect(() => {
    const verifySession = async () => {
      if (user) {
        setLoading(false);
        return;
      }

      try {
        const me = await checkSession(); 
        if (me) {
          setUser(me); 
        } else if (isPrivateRoute) {
          router.replace("/sign-in");
        }
      } catch {
        clearIsAuthenticated();
        if (isPrivateRoute) router.replace("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [user, setUser, clearIsAuthenticated, isPrivateRoute, router]);

  if (loading) return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>;

  return <>{children}</>;
}
