import { NextRequest, NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";
import { child, weeklyScreenTime, riskAlerts, moodJournal } from "@/lib/mock-data";

const SYSTEM_PROMPT = `You are the KiddoAI Parent Assistant, embedded in a family digital-wellbeing dashboard.
You help a parent understand their child's device usage, mood, and risk signals, and give calm,
practical, non-alarmist parenting guidance. Keep replies concise (under 150 words), warm, and specific
to the data provided. Never diagnose medical or mental health conditions — suggest professional support
for anything serious. Use the child's context below when relevant.

Child: ${child.name}, age ${child.age}. Wellbeing score: ${child.wellbeingScore}/100 (${child.wellbeingTrend >= 0 ? "+" : ""}${child.wellbeingTrend} vs last week).
This week's screen time (hrs/day): ${weeklyScreenTime.map((d) => `${d.day}: ${d.hours}`).join(", ")}.
Mood journal this week: ${moodJournal.map((m) => `${m.day}: ${m.mood}`).join(", ")}.
Active risk alerts: ${riskAlerts.map((r) => `${r.title} (${r.level}, ${r.confidence}% confidence)`).join("; ")}.`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const openai = getOpenAI();
  if (!openai) {
    return NextResponse.json({
      reply:
        "(Demo mode — add OPENAI_API_KEY to .env.local for real AI replies.) Based on this week's data, screen time rose on weekends and one late-night pattern needs attention. I'd suggest a calm chat about bedtime device habits tonight.",
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 300,
    });
    return NextResponse.json({
      reply: completion.choices[0]?.message?.content ?? "I couldn't generate a reply — please try again.",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { reply: "The AI service is temporarily unavailable. Please try again shortly." },
      { status: 200 }
    );
  }
}
