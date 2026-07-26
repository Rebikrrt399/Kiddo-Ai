// Mock/in-memory data layer.
// Swap these functions for real Prisma + Postgres queries later —
// see prisma/schema.prisma for the intended shape of this data.

export type RiskLevel = "low" | "medium" | "high" | "critical";

export const child = {
  id: "child_01",
  name: "Aarav Sharma",
  age: 12,
  avatar: "🧑",
  device: "iPhone 13 · iOS 18",
  wellbeingScore: 74,
  wellbeingTrend: 4, // vs last week
};

export const weeklyScreenTime = [
  { day: "Mon", hours: 4.2, education: 1.1, social: 1.4, gaming: 1.2, entertainment: 0.5 },
  { day: "Tue", hours: 3.8, education: 1.3, social: 1.1, gaming: 1.0, entertainment: 0.4 },
  { day: "Wed", hours: 5.1, education: 0.9, social: 1.8, gaming: 1.6, entertainment: 0.8 },
  { day: "Thu", hours: 4.6, education: 1.4, social: 1.3, gaming: 1.1, entertainment: 0.8 },
  { day: "Fri", hours: 6.2, education: 0.8, social: 2.1, gaming: 2.3, entertainment: 1.0 },
  { day: "Sat", hours: 7.4, education: 0.3, social: 2.4, gaming: 3.1, entertainment: 1.6 },
  { day: "Sun", hours: 6.0, education: 0.6, social: 2.0, gaming: 2.2, entertainment: 1.2 },
];

export const appUsage = [
  { app: "YouTube", time: "2h 15m", minutes: 135, percentage: 32, color: "#EF4444" },
  { app: "WhatsApp", time: "1h 10m", minutes: 70, percentage: 16, color: "#22C55E" },
  { app: "Instagram", time: "1h 00m", minutes: 60, percentage: 14, color: "#EC4899" },
  { app: "Chrome", time: "0h 50m", minutes: 50, percentage: 12, color: "#F59E0B" },
  { app: "Minecraft", time: "0h 40m", minutes: 40, percentage: 9, color: "#22C55E" },
  { app: "Google Classroom", time: "0h 35m", minutes: 35, percentage: 8, color: "#2563EB" },
  { app: "Spotify", time: "0h 25m", minutes: 25, percentage: 5, color: "#06B6D4" },
  { app: "Others", time: "0h 20m", minutes: 20, percentage: 4, color: "#94A3B8" },
];

export const moodJournal = [
  { day: "Mon", mood: "😊", score: 4 },
  { day: "Tue", mood: "😐", score: 3 },
  { day: "Wed", mood: "😔", score: 2 },
  { day: "Thu", mood: "😊", score: 4 },
  { day: "Fri", mood: "😴", score: 3 },
  { day: "Sat", mood: "😊", score: 5 },
  { day: "Sun", mood: "😡", score: 2 },
];

export const riskAlerts: {
  id: string;
  title: string;
  detail: string;
  level: RiskLevel;
  confidence: number;
  suggestedAction: string;
  timestamp: string;
}[] = [
  {
    id: "r1",
    title: "Late-night phone use detected",
    detail: "Screen activity logged past midnight for 5 of the last 7 nights.",
    level: "high",
    confidence: 93,
    suggestedAction: "Discuss a healthy bedtime routine and consider a device curfew.",
    timestamp: "2 hours ago",
  },
  {
    id: "r2",
    title: "Gaming time trending up",
    detail: "Gaming rose 38% week-over-week, concentrated on weekends.",
    level: "medium",
    confidence: 81,
    suggestedAction: "Set a shared weekend screen-time goal together.",
    timestamp: "Yesterday",
  },
  {
    id: "r3",
    title: "Positive conversation pattern",
    detail: "AI Coach sessions this week were mostly encouraging and low-stress.",
    level: "low",
    confidence: 88,
    suggestedAction: "No action needed — keep the current routine.",
    timestamp: "3 days ago",
  },
];

export const safeZones = [
  { name: "Home", status: "inside", lastEvent: "Arrived 5:42 PM" },
  { name: "School", status: "left", lastEvent: "Left 3:15 PM" },
  { name: "Tuition Center", status: "not visited today", lastEvent: "—" },
];

export const locationTimeline = [
  { time: "8:02 AM", place: "Home", event: "Left Home" },
  { time: "8:24 AM", place: "School", event: "Reached School" },
  { time: "3:15 PM", place: "School", event: "Left School" },
  { time: "3:52 PM", place: "Tuition Center", event: "Entered Safe Zone" },
  { time: "5:42 PM", place: "Home", event: "Reached Home" },
];

export const parentingVideos = [
  { title: "Helping kids sleep better with screens around", category: "Sleep", duration: "6:12" },
  { title: "Spotting the early signs of cyberbullying", category: "Bullying", duration: "8:45" },
  { title: "Talking to your child about gaming balance", category: "Gaming", duration: "5:30" },
  { title: "Building a family screen-time agreement", category: "Screen Time", duration: "7:02" },
];

export const weeklyReport = {
  summary:
    "Aarav's wellbeing score rose 4 points this week. YouTube usage increased 24%, while educational app usage grew 18%. Two late-night sessions were flagged; mood stayed mostly positive with one lower day on Wednesday.",
  wins: ["Educational app time up 18%", "5 positive AI Coach check-ins", "No missed safe-zone arrivals"],
  watchouts: ["Late-night use on 5 nights", "Gaming up 38% on weekends"],
};

export const adminStats = {
  totalUsers: 12480,
  children: 7210,
  parents: 5270,
  activeSubscriptions: 3120,
  monthlyRevenue: 48210,
  riskAlertsToday: 214,
  modelAccuracy: 91.4,
};

export const referral = {
  code: "AARAV-4F2K",
  invited: 6,
  premiumUnlocked: true,
  leaderboardRank: 12,
};

export function riskColor(level: RiskLevel) {
  return {
    low: "var(--accent)",
    medium: "var(--warning)",
    high: "var(--danger)",
    critical: "var(--danger)",
  }[level];
}
