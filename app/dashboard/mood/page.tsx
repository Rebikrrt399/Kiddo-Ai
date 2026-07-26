import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MoodChart } from "@/components/dashboard/mood-chart";
import { moodJournal } from "@/lib/mock-data";

export default function MoodPage() {
  return (
    <div>
      <Topbar title="Mood Journal" subtitle="Daily emoji check-ins and the AI's read on the trend." />

      <Card>
        <CardHeader>
          <CardTitle>7-Day Mood Trend</CardTitle>
        </CardHeader>
        <MoodChart />
      </Card>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Daily Check-ins</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-7 gap-2 text-center">
          {moodJournal.map((m) => (
            <div key={m.day} className="rounded-xl border border-border p-3">
              <p className="text-2xl">{m.mood}</p>
              <p className="mt-1 text-xs text-muted">{m.day}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          <span className="font-medium text-foreground">AI note: </span>
          Wednesday and Sunday showed lower moods, both following late-night device use. Consider a
          low-key evening routine on school nights.
        </p>
      </Card>
    </div>
  );
}
