import { NextRequest, NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";
import { mockDoctors, child, riskAlerts, moodJournal, weeklyScreenTime } from "@/lib/mock-data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { parentQuery, categoryFilter } = body as {
      parentQuery?: string;
      categoryFilter?: string;
    };

    const openai = getOpenAI();

    if (openai && parentQuery && parentQuery.trim().length > 0) {
      try {
        const prompt = `Child context:
Name: ${child.name}, Age: ${child.age}, Wellbeing Score: ${child.wellbeingScore}/100.
Active risk signals: ${riskAlerts.map((r) => r.title + " (" + r.detail + ")").join("; ")}.
Screen time trends: ${weeklyScreenTime.map((w) => w.day + ":" + w.hours + "h").join(", ")}.
Mood journal: ${moodJournal.map((m) => m.day + ":" + m.mood).join(", ")}.

Parent Concern / Query: "${parentQuery}"

Available Specialists:
${mockDoctors
  .map(
    (d) =>
      `ID: ${d.id} | Name: ${d.name} | Specialty: ${d.specialty} | Hospital: ${d.hospital} | Fees: ${d.fees}`
  )
  .join("\n")}

Task: Rank these specialists for this child's profile and the parent's concern.
Return JSON format:
{
  "recommendations": [
    {
      "id": "doc1",
      "matchScore": 98,
      "matchReason": "Detailed 2-sentence explanation customized to the child's data and parent query."
    }
  ]
}`;

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "You are KiddoAI's Clinical Matching System. Respond strictly in valid JSON.",
            },
            { role: "user", content: prompt },
          ],
          max_tokens: 500,
        });

        const parsed = JSON.parse(completion.choices[0]?.message?.content || "{}");
        if (parsed.recommendations && Array.isArray(parsed.recommendations)) {
          const merged = mockDoctors.map((doc) => {
            const aiRec = parsed.recommendations.find((r: { id: string }) => r.id === doc.id);
            if (aiRec) {
              return {
                ...doc,
                matchScore: aiRec.matchScore || doc.matchScore,
                matchReason: aiRec.matchReason || doc.matchReason,
              };
            }
            return doc;
          });

          merged.sort((a, b) => b.matchScore - a.matchScore);
          return NextResponse.json({
            suggestions: merged,
            source: "openai",
            queryProcessed: parentQuery,
          });
        }
      } catch (aiErr) {
        console.error("OpenAI matching error, falling back to heuristic engine:", aiErr);
      }
    }

    // Fallback rule-based smart diagnostic matching
    const suggestions = mockDoctors.map((doc) => {
      let score = doc.matchScore;
      let reason = doc.matchReason;

      if (categoryFilter && categoryFilter !== "all") {
        if (doc.category === categoryFilter) {
          score = Math.min(99, score + 5);
        } else {
          score = Math.max(70, score - 15);
        }
      }

      if (parentQuery) {
        const queryLower = parentQuery.toLowerCase();
        if (queryLower.includes("sleep") || queryLower.includes("night") || queryLower.includes("bed")) {
          if (doc.category === "sleep") {
            score = 99;
            reason = `Directly addresses your request about "${parentQuery}". Expert in late-night device curfews and pediatric sleep hygiene.`;
          }
        } else if (queryLower.includes("game") || queryLower.includes("gaming") || queryLower.includes("minecraft")) {
          if (doc.category === "adhd") {
            score = 98;
            reason = `Matches your focus on screen gaming: Specialized in impulse control and digital dopamine regulation.`;
          }
        } else if (queryLower.includes("anxious") || queryLower.includes("anxiety") || queryLower.includes("social")) {
          if (doc.category === "anxiety") {
            score = 99;
            reason = `Top specialist for digital anxiety and peer interactions, addressing your specific query.`;
          }
        }
      }

      return {
        ...doc,
        matchScore: score,
        matchReason: reason,
      };
    });

    suggestions.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      suggestions,
      source: "algorithmic",
      queryProcessed: parentQuery || "Default risk profile analysis",
    });
  } catch (error) {
    console.error("Error generating doctor suggestions:", error);
    return NextResponse.json({ error: "Failed to generate doctor suggestions" }, { status: 500 });
  }
}
