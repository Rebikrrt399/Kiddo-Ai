import { NextResponse } from "next/server";
import { adminStats, mockSystemUsers, riskAlerts } from "@/lib/mock-data";

export async function GET() {
  try {
    const totalUsers = mockSystemUsers.length + adminStats.totalUsers;
    const activeUsers = mockSystemUsers.filter((u) => u.status === "Active").length;
    const suspendedUsers = mockSystemUsers.filter((u) => u.status === "Suspended").length;
    const flaggedUsers = mockSystemUsers.filter((u) => u.status === "Flagged").length;

    const statsData = {
      kpis: {
        totalUsers,
        activeUsers,
        suspendedUsers,
        flaggedUsers,
        childrenCount: adminStats.children,
        parentsCount: adminStats.parents,
        activeSubscriptions: adminStats.activeSubscriptions,
        monthlyRevenue: adminStats.monthlyRevenue,
        riskAlertsToday: adminStats.riskAlertsToday + riskAlerts.length,
        modelAccuracy: adminStats.modelAccuracy,
      },
      systemHealth: {
        serverStatus: "Operational",
        uptime: "99.98%",
        cpuUsage: "14%",
        memoryUsage: "1.2 GB / 4.0 GB",
        avgResponseTimeMs: 42,
        activeWebsockets: 1420,
        lastDiagnosticRun: new Date().toISOString(),
      },
      subscriptionBreakdown: {
        free: 4500,
        premium: 4860,
        family: 3120,
      },
    };

    return NextResponse.json(statsData);
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to load admin statistics" },
      { status: 500 }
    );
  }
}
