import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScreenTimeChart } from "@/components/dashboard/screen-time-chart";
import { weeklyScreenTime } from "@/lib/mock-data";

const categories = [
  { key: "education", label: "Education", color: "var(--primary)" },
  { key: "social", label: "Social Media", color: "#EC4899" },
  { key: "gaming", label: "Gaming", color: "var(--accent)" },
  { key: "entertainment", label: "Entertainment", color: "var(--warning)" },
] as const;

export default function ScreenTimePage() {
  const totals = categories.map((c) => ({
    ...c,
    total: weeklyScreenTime.reduce((sum, d) => sum + d[c.key], 0),
  }));
  const grandTotal = totals.reduce((s, c) => s + c.total, 0);

  return (
    <div>
      <Topbar title="Screen Time Monitor" subtitle="Daily, weekly, and category breakdown of device usage." />

      <Card>
        <CardHeader>
          <CardTitle>Weekly Trend</CardTitle>
        </CardHeader>
        <ScreenTimeChart />
      </Card>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {totals.map((c) => (
              <div key={c.key}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{c.label}</span>
                  <span className="text-muted">{c.total.toFixed(1)}h</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-background">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(c.total / grandTotal) * 100}%`, backgroundColor: c.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Table</CardTitle>
          </CardHeader>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted">
                <th className="pb-2">Day</th>
                <th className="pb-2">Total</th>
                <th className="pb-2">Education</th>
                <th className="pb-2">Gaming</th>
              </tr>
            </thead>
            <tbody>
              {weeklyScreenTime.map((d) => (
                <tr key={d.day} className="border-t border-border">
                  <td className="py-2 font-medium">{d.day}</td>
                  <td className="py-2">{d.hours}h</td>
                  <td className="py-2 text-muted">{d.education}h</td>
                  <td className="py-2 text-muted">{d.gaming}h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
