import { NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";
import { child, weeklyScreenTime, appUsage, moodJournal, riskAlerts, weeklyReport } from "@/lib/mock-data";

export async function GET() {
  const openai = getOpenAI();
  if (!openai) {
    return NextResponse.json({ summary: weeklyReport.summary, source: "mock" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are KiddoAI's Risk Engine. Given behavioural data, write a concise (under 80 words) weekly wellbeing summary for a parent: factual, calm, and actionable. No headers, just one short paragraph.",
        },
        {
          role: "user",
          content: `Child: ${child.name}, wellbeing score ${child.wellbeingScore}/100.
Screen time by day: ${JSON.stringify(weeklyScreenTime)}.
Top apps: ${JSON.stringify(appUsage.slice(0, 4))}.
Mood journal: ${JSON.stringify(moodJournal)}.
Risk alerts: ${JSON.stringify(riskAlerts)}.`,
        },
      ],
      max_tokens: 150,
    });
    return NextResponse.json({
      summary: completion.choices[0]?.message?.content ?? weeklyReport.summary,
      source: "openai",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ summary: weeklyReport.summary, source: "mock-fallback" });
  }
}
