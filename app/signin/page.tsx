"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Eye, EyeOff, Loader2, LockKeyhole, Mail, Shield, Sparkles } from "lucide-react";
import { getRegisteredRole, roleDashboardHref, roleLabels, saveRole, type UserRole } from "@/lib/role-auth";
import { signInUser, signInWithGoogle, signInWithOAuthProvider } from "@/lib/supabase";
import { ThemeToggle } from "@/components/theme-toggle";

const roles: UserRole[] = ["parent", "doctor", "child"];

// Official 4-Color Google Logo SVG
function GoogleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
        fill="#4285F4"
      />
      <path
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.31 24 12 24z"
        fill="#34A853"
      />
      <path
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
        fill="#FBBC05"
      />
      <path
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>("parent");
  const [registeredRole, setRegisteredRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedRole = getRegisteredRole();
    if (storedRole) {
      setRegisteredRole(storedRole);
      setSelectedRole(storedRole);
    }
  }, []);

  async function handleGoogleSignIn() {
    try {
      setError("");
      setIsGoogleLoading(true);
      // No fields needed! Just 1 click to continue with Google
      await signInWithGoogle(selectedRole);
    } catch (err: any) {
      const msg = err?.message || "Google sign in failed. Please try again.";
      if (msg.toLowerCase().includes("provider is not enabled")) {
        setError(
          "Google provider is not yet enabled in your Supabase project settings. You can enable it in Supabase Dashboard -> Authentication -> Providers -> Google, or sign in below with Email/Password or Demo Mode."
        );
      } else {
        setError(msg);
      }
      setIsGoogleLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // 1. Authenticate with Supabase
      const result = await signInUser({
        email: email.trim(),
        password,
      });

      // 2. Resolve Role
      const finalRole = result.role || selectedRole;
      saveRole(finalRole);

      // 3. Redirect to respective dashboard
      router.push(roleDashboardHref[finalRole] || "/dashboard");
    } catch (err: any) {
      const msg = err?.message || "Failed to sign in. Please check your credentials.";
      if (msg.toLowerCase().includes("invalid login credentials")) {
        setError("Invalid email or password. Please check and try again, or use Continue with Google.");
      } else if (msg.toLowerCase().includes("email not confirmed")) {
        setError("Please check your inbox and verify your email before signing in.");
      } else {
        setError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleDemoLogin() {
    saveRole(selectedRole);
    router.push(roleDashboardHref[selectedRole]);
  }

  async function handleOAuthLogin(provider: "azure" | "linkedin_oidc") {
    try {
      setIsLoading(true);
      setError("");
      await signInWithOAuthProvider(provider, selectedRole);
    } catch (err: any) {
      setError(err?.message || "OAuth sign in failed. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#081225] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] px-4 py-8 text-slate-950 dark:text-slate-100">
      {/* Ambient glowing background orbs matching the website hero */}
      <div className="pointer-events-none absolute -left-[10%] top-[-10%] h-[550px] w-[550px] rounded-full bg-blue-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-[#164b8a]/25 blur-[130px]" />

      <section className="relative z-10 mx-auto grid min-h-[660px] max-w-6xl w-full overflow-hidden rounded-3xl border border-white/15 bg-white shadow-2xl shadow-[#040a16]/80 dark:border-slate-800/80 dark:bg-[#0c1f3d] lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left Hero Banner matching KiddoAI website brand aesthetic */}
        <div className="relative hidden min-h-[660px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0c2b5c] via-[#133d73] to-[#1d5c9e] p-8 text-white lg:flex">
          {/* Subtle grid pattern overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <div className="pointer-events-none absolute -left-1/4 top-1/4 h-72 w-72 rounded-full bg-blue-400/20 blur-[80px]" />

          {/* Hero background image */}
          <Image
            src="/auth/kiddo-auth-hero-navy.png"
            alt="KiddoAI Family and Doctor Wellbeing"
            fill
            priority
            className="object-cover opacity-90 transition-opacity duration-300"
            sizes="(max-width: 1024px) 100vw, 540px"
          />

          {/* Top Logo */}
          <div className="relative z-10 flex items-center justify-between">
            <Link href="/" className="group flex items-center gap-3 text-white transition">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0c2b5c] shadow-md transition group-hover:scale-105">
                <Shield size={20} className="fill-current/15" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold leading-none tracking-tight">KiddoAI</span>
                <span className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.2em] text-blue-200">
                  FAMILY INTELLIGENCE
                </span>
              </div>
            </Link>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md">
              <Sparkles size={12} className="text-blue-300" /> Beta 2026
            </span>
          </div>

          {/* Bottom Trust Badge */}
          <div className="relative z-10 mt-auto rounded-2xl border border-white/20 bg-[#08172e]/85 p-4 text-xs text-blue-100 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">AI Digital Wellbeing</span>
              <span className="rounded-md bg-[#f59e0b] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                Connected
              </span>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-blue-200/90">
              Supabase Auth & Google OAuth connected. Safe, synchronized pediatric data for families and doctors.
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex items-center px-6 py-8 sm:px-10 lg:px-14">
          <div className="w-full">
            <div className="mb-6 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2.5 text-[#0c2b5c] dark:text-white lg:hidden">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f5bbd] text-white shadow-md">
                  <Shield size={18} />
                </span>
                <div className="flex flex-col">
                  <span className="font-heading text-lg font-bold leading-none">KiddoAI</span>
                  <span className="text-[7px] font-bold uppercase tracking-wider text-slate-400">Family Intelligence</span>
                </div>
              </Link>
              <div className="ml-auto">
                <ThemeToggle />
              </div>
            </div>

            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Your KiddoAI workspace starts here
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Choose your role and continue instantly with Google or Email.
              </p>
            </div>

            {/* Role Switcher */}
            <div className="mt-6 grid grid-cols-3 gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-700/70 dark:bg-slate-800/70">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    setSelectedRole(role);
                    setError("");
                  }}
                  className={`rounded-lg px-2.5 py-2.5 text-xs font-bold transition sm:text-sm ${
                    selectedRole === role
                      ? "bg-white text-[#0f5bbd] shadow-sm dark:bg-[#164b8a] dark:text-white"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  I&apos;m a {roleLabels[role]}
                </button>
              ))}
            </div>

            {/* PROMINENT 1-CLICK CONTINUE WITH GOOGLE */}
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="group flex w-full items-center justify-between rounded-2xl border-2 border-slate-200 bg-white px-5 py-3.5 text-left transition hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-800/80 dark:hover:border-blue-400"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 p-1.5 shadow-sm dark:bg-slate-900">
                    <GoogleIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900 dark:text-white">
                      Continue with Google
                    </span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      No fields needed · Instant 1-click login
                    </span>
                  </div>
                </div>
                {isGoogleLoading ? (
                  <Loader2 size={20} className="animate-spin text-blue-600 dark:text-blue-400" />
                ) : (
                  <span className="rounded-full bg-slate-100 p-1 text-slate-400 transition group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-slate-700 dark:group-hover:bg-blue-900/50 dark:group-hover:text-blue-300">
                    <ArrowRight size={16} />
                  </span>
                )}
              </button>

              {/* Other Quick Options: LinkedIn & Microsoft & Demo */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/60 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-950/70"
                >
                  <span>⚡ Demo Mode</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOAuthLogin("linkedin_oidc")}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <span className="font-bold text-[#0a66c2]">in</span>
                  <span>LinkedIn</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOAuthLogin("azure")}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <span className="grid h-3 w-3 grid-cols-2 overflow-hidden">
                    <span className="bg-[#f25022]" />
                    <span className="bg-[#7fba00]" />
                    <span className="bg-[#00a4ef]" />
                    <span className="bg-[#ffb900]" />
                  </span>
                  <span>Microsoft</span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700/60" />
              OR SIGN IN WITH EMAIL
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700/60" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200">Email</span>
                <span className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/60">
                  <Mail size={18} className="text-slate-400 dark:text-slate-400" />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200">Password</span>
                <span className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/60">
                  <LockKeyhole size={18} className="text-slate-400 dark:text-slate-400" />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label="Toggle password visibility"
                    className="text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </span>
              </label>

              <div className="flex justify-end">
                <Link href="/signup" className="text-xs font-semibold text-blue-600 transition hover:underline dark:text-blue-400">
                  Don&apos;t have an account? Sign up
                </Link>
              </div>

              {error && (
                <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs leading-relaxed font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0c2b5c] via-[#0f5bbd] to-[#1e69d2] px-5 py-3.5 font-bold text-white shadow-lg shadow-blue-900/25 transition active:scale-[0.99] disabled:opacity-75 hover:from-[#092248] hover:via-[#0c4ea3] hover:to-[#175bb8]"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Signing in to Supabase...
                  </>
                ) : (
                  <>
                    Sign In as {roleLabels[selectedRole]}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <p className="mt-5 text-center text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              By signing in, you accept the{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">Terms of Service</span> and acknowledge our{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
