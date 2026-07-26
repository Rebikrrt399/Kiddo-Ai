"use client";

import { useState, useEffect } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { safeZones, locationTimeline } from "@/lib/mock-data";
import { MapPin, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LocationPage() {
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
      <Topbar
        title="Real-Time Location"
        subtitle="Live map requires a Google Maps API key — this view uses mock coordinates."
      />

      <div className={`transition-all duration-500 ${isLocked ? "blur-md pointer-events-none select-none opacity-40" : ""}`}>
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

      {/* Paywall Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-6 bg-slate-50/5 dark:bg-slate-950/10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0b192e] border border-slate-800 text-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center flex flex-col items-center"
          >
            <div className="h-14 w-14 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-5 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <MapPin size={28} />
            </div>
            
            <h3 className="text-xl font-heading font-extrabold text-white">Location Tracking is Locked</h3>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Real-time geofencing alerts, safe zone monitoring, and route history are only available on the **Premium** and **Family** plans.
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
