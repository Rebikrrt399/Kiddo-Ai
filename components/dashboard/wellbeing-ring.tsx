"use client";

import { motion } from "framer-motion";

export function WellbeingRing({ score, trend }: { score: number; trend: number }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color = score >= 70 ? "var(--accent)" : score >= 40 ? "var(--warning)" : "var(--danger)";

  return (
    <div className="relative flex items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
        <circle cx="90" cy="90" r={radius} fill="none" stroke="var(--border)" strokeWidth="14" />
        <motion.circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-heading text-4xl font-semibold"
        >
          {score}
        </motion.span>
        <span className="text-xs text-muted">out of 100</span>
        <span
          className="mt-1 text-xs font-medium"
          style={{ color: trend >= 0 ? "var(--accent)" : "var(--danger)" }}
        >
          {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)} this week
        </span>
      </div>
    </div>
  );
}
