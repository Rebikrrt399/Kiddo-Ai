"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Clock, MapPin, Sparkles, Check, Shield, Heart, MessageSquare, Activity, Brain
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { 
    icon: Activity, 
    title: "AI Digital Behaviour Monitor", 
    badge: "Core",
    desc: "Tracks app/usage patterns and flags risk signals — excess screen time, late-night usage, or app isolation." 
  },
  { 
    icon: Clock, 
    title: "App Usage Breakdown", 
    badge: "New",
    desc: "See exactly which apps take what portion of your child's day, with weekly AI summaries of what's changed." 
  },
  { 
    icon: MapPin, 
    title: "Real-time Location", 
    badge: "New",
    desc: "Know where your child is right now — with geofence alerts for school, home, and automated arrival check-ins." 
  },
  { 
    icon: Brain, 
    title: "AI Parent Assistant + Dashboard", 
    badge: "Core",
    desc: "Get actionable parenting insights and customized support scripts built on top of your child's real behavior data." 
  },
];

const plans = [
  { name: "Free", price: "$0", features: ["1 child profile", "Weekly summary", "Basic screen time"] },
  { name: "Premium", price: "$9/mo", features: ["Everything in Free", "AI Risk Engine", "Location tracking", "AI Coach"], highlight: true },
  { name: "Family", price: "$19/mo", features: ["Up to 5 children", "Priority alerts", "Doctor report export"] },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#081225] transition-colors duration-300">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#081225]/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/50 transition-colors duration-300">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f274a] dark:bg-white text-white dark:text-[#0f274a]">
              <Shield className="h-5 w-5 fill-current/15" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold leading-none tracking-tight text-[#0f274a] dark:text-white">
                KiddoAI
              </span>
              <span className="text-[8px] font-bold tracking-[0.18em] text-slate-400 dark:text-slate-500 uppercase mt-0.5 leading-none">
                FAMILY INTELLIGENCE
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden items-center gap-2 md:flex">
            <Link 
              href="/" 
              className="bg-[#0f274a] text-white dark:bg-white dark:text-[#0f274a] px-4 py-1.5 rounded-full font-semibold text-xs transition"
            >
              Overview
            </Link>
            <Link 
              href="/dashboard" 
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 px-4 py-1.5 font-semibold text-xs transition"
            >
              Parent
            </Link>
            <Link 
              href="/child" 
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 px-4 py-1.5 font-semibold text-xs transition"
            >
              Child App
            </Link>
            <Link 
              href="/admin" 
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 px-4 py-1.5 font-semibold text-xs transition"
            >
              Admin
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/dashboard">
              <button className="bg-[#0f274a] hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-[#0f274a] px-5 py-2.5 rounded-full text-xs font-semibold shadow-sm transition active:scale-95">
                Get Early Access
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0c2b5c] via-[#164b8a] to-[#296cae] dark:from-[#06152b] dark:via-[#0c2b53] dark:to-[#17416e] text-white py-16 md:py-24">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <div className="relative mx-auto max-w-6xl px-6 grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4.5 py-1.5 text-xs text-white/90 font-medium"
            >
              <Sparkles size={12} className="text-blue-300" /> Early access · Beta 2026
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
            >
              The AI that helps you parent the{" "}
              <span className="relative inline-block whitespace-nowrap">
                digital child.
                <span className="absolute bottom-1 left-0 w-full h-[3px] bg-white/70 rounded-full"></span>
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base md:text-lg text-blue-100/85 leading-relaxed max-w-xl"
            >
              KiddoAI turns your child&apos;s online behaviour into calm, actionable insight — with a friendly avatar that supports them in the moment, and a dashboard that supports you at home.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link href="/dashboard">
                <button className="bg-white hover:bg-blue-50 text-[#0c2b5c] font-semibold px-6 py-3.5 rounded-xl text-sm transition shadow-md active:scale-95">
                  Explore Parent Dashboard
                </button>
              </Link>
              <Link href="/child">
                <button className="border border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition active:scale-95">
                  Meet the AI Coach
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column (Glassmorphic Notification Card) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-6 w-full max-w-[430px]">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white border border-white/20">
                    <Heart className="h-5 w-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Nora, 11</h4>
                    <p className="text-[11px] text-blue-200/80">Today at 9:42 pm</p>
                  </div>
                </div>
                <span className="bg-[#f59e0b] text-slate-950 font-bold px-3 py-1 rounded-lg text-[10px] tracking-wide uppercase">
                  Attention
                </span>
              </div>

              {/* Main Speech Bubble Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 mt-5 text-[#0f274a] dark:text-blue-100 text-sm leading-relaxed shadow-lg">
                <p className="text-slate-700 dark:text-slate-300">
                  Nora spent <span className="font-bold text-slate-900 dark:text-white">42 min on TikTok</span> after 9 pm and messages show she&apos;s feeling left out. Her coach already sent a gentle check-in.
                </p>
                
                {/* Details Boxes */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-700/50 text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold shrink-0">Suggested response</span>
                    <span className="font-bold text-slate-900 dark:text-white text-right">Ask about her friend group tomorrow</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-700/50 text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold shrink-0">Recommended video</span>
                    <span className="font-bold text-slate-900 dark:text-white text-right">&quot;Talking to tweens about FOMO&quot; - 4 min</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-2 mt-4.5 text-xs text-blue-200/90 font-medium">
                <MessageSquare className="h-4.5 w-4.5 text-blue-300 fill-blue-300/10" />
                <span>Coach also messaged Nora — she replied 😐</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <div className="mx-auto max-w-6xl px-6 mt-16 md:mt-24">
          <div className="border-t border-white/15 pt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl md:text-5xl font-extrabold text-white">3.2h</div>
              <div className="text-[10px] md:text-[11px] font-bold tracking-wider text-blue-200/70 mt-2 uppercase">
                AVG. DAILY SCREEN TIME SURFACED
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-extrabold text-white">87%</div>
              <div className="text-[10px] md:text-[11px] font-bold tracking-wider text-blue-200/70 mt-2 uppercase">
                FLAGS PARENTS MARK AS HELPFUL
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-extrabold text-white">12+</div>
              <div className="text-[10px] md:text-[11px] font-bold tracking-wider text-blue-200/70 mt-2 uppercase">
                RISK SIGNALS MONITORED
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="bg-white dark:bg-[#081225] border-t border-slate-100 dark:border-slate-800/40 py-20 px-6 transition-colors duration-300">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-6">
            <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
              The problem
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f274a] dark:text-white mt-6 leading-tight tracking-tight">
              Screen-time apps count minutes.<br />Parents need meaning.
            </h2>
          </div>
          <div className="md:col-span-6 md:pt-14">
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-normal">
              Blocking and counting don&apos;t explain behaviour, mood, or risk. Parents get no insight, children get no support in the moment. KiddoAI answers one question: <span className="italic font-medium text-slate-900 dark:text-white">how do we turn digital behaviour into timely, real-world support — for both sides?</span>
            </p>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="bg-[#f8fafc] dark:bg-[#0a162a] border-t border-slate-100 dark:border-slate-800/40 py-24 px-6 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div>
            <span className="bg-[#0f274a] dark:bg-white text-white dark:text-[#0f274a] text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
              Core Features
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f274a] dark:text-white mt-6 leading-tight tracking-tight">
              One system. Two experiences.<br />Shared intelligence.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mt-4 max-w-2xl leading-relaxed">
              Everything sits on top of a shared monitoring and ML layer, so the parent and child are always aligned — never surprised.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {features.map((f, i) => {
              const IconComp = f.icon;
              return (
                <motion.div 
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white dark:bg-[#0f1f38] border border-slate-100 dark:border-slate-800/40 rounded-3xl p-6 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between min-h-[260px]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-full text-slate-700 dark:text-slate-300">
                        <IconComp className="h-6 w-6" />
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                        f.badge === "New" 
                          ? "bg-[#0f274a] text-white dark:bg-white dark:text-[#0f274a]" 
                          : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                      }`}>
                        {f.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-6 leading-snug">
                      {f.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24 transition-colors duration-300">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="font-heading text-3xl font-extrabold text-[#0f274a] dark:text-white">Simple, transparent pricing</h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">Choose the perfect plan to help support your family&apos;s digital health.</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 items-stretch">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-3xl border p-8 flex flex-col justify-between transition duration-300 ${
                p.highlight 
                  ? "border-[#0c2b5c] dark:border-blue-500 bg-blue-50/10 dark:bg-blue-950/10 shadow-md relative scale-105" 
                  : "border-slate-100 dark:border-slate-800/40 bg-white dark:bg-[#0f1f38] shadow-sm hover:shadow-md"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0c2b5c] dark:bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              <div>
                <p className="font-heading text-xl font-bold text-[#0f274a] dark:text-white">{p.name}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{p.price.split("/")[0]}</span>
                  {p.price !== "$0" && <span className="text-sm text-slate-500 dark:text-slate-400">/{p.price.split("/")[1]}</span>}
                </div>
                <ul className="mt-8 space-y-4">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <div className="rounded-full bg-emerald-500/10 p-0.5 mt-0.5 text-emerald-500 shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </div> 
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link href="/dashboard" className="w-full mt-8">
                <button className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition active:scale-[0.98] ${
                  p.highlight 
                    ? "bg-[#0c2b5c] dark:bg-blue-500 text-white hover:brightness-110 shadow-sm" 
                    : "border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}>
                  Choose {p.name}
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="mx-auto max-w-4xl px-6 py-16 pb-28 transition-colors duration-300">
        <h2 className="font-heading text-3xl font-extrabold text-center text-[#0f274a] dark:text-white">Frequently asked</h2>
        <div className="mt-12 space-y-4">
          {[
            ["Is this monitoring or spying?", "KiddoAI is designed for transparency between parents and children, with a child-facing app, not a hidden tracker. We encourage open communication and trust-building."],
            ["Is my child's data private?", "Yes, absolutely. The platform&apos;s architecture is built with privacy-first standards including role-based access control, secure local data storage, and strict encryption protocols compliant with modern standards."],
            ["Do I need to set up my own AI keys?", "Yes. To enable the live parenting insights and AI coach behavior, make sure to add your OpenAI key to the .env.local file in the workspace."],
          ].map(([q, a]) => (
            <div key={q} className="rounded-2xl border border-slate-100 dark:border-slate-800/40 bg-white dark:bg-[#0f1f38] p-6 shadow-sm">
              <p className="text-base font-bold text-slate-900 dark:text-white">{q}</p>
              <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 dark:border-slate-800/40 px-6 py-10 text-center text-sm text-slate-400 dark:text-slate-500 transition-colors duration-300">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 KiddoAI. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-slate-600 dark:hover:text-slate-300 transition">Privacy Policy</Link>
            <Link href="/" className="hover:text-slate-600 dark:hover:text-slate-300 transition">Terms of Service</Link>
            <Link href="/admin" className="hover:text-slate-600 dark:hover:text-slate-300 transition">Admin Panel</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
