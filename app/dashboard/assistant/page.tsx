import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatPanel } from "@/components/dashboard/chat-panel";
import { Badge } from "@/components/ui/badge";

export default function AssistantPage() {
  return (
    <div>
      <Topbar title="AI Parent Assistant" subtitle="Ask about behaviour, get recommendations, generate reports." />
      <Card>
        <CardHeader>
          <CardTitle>Chat</CardTitle>
          <Badge color="var(--secondary)">Powered by OpenAI</Badge>
        </CardHeader>
        <ChatPanel
          endpoint="/api/assistant"
          assistantName="the assistant"
          placeholder="Ask about screen time, mood, or what to do next…"
          starterPrompts={[
            "Why has screen time increased?",
            "How can I improve sleep habits?",
            "Suggest activities for this weekend",
            "Generate this week's report",
          ]}
        />
      </Card>
    </div>
  );
}
