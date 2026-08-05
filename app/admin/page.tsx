"use client";

import { useState, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { SystemUser } from "@/lib/mock-data";
import Link from "next/link";
import {
  Users,
  Baby,
  CreditCard,
  ShieldAlert,
  Cpu,
  TrendingUp,
  Search,
  RefreshCw,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  HeartPulse,
} from "lucide-react";

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

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isSweeping, setIsSweeping] = useState(false);
  const [sweepMessage, setSweepMessage] = useState<string | null>(null);
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);

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
        await fetchStats();
      }
    } catch (err) {
      console.error("Failed to run diagnostic:", err);
    } finally {
      setIsSweeping(false);
    }
  };

  const kpis = stats?.kpis;
  const sysHealth = stats?.systemHealth;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-5 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <Link href="/" className="font-heading text-xl font-bold text-slate-900 dark:text-white hover:opacity-80 transition">
              KiddoAI Backend Admin
            </Link>
            <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Control Panel
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time backend API telemetry, user management, and AI risk engines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunDiagnostic}
            disabled={isSweeping}
            className="bg-[#0f274a] dark:bg-white text-white dark:text-[#0f274a] hover:opacity-90 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSweeping ? "animate-spin" : ""}`} />
            <span>{isSweeping ? "Sweeping Nodes..." : "AI Diagnostic Sweep"}</span>
          </button>
          <ThemeToggle />
        </div>
      </div>

      {sweepMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="h-4 w-4 shrink-0" />
          <span>{sweepMessage}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card className="p-4 bg-white dark:bg-[#0f1f38] border-slate-100 dark:border-slate-800/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Users</p>
              <p className="mt-1 font-heading text-xl font-extrabold text-slate-900 dark:text-white">
                {kpis ? kpis.totalUsers.toLocaleString() : "..."}
              </p>
            </div>
            <div className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#0f1f38] border-slate-100 dark:border-slate-800/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Children Monitored</p>
              <p className="mt-1 font-heading text-xl font-extrabold text-slate-900 dark:text-white">
                {kpis ? kpis.childrenCount.toLocaleString() : "..."}
              </p>
            </div>
            <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Baby size={18} />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#0f1f38] border-slate-100 dark:border-slate-800/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Subscriptions</p>
              <p className="mt-1 font-heading text-xl font-extrabold text-slate-900 dark:text-white">
                {kpis ? kpis.activeSubscriptions.toLocaleString() : "..."}
              </p>
            </div>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CreditCard size={18} />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#0f1f38] border-slate-100 dark:border-slate-800/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Monthly Revenue</p>
              <p className="mt-1 font-heading text-xl font-extrabold text-slate-900 dark:text-white">
                {kpis ? `$${kpis.monthlyRevenue.toLocaleString()}` : "..."}
              </p>
            </div>
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <TrendingUp size={18} />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#0f1f38] border-slate-100 dark:border-slate-800/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Risk Alerts Today</p>
              <p className="mt-1 font-heading text-xl font-extrabold text-red-500">
                {kpis ? kpis.riskAlertsToday : "..."}
              </p>
            </div>
            <div className="h-9 w-9 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
              <ShieldAlert size={18} />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#0f1f38] border-slate-100 dark:border-slate-800/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">AI Model Accuracy</p>
              <p className="mt-1 font-heading text-xl font-extrabold text-teal-500">
                {kpis ? `${kpis.modelAccuracy}%` : "..."}
              </p>
            </div>
            <div className="h-9 w-9 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center">
              <Cpu size={18} />
            </div>
          </div>
        </Card>
      </div>

      {/* System Telemetry & Quick Navigation */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* System Health */}
        <Card className="p-6 bg-white dark:bg-[#0f1f38] border-slate-100 dark:border-slate-800/40 space-y-4">
          <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" />
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                System Telemetry
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              {sysHealth ? sysHealth.serverStatus : "Online"}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
              <span>Uptime SLA</span>
              <span className="font-bold text-slate-900 dark:text-white">{sysHealth?.uptime || "99.98%"}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
              <span>CPU Load</span>
              <span className="font-bold text-slate-900 dark:text-white">{sysHealth?.cpuUsage || "14%"}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
              <span>Memory Footprint</span>
              <span className="font-bold text-slate-900 dark:text-white">{sysHealth?.memoryUsage || "1.2 GB"}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
              <span>API Response Latency</span>
              <span className="font-bold text-emerald-500">{sysHealth?.avgResponseTimeMs || 42} ms</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
              <span>Active WebSocket Sockets</span>
              <span className="font-bold text-slate-900 dark:text-white">{sysHealth?.activeWebsockets || 1420}</span>
            </div>
          </div>
        </Card>

        {/* Doctor Hub Quick Access */}
        <Card className="p-6 bg-white dark:bg-[#0f1f38] border-slate-100 dark:border-slate-800/40 space-y-4 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <HeartPulse className="h-4 w-4 text-purple-500" />
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Doctor Suggestion Engine & Clinician Portal
                </h3>
              </div>
              <span className="text-[10px] text-purple-500 font-bold bg-purple-500/10 px-2 py-0.5 rounded">
                Backend Integrated
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
              The Doctor Suggestion backend API (<code className="text-blue-500">/api/doctors/suggestions</code>) cross-references child screen time anomalies, late-night sleep disruptions, and mood logs to dynamically rank specialized child psychologists and pediatricians.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Link
              href="/dashboard/doctors"
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2"
            >
              <HeartPulse className="h-4 w-4" />
              <span>Launch Pediatric Clinic Hub</span>
            </Link>
            <Link
              href="/dashboard"
              className="border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-4 py-2.5 rounded-xl text-xs font-bold transition"
            >
              View Parent Dashboard
            </Link>
          </div>
        </Card>
      </div>

      {/* User Management Section */}
      <Card className="p-6 bg-white dark:bg-[#0f1f38] border-slate-100 dark:border-slate-800/40 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 dark:border-slate-800">
          <div>
            <CardTitle className="text-lg font-heading font-bold text-slate-900 dark:text-white">
              Backend User Management
            </CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Search, suspend, toggle roles, or override subscription plans via REST APIs.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search user, email, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 pl-9 pr-3 py-1.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-slate-800 dark:text-white"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
            >
              <option value="ALL">All Roles</option>
              <option value="PARENT">Parents</option>
              <option value="CHILD">Children</option>
              <option value="DOCTOR">Doctors</option>
              <option value="ADMIN">Admins</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Flagged">Flagged</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3 px-3">User</th>
                <th className="pb-3 px-3">Role</th>
                <th className="pb-3 px-3">Subscription</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3">Last Active</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Loading users from backend...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No users matching criteria.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                    <td className="py-3 px-3">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{u.name}</p>
                        <p className="text-[10px] text-slate-400">{u.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-semibold">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.role === "ADMIN" ? "bg-purple-500/10 text-purple-600" :
                        u.role === "DOCTOR" ? "bg-teal-500/10 text-teal-600" :
                        u.role === "PARENT" ? "bg-blue-500/10 text-blue-600" :
                        "bg-emerald-500/10 text-emerald-600"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={u.subscription}
                        disabled={updatingUser === u.id}
                        onChange={(e) => handleUpdateSubscription(u.id, e.target.value as SystemUser["subscription"])}
                        className="bg-slate-100 dark:bg-slate-800 border-none px-2 py-1 rounded text-[11px] font-semibold text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Free">Free</option>
                        <option value="Premium">Premium</option>
                        <option value="Family">Family</option>
                      </select>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.status === "Active" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                        u.status === "Flagged" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                        "bg-red-500/10 text-red-600 dark:text-red-400"
                      }`}>
                        {u.status === "Active" && <CheckCircle className="h-3 w-3" />}
                        {u.status === "Flagged" && <AlertTriangle className="h-3 w-3" />}
                        {u.status === "Suspended" && <XCircle className="h-3 w-3" />}
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400 text-[11px]">
                      {u.lastActive}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {u.status === "Active" ? (
                        <button
                          disabled={updatingUser === u.id}
                          onClick={() => handleUpdateStatus(u.id, "Suspended")}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 px-2.5 py-1 rounded text-[11px] font-bold transition"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          disabled={updatingUser === u.id}
                          onClick={() => handleUpdateStatus(u.id, "Active")}
                          className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded text-[11px] font-bold transition"
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
