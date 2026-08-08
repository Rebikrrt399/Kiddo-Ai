"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isUserRole, roleDashboardHref, roleStorageKey, saveRole, type UserRole } from "@/lib/role-auth";
import { supabase } from "@/lib/supabase";

export function RoleGate({ allowedRole, children }: { allowedRole: UserRole; children: React.ReactNode }) {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    async function verifyAuth() {
      // 1. Check local storage role first for fast render
      const storedRole = localStorage.getItem(roleStorageKey);

      if (isUserRole(storedRole)) {
        if (storedRole === allowedRole) {
          setIsAllowed(true);
          return;
        } else {
          router.replace(roleDashboardHref[storedRole]);
          return;
        }
      }

      // 2. If not in local storage, check Supabase session
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const userRole = (session.user.user_metadata?.role as UserRole) || "parent";
          saveRole(userRole);
          if (userRole === allowedRole) {
            setIsAllowed(true);
            return;
          } else {
            router.replace(roleDashboardHref[userRole]);
            return;
          }
        }
      } catch (e) {
        console.error("Auth check error:", e);
      }

      // 3. Unauthenticated -> go to sign in
      router.replace("/signin");
    }

    verifyAuth();
  }, [allowedRole, router]);

  if (!isAllowed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 text-sm font-semibold text-muted">
        Checking your KiddoAI access...
      </div>
    );
  }

  return <>{children}</>;
}
