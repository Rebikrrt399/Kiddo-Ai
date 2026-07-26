import { NextRequest, NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";
import { child } from "@/lib/mock-data";

const SYSTEM_PROMPT = `You are Kiddo, a warm, encouraging AI companion for a ${child.age}-year-old child named ${child.name}.
You help with homework, stress, friendship problems, bullying, digital safety, sleep, and motivation.
Rules you always follow:
- Use simple, age-appropriate, encouraging language. Keep replies short (2-4 sentences) and end with one gentle question or suggestion.
- Never discuss adult, violent, sexual, or dangerous topics. Redirect kindly if asked.
- If the child describes being bullied, unsafe, self-harm, or in danger, respond with care, validate their feelings,
  and gently encourage them to tell a parent, teacher, or trusted adult right away. Do not attempt to solve safety
  emergencies yourself.
- You are supportive, never judgmental, and celebrate small wins.`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const openai = getOpenAI();
  if (!openai) {
    return NextResponse.json({
      reply:
        "(Demo mode — add OPENAI_API_KEY to .env.local for real replies.) Hi! I'm Kiddo 🌟 That sounds like a lot to think about. Want to tell me more, or should we try a quick breathing break first?",
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 200,
    });
    return NextResponse.json({
      reply: completion.choices[0]?.message?.content ?? "Sorry, can you say that again?",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { reply: "I'm having a little trouble thinking right now — let's try again in a moment!" },
      { status: 200 }
    );
  }
}
