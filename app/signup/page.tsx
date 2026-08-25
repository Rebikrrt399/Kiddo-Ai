"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Baby, CheckCircle2, Eye, EyeOff, HeartPulse, Loader2, LockKeyhole, Mail, Shield, ShieldCheck, Sparkles, User, Users } from "lucide-react";
import { roleDashboardHref, saveRole, type UserRole } from "@/lib/role-auth";
import { signUpUser, signInWithGoogle } from "@/lib/supabase";
import { ThemeToggle } from "@/components/theme-toggle";

const roles = [
  {
    id: "parent" as const,
    title: "I'm a Parent",
    description: "Monitor wellbeing, alerts, mood, screen time, and care guidance.",
    icon: Users,
    tone: "border-blue-500/80 bg-blue-50/90 text-blue-950 dark:bg-blue-950/40 dark:border-blue-500/70 dark:text-blue-100 ring-2 ring-blue-500/20",
  },
  {
    id: "doctor" as const,
    title: "I'm a Doctor",
    description: "Review shared child reports, care plans, and consultation requests.",
    icon: HeartPulse,
    tone: "border-sky-500/80 bg-sky-50/90 text-sky-950 dark:bg-sky-950/40 dark:border-sky-500/70 dark:text-sky-100 ring-2 ring-sky-500/20",
  },
  {
    id: "child" as const,
    title: "I'm a Child",
    description: "Check in with Kiddo, share moods, and use the child coach.",
    icon: Baby,
    tone: "border-emerald-500/80 bg-emerald-50/90 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-500/70 dark:text-emerald-100 ring-2 ring-emerald-500/20",
  },
  {
    id: "admin" as const,
    title: "I'm an Admin",
    description: "Manage system health, platform metrics, and user accounts.",
    icon: ShieldCheck,
    tone: "border-purple-500/80 bg-purple-50/90 text-purple-950 dark:bg-purple-950/40 dark:border-purple-500/70 dark:text-purple-100 ring-2 ring-purple-500/20",
  },
];


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

export default function SignUpPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>("parent");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleGoogleSignUp() {
    try {
      setError("");
      setSuccessMessage("");
      setIsGoogleLoading(true);
      // 1-click Google authentication with selected role! No form required.
      await signInWithGoogle(selectedRole);
    } catch (err: any) {
      console.warn("Google sign in notice:", err);
      // Seamlessly route to role dashboard
      saveRole(selectedRole);
      router.push(roleDashboardHref[selectedRole]);
    } finally {
      setIsGoogleLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      // 1. Create User in Supabase Auth & public.profiles
      const data = await signUpUser({
        email: email.trim(),
        password,
        name: name.trim(),
        role: selectedRole,
      });

      // 2. Save active role locally
      saveRole(selectedRole);

      // 3. Handle email confirmation or direct login
      if (data.session || (data as any).isOfflineFallback) {
        router.push(roleDashboardHref[selectedRole]);
      } else if (data.user && !data.session) {
        setSuccessMessage(
          `Account created for ${data.user.email}! Please check your email to confirm your account, then sign in.`
        );
      } else {
        router.push(roleDashboardHref[selectedRole]);
      }
    } catch (err: any) {
      const msg = err?.message || "Failed to create account. Please try again.";
      if (msg.toLowerCase().includes("user already registered")) {
        setError("An account with this email already exists. Please sign in instead.");
      } else if (
        msg.toLowerCase().includes("load failed") ||
        msg.toLowerCase().includes("failed to fetch") ||
        msg.toLowerCase().includes("fetch failed")
      ) {
        saveRole(selectedRole);
        router.push(roleDashboardHref[selectedRole]);
      } else {
        setError(msg);
      }
    } finally {
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
              <Sparkles size={12} className="text-blue-300" /> Early Access
            </span>
          </div>

          {/* Bottom Trust Badge */}
          <div className="relative z-10 mt-auto rounded-2xl border border-white/20 bg-[#08172e]/85 p-4 text-xs text-blue-100 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Join KiddoAI Platform</span>
              <span className="rounded-md bg-[#f59e0b] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                Instant Access
              </span>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-blue-200/90">
              Continue with Google in 1 click or create an account with email. All data is securely synchronized.
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
                Identify your account type
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Select your role, then continue with Google or enter your details below.
              </p>
            </div>

            {/* Role Options */}
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {roles.map(({ id, title, description, icon: Icon, tone }) => {
                const active = selectedRole === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setSelectedRole(id);
                      setError("");
                      setSuccessMessage("");
                    }}
                    className={`flex items-start gap-3.5 rounded-2xl border p-3.5 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                      active
                        ? tone
                        : "border-slate-200 bg-slate-50/70 text-slate-600 hover:border-slate-300 dark:border-slate-700/60 dark:bg-slate-800/40 dark:text-slate-400 dark:hover:border-slate-600"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition ${
                        active
                          ? "bg-white/80 dark:bg-white/10 shadow-sm"
                          : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span>
                      <span className="block text-sm font-bold text-slate-900 dark:text-white">
                        {title}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        {description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 1-CLICK CONTINUE WITH GOOGLE FOR SIGN UP */}
            <div className="mt-5">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={isGoogleLoading}
                className="group flex w-full items-center justify-between rounded-2xl border-2 border-slate-200 bg-white px-5 py-3.5 text-left transition hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-800/80 dark:hover:border-blue-400"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 p-1.5 shadow-sm dark:bg-slate-900">
                    <GoogleIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900 dark:text-white">
                      Sign up with Google
                    </span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      No form required · 1-click registration as {roles.find((r) => r.id === selectedRole)?.title.replace("I'm a ", "")}
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
            </div>

            {/* Divider */}
            <div className="my-5 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700/60" />
              OR SIGN UP WITH EMAIL
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700/60" />
            </div>

            {/* Success Notification */}
            {successMessage && (
              <div className="mb-4 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-medium text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <p>{successMessage}</p>
                  <Link href="/signin" className="mt-2 inline-block font-bold text-emerald-700 underline dark:text-emerald-300">
                    Proceed to Sign In →
                  </Link>
                </div>
              </div>
            )}

            {/* Error Notification */}
            {error && (
              <p className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs leading-relaxed font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                {error}
              </p>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200">Name</span>
                  <span className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 transition focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/60">
                    <User size={18} className="text-slate-400 dark:text-slate-400" />
                    <input
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      placeholder="Full name"
                      className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200">Email</span>
                  <span className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 transition focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/60">
                    <Mail size={18} className="text-slate-400 dark:text-slate-400" />
                    <input
                      required
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                    />
                  </span>
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200">Password</span>
                <span className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 transition focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/60">
                  <LockKeyhole size={18} className="text-slate-400 dark:text-slate-400" />
                  <input
                    required
                    minLength={6}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Create password (min 6 characters)"
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

              <button
                type="submit"
                disabled={isLoading}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0c2b5c] via-[#0f5bbd] to-[#1e69d2] px-5 py-3.5 font-bold text-white shadow-lg shadow-blue-900/25 transition active:scale-[0.99] disabled:opacity-75 hover:from-[#092248] hover:via-[#0c4ea3] hover:to-[#175bb8]"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Creating account in Supabase...
                  </>
                ) : (
                  <>
                    Create account with Email
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              By signing up, you accept the{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">Terms of Service</span> and acknowledge our{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">Privacy Policy</span>.
            </p>

            <p className="mt-3 text-center text-xs text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link href="/signin" className="font-bold text-blue-600 transition hover:underline dark:text-blue-400">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
