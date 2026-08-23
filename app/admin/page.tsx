"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  Baby,
  CreditCard,
  ShieldAlert,
  Cpu,
  TrendingUp,
  Search,
  Plus,
  UserCheck,
  UserX,
  Shield,
  ShieldCheck,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Server,
  Activity,
  HeartPulse,
  Filter,
  Check,
  ChevronRight,
  Sparkles,
  Sliders,
  Clock,
  MoreVertical,
  X,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { RoleGate } from "@/components/role-gate";
import { signOutUser } from "@/lib/supabase";
import { type UserRole } from "@/lib/role-auth";
import { adminStats, type SystemUser } from "@/lib/mock-data";

interface AdminStats {
  kpis: {
    totalUsers: number;
    activeUsers: number;
    suspendedUsers: number;
    flaggedUsers: number;
    childrenCount: number;
    parentsCount: number;
    activeSubscriptions: number;
    monthlyRevenue: number;
    riskAlertsToday: number;
    modelAccuracy: number;
  };
  systemHealth: {
    serverStatus: string;
    uptime: string;
    cpuUsage: string;
    memoryUsage: string;
    avgResponseTimeMs: number;
    activeWebsockets: number;
    lastDiagnosticRun: string;
  };
  subscriptionBreakdown: {
    free: number;
    premium: number;
    family: number;
  };
}

interface PlatformAlert {
  id: string;
  childName: string;
  parentEmail: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  timestamp: string;
  status: "Open" | "Acknowledged" | "Resolved";
}

const initialAlerts: PlatformAlert[] = [
  {
    id: "alt_901",
    childName: "Aarav Sharma",
    parentEmail: "priya.sharma@gmail.com",
    type: "Late-night screen time (>2 hours past midnight)",
    severity: "high",
    timestamp: "12 mins ago",
    status: "Open",
  },
  {
    id: "alt_902",
    childName: "Rohan Gupta",
    parentEmail: "gupta.family@gmail.com",
    type: "Unusual sentiment shift in AI chat (Distress pattern)",
    severity: "critical",
    timestamp: "45 mins ago",
    status: "Open",
  },
  {
    id: "alt_903",
    childName: "Sneha Nair",
    parentEmail: "nair.parent@outlook.com",
    type: "Safe Zone perimeter boundary crossed (School Zone)",
    severity: "medium",
    timestamp: "2 hours ago",
    status: "Acknowledged",
  },
];

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [alerts, setAlerts] = useState<PlatformAlert[]>(initialAlerts);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"users" | "alerts" | "diagnostics">("users");

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Diagnostics & Sweeps
  const [isSweeping, setIsSweeping] = useState(false);
  const [sweepMessage, setSweepMessage] = useState<string | null>(null);
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);

  // Add User Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<SystemUser["role"]>("PARENT");
  const [newSub, setNewSub] = useState<SystemUser["subscription"]>("Premium");

  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([
    "✓ Supabase REST & Realtime API: Connected (18ms)",
    "✓ OpenAI GPT-4o-mini endpoint: Operational (210ms)",
    "✓ Postgres DB Connection Pool: Healthy (3/20 active connections)",
    "✓ Redis Session Cache: Synchronized",
  ]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to fetch admin stats:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("query", searchQuery);
      if (roleFilter !== "ALL") params.set("role", roleFilter);
      if (statusFilter !== "ALL") params.set("status", statusFilter);

      const res = await fetch(`/api/admin/users?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, roleFilter, statusFilter]);

  async function handleSignOut() {
    await signOutUser();
    router.push("/signin");
  }

  const handleUpdateStatus = async (userId: string, newStatus: SystemUser["status"]) => {
    setUpdatingUser(userId);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, status: newStatus }),
      });
      if (res.ok) {
        await fetchUsers();
        await fetchStats();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingUser(null);
    }
  };

  const handleUpdateRole = async (userId: string, newRole: SystemUser["role"]) => {
    setUpdatingUser(userId);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      if (res.ok) {
        await fetchUsers();
        await fetchStats();
      }
    } catch (err) {
      console.error("Failed to update role:", err);
    } finally {
      setUpdatingUser(null);
    }
  };

  const handleUpdateSubscription = async (userId: string, subscription: SystemUser["subscription"]) => {
    setUpdatingUser(userId);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, subscription }),
      });
      if (res.ok) {
        await fetchUsers();
        await fetchStats();
      }
    } catch (err) {
      console.error("Failed to update subscription:", err);
    } finally {
      setUpdatingUser(null);
    }
  };

  const handleRunDiagnostic = async () => {
    setIsSweeping(true);
    setSweepMessage(null);
    try {
      const res = await fetch("/api/admin/system", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sweep" }),
      });
      if (res.ok) {
        const data = await res.json();
        setSweepMessage(data.message || "Diagnostic sweep finished.");
        setDiagnosticLogs((prev) => [
          `[${new Date().toLocaleTimeString()}] Diagnostic sweep completed successfully.`,
          `✓ Server telemetry response: 200 OK`,
          ...prev,
        ]);
        await fetchStats();
      }
    } catch (err) {
      console.error("Failed to run diagnostic:", err);
    } finally {
      setIsSweeping(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          role: newRole,
          subscription: newSub,
          status: "Active",
        }),
      });

      if (res.ok) {
        await fetchUsers();
        await fetchStats();
        setNewName("");
        setNewEmail("");
        setIsAddModalOpen(false);
      }
    } catch (err) {
      console.error("Failed to add user:", err);
    }
  };

  const handleAlertAction = (alertId: string, nextStatus: "Acknowledged" | "Resolved") => {
    setAlerts(alerts.map((a) => (a.id === alertId ? { ...a, status: nextStatus } : a)));
  };

  const kpis = stats?.kpis;
  const sysHealth = stats?.systemHealth;

  return (
    <RoleGate allowedRole="admin">
      <main className="min-h-screen bg-slate-50/70 text-slate-900 dark:bg-[#081225] dark:text-slate-100">
        {/* Top Header */}
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#0c1f3d]/90">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md shadow-purple-500/20">
                  <ShieldCheck size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-lg font-bold leading-none tracking-tight">
                    KiddoAI Admin
                  </span>
                  <span className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
                    Platform Management Console
                  </span>
                </div>
              </Link>

              <span className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 md:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Operational · {sysHealth?.uptime || "99.9%"}
              </span>
            </div>

            {/* Right Header Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleRunDiagnostic}
                disabled={isSweeping}
                className="hidden sm:flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 text-xs font-bold transition shadow-sm disabled:opacity-50"
              >
                <RefreshCw size={14} className={isSweeping ? "animate-spin" : ""} />
                <span>{isSweeping ? "Sweeping..." : "AI Diagnostic Sweep"}</span>
              </button>

              <ThemeToggle />

              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-red-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-red-950/40 dark:hover:text-red-300"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
          {sweepMessage && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>{sweepMessage}</span>
            </div>
          )}

          {/* Executive Overview KPI Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="relative overflow-hidden border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#0c1f3d]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Registered Users</p>
                  <p className="mt-1 font-heading text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {kpis ? kpis.totalUsers.toLocaleString() : adminStats.totalUsers.toLocaleString()}
                  </p>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp size={12} /> +12.4% this month
                  </span>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                  <Users size={20} />
                </div>
              </div>
            </Card>

            <Card className="relative overflow-hidden border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#0c1f3d]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Active Subscriptions</p>
                  <p className="mt-1 font-heading text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {kpis ? kpis.activeSubscriptions : 48} profiles
                  </p>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                    <CreditCard size={12} /> ${kpis ? kpis.monthlyRevenue.toLocaleString() : adminStats.monthlyRevenue.toLocaleString()} MRR
                  </span>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
                  <CreditCard size={20} />
                </div>
              </div>
            </Card>

            <Card className="relative overflow-hidden border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#0c1f3d]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Risk Alerts Today</p>
                  <p className="mt-1 font-heading text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {kpis ? kpis.riskAlertsToday : alerts.filter((a) => a.status === "Open").length} open
                  </p>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                    <AlertTriangle size={12} /> {alerts.length} total flagged
                  </span>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                  <ShieldAlert size={20} />
                </div>
              </div>
            </Card>

            <Card className="relative overflow-hidden border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#0c1f3d]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">AI Model Accuracy</p>
                  <p className="mt-1 font-heading text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {kpis ? `${kpis.modelAccuracy}%` : `${adminStats.modelAccuracy}%`}
                  </p>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <Activity size={12} /> {sysHealth?.avgResponseTimeMs || 42}ms latency
                  </span>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <Cpu size={20} />
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Doctor Hub Launcher Banner */}
          <Card className="p-6 bg-white dark:bg-[#0c1f3d] border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                <HeartPulse size={20} />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                  Pediatric Clinic & Doctor Suggestion Hub
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Backend API route <code className="text-purple-500 font-mono">/api/doctors/suggestions</code> ready for child mood & behavioral analytics.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/doctor"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              >
                <HeartPulse size={14} />
                <span>Open Doctor View</span>
              </Link>
            </div>
          </Card>

          {/* Tab Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("users")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition ${
                  activeTab === "users"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <Users size={16} />
                <span>User Directory ({users.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("alerts")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition ${
                  activeTab === "alerts"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <ShieldAlert size={16} />
                <span>Risk & Incident Monitor</span>
                {alerts.filter((a) => a.status === "Open").length > 0 && (
                  <span className="ml-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-extrabold text-white">
                    {alerts.filter((a) => a.status === "Open").length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("diagnostics")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition ${
                  activeTab === "diagnostics"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <Server size={16} />
                <span>System Telemetry & Diagnostics</span>
              </button>
            </div>

            {activeTab === "users" && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-md transition hover:from-purple-700 hover:to-indigo-700 active:scale-[0.98]"
              >
                <Plus size={16} />
                <span>Add User</span>
              </button>
            )}
          </div>

          {/* TAB 1: USER DIRECTORY & MANAGEMENT */}
          {activeTab === "users" && (
            <div className="space-y-4">
              {/* Search & Filter Toolbar */}
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="relative sm:col-span-1">
                  <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search user, email, ID..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-slate-800 dark:bg-[#0c1f3d] dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Role:</span>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-purple-500 dark:border-slate-800 dark:bg-[#0c1f3d] dark:text-slate-200"
                  >
                    <option value="ALL">All Roles</option>
                    <option value="PARENT">Parents</option>
                    <option value="CHILD">Children</option>
                    <option value="DOCTOR">Doctors</option>
                    <option value="ADMIN">Admins</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-purple-500 dark:border-slate-800 dark:bg-[#0c1f3d] dark:text-slate-200"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Flagged">Flagged</option>
                  </select>
                </div>
              </div>

              {/* User Directory Table */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0c1f3d]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                    <thead className="border-b border-slate-200 bg-slate-50/80 font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
                      <tr>
                        <th className="px-5 py-3.5">User</th>
                        <th className="px-5 py-3.5">Role</th>
                        <th className="px-5 py-3.5">Status</th>
                        <th className="px-5 py-3.5">Plan</th>
                        <th className="px-5 py-3.5">Last Active</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {loading ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-400">
                            Loading users from backend...
                          </td>
                        </tr>
                      ) : users.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-400">
                            No users match the search criteria.
                          </td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr key={user.id} className="transition hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                            <td className="px-5 py-3.5 font-medium text-slate-900 dark:text-white">
                              <div className="flex flex-col">
                                <span className="font-semibold text-sm">{user.name}</span>
                                <span className="text-[11px] text-slate-500 dark:text-slate-400">{user.email}</span>
                              </div>
                            </td>

                            <td className="px-5 py-3.5">
                              <select
                                value={user.role}
                                disabled={updatingUser === user.id}
                                onChange={(e) => handleUpdateRole(user.id, e.target.value as SystemUser["role"])}
                                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 outline-none hover:border-purple-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                              >
                                <option value="PARENT">PARENT</option>
                                <option value="DOCTOR">DOCTOR</option>
                                <option value="CHILD">CHILD</option>
                                <option value="ADMIN">ADMIN</option>
                              </select>
                            </td>

                            <td className="px-5 py-3.5">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                  user.status === "Active"
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                                    : user.status === "Suspended"
                                    ? "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"
                                    : "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                                }`}
                              >
                                {user.status}
                              </span>
                            </td>

                            <td className="px-5 py-3.5">
                              <select
                                value={user.subscription}
                                disabled={updatingUser === user.id}
                                onChange={(e) => handleUpdateSubscription(user.id, e.target.value as SystemUser["subscription"])}
                                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 outline-none hover:border-purple-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                              >
                                <option value="Free">Free</option>
                                <option value="Premium">Premium</option>
                                <option value="Family">Family</option>
                              </select>
                            </td>

                            <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">{user.lastActive}</td>

                            <td className="px-5 py-3.5 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {user.status === "Active" ? (
                                  <button
                                    disabled={updatingUser === user.id}
                                    onClick={() => handleUpdateStatus(user.id, "Suspended")}
                                    className="rounded-lg bg-red-50 p-1.5 text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 transition text-[11px] font-bold"
                                  >
                                    Suspend
                                  </button>
                                ) : (
                                  <button
                                    disabled={updatingUser === user.id}
                                    onClick={() => handleUpdateStatus(user.id, "Active")}
                                    className="rounded-lg bg-emerald-50 p-1.5 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 transition text-[11px] font-bold"
                                  >
                                    Activate
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RISK & INCIDENT MONITOR */}
          {activeTab === "alerts" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-lg font-bold">Live Risk Alerts Stream</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Real-time safety events flagged by KiddoAI Sentiment & Usage Monitors.
                  </p>
                </div>
              </div>

              <div className="grid gap-3">
                {alerts.map((alert) => (
                  <Card
                    key={alert.id}
                    className={`border p-4 transition ${
                      alert.severity === "critical"
                        ? "border-red-300 bg-red-50/40 dark:border-red-900/60 dark:bg-red-950/20"
                        : alert.severity === "high"
                        ? "border-amber-300 bg-amber-50/40 dark:border-amber-900/60 dark:bg-amber-950/20"
                        : "border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0c1f3d]"
                    }`}
                  >
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold ${
                            alert.severity === "critical"
                              ? "bg-red-500 text-white"
                              : alert.severity === "high"
                              ? "bg-amber-500 text-white"
                              : "bg-blue-500 text-white"
                          }`}
                        >
                          <ShieldAlert size={18} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900 dark:text-white">
                              {alert.childName}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">({alert.parentEmail})</span>
                            <span className="rounded-full bg-slate-200/80 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                              {alert.timestamp}
                            </span>
                          </div>
                          <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
                            {alert.type}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:self-center">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                            alert.status === "Resolved"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                              : alert.status === "Acknowledged"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
                              : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"
                          }`}
                        >
                          {alert.status}
                        </span>

                        {alert.status === "Open" && (
                          <button
                            onClick={() => handleAlertAction(alert.id, "Acknowledged")}
                            className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 transition hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
                          >
                            Acknowledge
                          </button>
                        )}

                        {alert.status !== "Resolved" && (
                          <button
                            onClick={() => handleAlertAction(alert.id, "Resolved")}
                            className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-700"
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SYSTEM DIAGNOSTICS */}
          {activeTab === "diagnostics" && (
            <div className="grid gap-5 lg:grid-cols-2">
              <Card className="p-5">
                <CardHeader className="p-0 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Server size={18} className="text-purple-600" />
                      Infrastructure Health Check
                    </CardTitle>
                    <button
                      onClick={handleRunDiagnostic}
                      disabled={isSweeping}
                      className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      <RefreshCw size={14} className={isSweeping ? "animate-spin" : ""} />
                      Run Test
                    </button>
                  </div>
                </CardHeader>

                <div className="mt-2 space-y-2 rounded-xl bg-slate-900 p-4 font-mono text-xs text-emerald-400">
                  {diagnosticLogs.map((log, i) => (
                    <p key={i}>{log}</p>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Sliders size={18} className="text-indigo-600" />
                    Supabase & OpenAI Configuration
                  </CardTitle>
                </CardHeader>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/60">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Supabase Client Auth</p>
                      <p className="text-slate-500">Auto-refresh tokens enabled · Persistence Active</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      Connected
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/60">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">OpenAI GPT Integration</p>
                      <p className="text-slate-500">Model: gpt-4o-mini · Pediatric System Prompt Loaded</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      Active
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/60">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Prisma Schema Readiness</p>
                      <p className="text-slate-500">Models: User, ChildProfile, RiskAlert, AppUsage, Journal</p>
                    </div>
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      Configured
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Add User Modal Dialog */}
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
              <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-[#0c1f3d]">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                    Add New Platform User
                  </h3>
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleAddUser} className="mt-4 space-y-3.5">
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Full Name
                    </span>
                    <input
                      required
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. Dr. Sarah Jenkins"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-slate-700 dark:bg-slate-800/80 dark:text-white"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Email Address
                    </span>
                    <input
                      required
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="user@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-slate-700 dark:bg-slate-800/80 dark:text-white"
                    />
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-200">
                        Assigned Role
                      </span>
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value as SystemUser["role"])}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200"
                      >
                        <option value="PARENT">PARENT</option>
                        <option value="DOCTOR">DOCTOR</option>
                        <option value="CHILD">CHILD</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-200">
                        Subscription Plan
                      </span>
                      <select
                        value={newSub}
                        onChange={(e) => setNewSub(e.target.value as SystemUser["subscription"])}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200"
                      >
                        <option value="Free">Free</option>
                        <option value="Premium">Premium</option>
                        <option value="Family">Family</option>
                      </select>
                    </label>
                  </div>

                  <div className="mt-6 flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-purple-700"
                    >
                      Save User Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </RoleGate>
  );
}
