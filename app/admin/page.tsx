import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { adminStats } from "@/lib/mock-data";
import Link from "next/link";
import { Users, Baby, CreditCard, ShieldAlert, Cpu, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Users", value: adminStats.totalUsers.toLocaleString(), icon: Users },
  { label: "Children", value: adminStats.children.toLocaleString(), icon: Baby },
  { label: "Active Subscriptions", value: adminStats.activeSubscriptions.toLocaleString(), icon: CreditCard },
  { label: "Monthly Revenue", value: `$${adminStats.monthlyRevenue.toLocaleString()}`, icon: TrendingUp },
  { label: "Risk Alerts Today", value: adminStats.riskAlertsToday, icon: ShieldAlert },
  { label: "AI Model Accuracy", value: `${adminStats.modelAccuracy}%`, icon: Cpu },
];

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/" className="font-heading text-lg font-semibold">
            KiddoAI Admin
          </Link>
          <p className="text-sm text-muted">Platform-wide statistics and system health.</p>
        </div>
        <ThemeToggle />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted">{label}</p>
                <p className="mt-1 font-heading text-2xl font-semibold">{value}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon size={18} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <p className="text-sm text-muted">
            Full CRUD tooling (search, suspend, role changes, subscription overrides) is stubbed here —
            wire to Prisma once Postgres is provisioned (see <code>prisma/schema.prisma</code>).
          </p>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Doctor Access (Future)</CardTitle>
          </CardHeader>
          <p className="text-sm text-muted">
            Doctor login, patient lists, and exportable wellbeing reports are planned but out of scope
            for this MVP pass.
          </p>
        </Card>
      </div>
    </div>
  );
}
