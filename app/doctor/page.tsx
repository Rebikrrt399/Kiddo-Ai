"use client";

import Link from "next/link";
import { Activity, CalendarDays, ClipboardList, HeartPulse, MessageCircle, Search, ShieldCheck, Users } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleGate } from "@/components/role-gate";
import { ThemeToggle } from "@/components/theme-toggle";

const patients = [
  { name: "Aarav Sharma", risk: "Moderate", note: "Night usage improved by 18%", color: "text-warning" },
  { name: "Meera Patel", risk: "Low", note: "Mood check-ins steady", color: "text-accent" },
  { name: "Kabir Rao", risk: "Review", note: "Parent requested consultation", color: "text-danger" },
];

const stats = [
  { label: "Active Patients", value: "24", icon: Users },
  { label: "Reports Ready", value: "8", icon: ClipboardList },
  { label: "Care Plans", value: "16", icon: HeartPulse },
  { label: "Sessions Today", value: "5", icon: CalendarDays },
];

export default function DoctorPage() {
  return (
    <RoleGate allowedRole="doctor">
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <header className="mb-8 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
                <HeartPulse size={18} />
              </div>
              <div>
                <p className="font-heading text-lg font-semibold">KiddoAI Doctor</p>
                <p className="text-xs text-muted">Clinical wellbeing workspace</p>
              </div>
            </Link>
            <ThemeToggle />
          </header>

          <section className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                Doctor access only
              </p>
              <h1 className="font-heading text-3xl font-bold">Patient wellbeing review</h1>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                Review shared child profiles, risk summaries, and parent consultation requests from one focused dashboard.
              </p>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white">
              <Search size={16} />
              Find patient
            </button>
          </section>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <Card key={label}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted">{label}</p>
                    <p className="mt-1 font-heading text-2xl font-semibold">{value}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <Icon size={18} />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <Card>
              <CardHeader>
                <CardTitle>Shared Patient Profiles</CardTitle>
                <ShieldCheck className="h-5 w-5 text-accent" />
              </CardHeader>
              <div className="space-y-3">
                {patients.map((patient) => (
                  <div key={patient.name} className="flex items-center justify-between rounded-xl border border-border p-4">
                    <div>
                      <p className="text-sm font-semibold">{patient.name}</p>
                      <p className="mt-1 text-xs text-muted">{patient.note}</p>
                    </div>
                    <span className={`text-xs font-bold ${patient.color}`}>{patient.risk}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consultation Queue</CardTitle>
                <Activity className="h-5 w-5 text-primary" />
              </CardHeader>
              <div className="space-y-4 text-sm">
                <div className="rounded-xl bg-primary/10 p-4">
                  <p className="font-semibold">2 new parent messages</p>
                  <p className="mt-1 text-xs text-muted">Review context before scheduling follow-up.</p>
                </div>
                <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 font-semibold">
                  <MessageCircle size={16} />
                  Open secure inbox
                </button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </RoleGate>
  );
}
