import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { safeZones, locationTimeline } from "@/lib/mock-data";
import { MapPin } from "lucide-react";

export default function LocationPage() {
  return (
    <div>
      <Topbar
        title="Real-Time Location"
        subtitle="Live map requires a Google Maps API key — this view uses mock coordinates."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Live Map (stub)</CardTitle>
          </CardHeader>
          <div className="flex h-80 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background/40 text-muted">
            <MapPin size={28} />
            <p className="text-sm">Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to render the live map here.</p>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Safe Zones</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {safeZones.map((z) => (
              <div key={z.name} className="rounded-lg border border-border p-3">
                <p className="text-sm font-medium">{z.name}</p>
                <p className="text-xs text-muted">{z.status} · {z.lastEvent}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Today&apos;s Travel Timeline</CardTitle>
        </CardHeader>
        <ol className="relative ml-3 space-y-5 border-l border-border pl-5">
          {locationTimeline.map((t) => (
            <li key={t.time + t.event} className="relative">
              <span className="absolute -left-[27px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
              <p className="text-sm font-medium">{t.event}</p>
              <p className="text-xs text-muted">{t.time} · {t.place}</p>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
