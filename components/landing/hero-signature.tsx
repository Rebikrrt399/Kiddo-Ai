"use client";

import { motion } from "framer-motion";
import { WellbeingRing } from "@/components/dashboard/wellbeing-ring";

const signals = [
  { label: "Sleep", pos: "left-0 top-4", delay: 0 },
  { label: "YouTube", pos: "right-0 top-0", delay: 0.4 },
  { label: "Gaming", pos: "left-2 bottom-10", delay: 0.8 },
  { label: "Mood 😊", pos: "right-2 bottom-4", delay: 1.2 },
  { label: "Homework", pos: "left-1/2 -top-4 -translate-x-1/2", delay: 1.6 },
];

export function HeroSignature() {
  return (
    <div className="relative mx-auto flex h-80 w-80 items-center justify-center">
      {signals.map((s) => (
        <motion.div
          key={s.label}
          className={`absolute ${s.pos} rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs shadow-sm backdrop-blur-sm`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 1, 1, 0.3], scale: [0.6, 1, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        >
          {s.label}
        </motion.div>
      ))}
      <div className="animate-float">
        <WellbeingRing score={74} trend={4} />
      </div>
    </div>
  );
}
