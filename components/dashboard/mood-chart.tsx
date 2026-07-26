"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { moodJournal } from "@/lib/mock-data";

export function MoodChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={moodJournal} margin={{ left: -20, right: 10, top: 10 }}>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="day" stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis domain={[0, 5]} hide />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            fontSize: 13,
          }}
          formatter={(_value, _name, item) => [
            (item?.payload as { mood?: string })?.mood ?? "",
            "Mood",
          ]}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="var(--secondary)"
          strokeWidth={2.5}
          dot={{ r: 5, fill: "var(--secondary)" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
