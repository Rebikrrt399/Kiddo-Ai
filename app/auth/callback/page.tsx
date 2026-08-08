"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { roleDashboardHref, saveRole, type UserRole } from "@/lib/role-auth";
import { Loader2, Shield } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Finalizing Google sign in...");

  useEffect(() => {
    async function handleCallback() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Auth callback error:", error);
          router.replace("/signin?error=" + encodeURIComponent(error.message));
          return;
        }

        if (session?.user) {
          const userRole = (session.user.user_metadata?.role as UserRole) || "parent";
          saveRole(userRole);
          setStatus("Redirecting to your dashboard...");
          router.replace(roleDashboardHref[userRole] || "/dashboard");
        } else {
          // Listen for state change (hash-based tokens)
          const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
              const userRole = (session.user.user_metadata?.role as UserRole) || "parent";
              saveRole(userRole);
              router.replace(roleDashboardHref[userRole] || "/dashboard");
            }
          });

          return () => {
            authListener.subscription.unsubscribe();
          };
        }
      } catch (err) {
        console.error("Callback exception:", err);
        router.replace("/dashboard");
      }
    }

    handleCallback();
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#081225] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] px-4 text-white">
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/15 bg-[#0c1f3d] p-8 shadow-2xl backdrop-blur-md">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f5bbd] to-[#1e69d2] text-white shadow-lg">
          <Shield size={28} />
        </div>
        <div className="text-center">
          <h2 className="font-heading text-xl font-bold">KiddoAI Authentication</h2>
          <p className="mt-1 flex items-center justify-center gap-2 text-xs text-blue-200">
            <Loader2 size={14} className="animate-spin text-blue-400" />
            {status}
          </p>
        </div>
      </div>
    </main>
  );
}
