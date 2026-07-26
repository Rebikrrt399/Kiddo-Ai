import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskAlertCard } from "@/components/dashboard/risk-alert-card";
import { riskAlerts } from "@/lib/mock-data";

export default function AlertsPage() {
  return (
    <div>
      <Topbar title="Risk Alerts" subtitle="Behavioural signals detected by the AI Risk Engine." />

      <Card>
        <CardHeader>
          <CardTitle>All Alerts</CardTitle>
        </CardHeader>
        <div className="grid gap-4 md:grid-cols-2">
          {riskAlerts.map((alert) => (
            <RiskAlertCard key={alert.id} {...alert} />
          ))}
        </div>
      </Card>
    </div>
  );
}
