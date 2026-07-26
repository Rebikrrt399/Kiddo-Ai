"use client";

import { useState, useEffect } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatPanel } from "@/components/dashboard/chat-panel";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AssistantPage() {
  const [subscription, setSubscription] = useState<string>("Premium");
  const [isUpgrading, setIsUpgrading] = useState(false);

  useEffect(() => {
    const sub = localStorage.getItem("kiddoai_subscription");
    if (sub) {
      setSubscription(sub);
    }
  }, []);

  const handleUpgrade = () => {
    setIsUpgrading(true);
    setTimeout(() => {
      setIsUpgrading(false);
      setSubscription("Premium");
      localStorage.setItem("kiddoai_subscription", "Premium");
      window.location.reload();
    }, 1500);
  };

  const isLocked = subscription === "Free";

  return (
    <div className="relative min-h-[75vh]">
      <Topbar title="AI Parent Assistant" subtitle="Ask about behaviour, get recommendations, generate reports." />

      <div className={`transition-all duration-500 ${isLocked ? "blur-md pointer-events-none select-none opacity-40" : ""}`}>
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

      {/* Paywall Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-6 bg-slate-50/5 dark:bg-slate-950/10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0b192e] border border-slate-800 text-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center flex flex-col items-center"
          >
            <div className="h-14 w-14 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-5 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <MessageSquare size={28} />
            </div>
            
            <h3 className="text-xl font-heading font-extrabold text-white">AI Assistant is Locked</h3>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Interacting with the AI Parent Coach, asking custom behavior questions, and generating parenting response scripts are only available on the **Premium** and **Family** plans.
            </p>

            <div className="w-full mt-6 space-y-3">
              <button
                onClick={handleUpgrade}
                disabled={isUpgrading}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:text-slate-300 font-semibold py-3.5 px-4 rounded-xl text-sm transition active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              >
                {isUpgrading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Unlocking...</span>
                  </>
                ) : (
                  <span>Upgrade to Premium ($9/mo)</span>
                )}
              </button>
              <p className="text-[10px] text-slate-500">Instant unlock · Cancel anytime</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
