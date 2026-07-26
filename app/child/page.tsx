"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { ChatPanel } from "@/components/dashboard/chat-panel";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Flame, Trophy, Star } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const moods = ["😊", "😐", "😔", "😡", "😴"];

export default function ChildAppPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="font-heading text-lg font-semibold">
          KiddoAI
        </Link>
        <ThemeToggle />
      </div>

      <Card className="mb-6 flex flex-col items-center bg-gradient-to-b from-primary/10 to-transparent text-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-primary/15 text-5xl"
        >
          🤖
        </motion.div>
        <h1 className="font-heading text-xl font-semibold">Hi Aarav! I&apos;m Kiddo 🌟</h1>
        <p className="mt-1 text-sm text-muted">Good to see you again. How&apos;s your day going?</p>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
        </CardHeader>
        <div className="flex justify-between gap-2">
          {moods.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMood(m)}
              className={`flex-1 rounded-xl border py-3 text-2xl transition ${
                selectedMood === m ? "border-primary bg-primary/10 scale-105" : "border-border hover:scale-105"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        {selectedMood && (
          <p className="mt-3 text-center text-sm text-muted">Thanks for sharing! Logged for today 💙</p>
        )}
      </Card>

      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center rounded-xl border border-border p-4">
          <Flame size={20} className="text-warning" />
          <p className="mt-1 text-sm font-semibold">6 days</p>
          <p className="text-xs text-muted">Streak</p>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-border p-4">
          <Trophy size={20} className="text-accent" />
          <p className="mt-1 text-sm font-semibold">12</p>
          <p className="text-xs text-muted">Achievements</p>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-border p-4">
          <Star size={20} className="text-primary" />
          <p className="mt-1 text-sm font-semibold">480</p>
          <p className="text-xs text-muted">Points</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chat with Kiddo</CardTitle>
        </CardHeader>
        <ChatPanel
          endpoint="/api/child-coach"
          assistantName="Kiddo"
          placeholder="Type something…"
          bubbleAssistantClass="bg-primary/10 border border-primary/20"
          starterPrompts={["I'm stressed about homework", "Someone was mean to me", "I can't sleep", "I need motivation"]}
        />
      </Card>
    </div>
  );
}
