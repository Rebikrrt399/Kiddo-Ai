"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, Shield, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const benefits = [
  "Parent dashboard with weekly wellbeing summaries",
  "Child mood check-ins and AI coach access",
  "Screen-time, app usage, and alert workflows",
];

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950 transition-colors duration-300 dark:bg-[#081225] dark:text-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f274a] text-white dark:bg-white dark:text-[#0f274a]">
            <Shield className="h-5 w-5 fill-current/15" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold leading-none tracking-tight text-[#0f274a] dark:text-white">
              KiddoAI
            </span>
            <span className="mt-0.5 text-[8px] font-bold uppercase leading-none tracking-[0.18em] text-slate-400 dark:text-slate-500">
              FAMILY INTELLIGENCE
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/signin"
            className="hidden rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#0f274a] hover:text-[#0f274a] dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-white sm:inline-flex"
          >
            Sign in
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-12 pt-6 lg:grid-cols-[1fr_480px] lg:items-center lg:pb-20 lg:pt-14">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
            Start your family profile
          </span>
          <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight tracking-tight text-[#0f274a] dark:text-white md:text-5xl">
            Create a calmer way to understand digital wellbeing.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Set up your parent account, add your first child profile, and explore KiddoAI&apos;s dashboard in demo mode today.
          </p>

          <div className="mt-8 space-y-3">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-[#0f1f38] dark:shadow-black/20 sm:p-8">
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-[#0f274a] dark:text-white">Create account</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              This MVP stores no real auth yet, but the flow is ready for Clerk or NextAuth.
            </p>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              router.push("/dashboard");
            }}
            className="mt-8 space-y-5"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Parent name
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/15 dark:border-slate-800 dark:bg-[#0b192e] dark:focus-within:bg-[#0b192e]">
                <User className="h-5 w-5 text-slate-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Your full name"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Email address
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/15 dark:border-slate-800 dark:bg-[#0b192e] dark:focus-within:bg-[#0b192e]">
                <Mail className="h-5 w-5 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="parent@example.com"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Password
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/15 dark:border-slate-800 dark:bg-[#0b192e] dark:focus-within:bg-[#0b192e]">
                <LockKeyhole className="h-5 w-5 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  placeholder="Create a secure password"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-slate-400 transition hover:text-slate-700 dark:hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600" />
              <span>
                I agree to receive KiddoAI setup emails and understand this is an MVP demo experience.
              </span>
            </label>

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0f274a] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-950/15 transition hover:bg-slate-800 active:scale-[0.99] dark:bg-white dark:text-[#0f274a] dark:hover:bg-slate-100"
            >
              Create account
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link href="/signin" className="font-bold text-blue-600 hover:text-blue-500 dark:text-blue-300">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
