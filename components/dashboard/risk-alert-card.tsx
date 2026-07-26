import { Badge } from "@/components/ui/badge";
import { riskColor, type RiskLevel } from "@/lib/mock-data";

export function RiskAlertCard({
  title,
  detail,
  level,
  confidence,
  suggestedAction,
  timestamp,
}: {
  title: string;
  detail: string;
  level: RiskLevel;
  confidence: number;
  suggestedAction: string;
  timestamp: string;
}) {
  const color = riskColor(level);
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">{title}</p>
        <Badge color={color}>{level}</Badge>
      </div>
      <p className="text-sm text-muted">{detail}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-muted">
        <span>Confidence: {confidence}%</span>
        <span>{timestamp}</span>
      </div>
      <div className="mt-3 rounded-lg bg-background/60 p-3 text-xs">
        <span className="font-medium text-foreground">Suggested action: </span>
        <span className="text-muted">{suggestedAction}</span>
      </div>
    </div>
  );
}
