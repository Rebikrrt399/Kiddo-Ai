import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AppUsageChart } from "@/components/dashboard/app-usage-chart";
import { appUsage } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export default function AppUsagePage() {
  return (
    <div>
      <Topbar title="App Usage Analytics" subtitle="Which apps are getting the most attention this week." />

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Usage Share</CardTitle>
          </CardHeader>
          <AppUsageChart />
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>By App</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {appUsage.map((app) => (
              <div key={app.app} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: app.color }} />
                  <span className="text-sm font-medium">{app.app}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted">{app.time}</span>
                  <Badge color={app.color}>{app.percentage}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>AI Summary</CardTitle>
          <Badge color="var(--secondary)">AI generated</Badge>
        </CardHeader>
        <ul className="space-y-2 text-sm text-muted">
          <li>• YouTube usage increased by 24% this week, mostly on weekend evenings.</li>
          <li>• Educational app usage (Google Classroom) increased by 18% compared to last week.</li>
          <li>• Social media time is concentrated between 4–7 PM on weekdays.</li>
        </ul>
      </Card>
    </div>
  );
}
