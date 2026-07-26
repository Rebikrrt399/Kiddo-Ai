"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Clock,
  AppWindow,
  Smile,
  MapPin,
  ShieldAlert,
  MessageCircle,
  Sparkles,
  Video,
  Gift,
  HeartPulse,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { child } from "@/lib/mock-data";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/dashboard/screen-time", label: "Screen Time", icon: Clock },
  { href: "/dashboard/app-usage", label: "App Usage", icon: AppWindow },
  { href: "/dashboard/mood", label: "Mood Trends", icon: Smile },
  { href: "/dashboard/location", label: "Location", icon: MapPin },
  { href: "/dashboard/alerts", label: "Risk Alerts", icon: ShieldAlert },
  { href: "/dashboard/assistant", label: "AI Assistant", icon: MessageCircle },
  { href: "/dashboard/videos", label: "Parenting Videos", icon: Video },
  { href: "/dashboard/referrals", label: "Referral Hub", icon: Gift },
  { href: "/dashboard/doctors", label: "Doctor Clinic", icon: HeartPulse },
];

export function Sidebar() {
  const pathname = usePathname();
  const [subscription, setSubscription] = useState<string>("Premium");

  useEffect(() => {
    // Read subscription from localStorage (default to Premium for mock display if not set)
    const sub = localStorage.getItem("kiddoai_subscription");
    if (sub) {
      setSubscription(sub);
    }
  }, []);

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card/40 p-5 lg:flex">
      <Link href="/" className="mb-8 flex items-center gap-2 px-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
          <Sparkles size={16} />
        </div>
        <span className="font-heading text-lg font-semibold">KiddoAI</span>
      </Link>

      <div className="mb-6 flex flex-col gap-3 rounded-xl border border-border bg-background/60 p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 text-lg shrink-0">
            {child.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{child.name}</p>
            <p className="truncate text-[10px] text-muted">{child.device}</p>
          </div>
        </div>

        {/* Subscription Plan Badge */}
        <div className="border-t border-border/50 pt-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">Plan</span>
          <span className={cn(
            "text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider transition-all duration-300",
            subscription === "Free" && "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
            subscription === "Premium" && "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/15",
            subscription === "Family" && "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/15"
          )}>
            {subscription}
          </span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:bg-background/60 hover:text-foreground"
              )}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-xl border border-border bg-background/60 p-3 text-xs text-muted">
        Admin & Doctor portals are scaffolded separately — see{" "}
        <Link href="/admin" className="text-primary underline underline-offset-2">
          /admin
        </Link>
        .
      </div>
    </aside>
  );
}
