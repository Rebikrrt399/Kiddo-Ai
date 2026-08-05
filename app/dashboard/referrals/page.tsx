"use client";

import { useState } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Gift, Copy, Check, Users, Award, 
  Send, Mail, MessageSquare 
} from "lucide-react";

const milestones = [
  { count: 1, label: "1 Month Free Premium", reached: true },
  { count: 3, label: "3 Months Free Premium", reached: true },
  { count: 5, label: "1 Year Family Upgrade", reached: false, current: true },
  { count: 10, label: "Lifetime VIP Access", reached: false }
];

const referralLog = [
  { id: "ref1", email: "priya.nair@email.com", date: "July 12, 2026", status: "Subscribed", reward: "3 Months Premium Unlocked" },
  { id: "ref2", email: "vikram.malhotra@email.com", date: "July 18, 2026", status: "Subscribed", reward: "Milestone Tier Unlocked" },
  { id: "ref3", email: "amit.k@email.com", date: "July 24, 2026", status: "Signed Up", reward: "Pending Subscription" },
  { id: "ref4", email: "sara.sharma@email.com", date: "July 25, 2026", status: "Invited", reward: "Waiting for Signup" }
];

export default function ReferralHubPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://kiddoai.com/invite?code=AARAV-4F2K";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/30 dark:bg-[#081225]/30">
      <Topbar 
        title="Referral Rewards Hub" 
        subtitle="Invite fellow parents to KiddoAI. Secure premium dashboard upgrades and consultation credits." 
      />

      {/* Grid containing Quick Copy card and statistics summaries */}
      <div className="grid gap-6 lg:grid-cols-12 mb-8">
        {/* Left Side: Share Link Card */}
        <Card className="lg:col-span-7 border-slate-100 dark:border-slate-800/40 bg-white dark:bg-[#0f1f38] p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Gift className="h-5 w-5 fill-current/10 animate-bounce" />
              <h4 className="font-heading text-sm font-bold uppercase tracking-wider">
                Share the Gift of Parenting Insight
              </h4>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 leading-relaxed">
              When friends sign up using your link, they get <span className="font-bold text-slate-800 dark:text-white">30 days of Premium free</span>. Once their trial converts, you unlock premium milestones!
            </p>
          </div>

          {/* Copy Bar */}
          <div className="mt-6">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
              Your Unique Referral URL
            </label>
            <div className="flex gap-2">
              <div className="flex-1 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/60 rounded-xl px-4 py-3 text-slate-600 dark:text-slate-300 text-sm font-mono truncate select-all">
                {referralLink}
              </div>
              <button 
                onClick={handleCopy}
                className="bg-[#0f274a] dark:bg-white text-white dark:text-[#0f274a] px-4 rounded-xl flex items-center justify-center gap-1.5 font-semibold text-sm active:scale-95 transition"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-emerald-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Share links */}
          <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800/40 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">QUICK SHARE OPTIONS:</span>
            <div className="flex gap-3">
              <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-500 hover:text-white transition text-slate-600 dark:text-slate-300">
                <Send className="h-4.5 w-4.5" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white transition text-slate-600 dark:text-slate-300">
                <MessageSquare className="h-4.5 w-4.5" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-red-500 hover:text-white transition text-slate-600 dark:text-slate-300">
                <Mail className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </Card>

        {/* Right Side: Stats Panel */}
        <div className="lg:col-span-5 grid gap-4 grid-cols-2 lg:grid-cols-1">
          {/* Card 1 */}
          <Card className="border-slate-100 dark:border-slate-800/40 bg-white dark:bg-[#0f1f38] p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                Total Referred
              </span>
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 block">
                4 Parents
              </span>
              <span className="text-xs text-slate-500 mt-2 block">
                2 registered trials, 2 active
              </span>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3.5 rounded-2xl text-blue-600 dark:text-blue-400">
              <Users className="h-6 w-6" />
            </div>
          </Card>

          {/* Card 2 */}
          <Card className="border-slate-100 dark:border-slate-800/40 bg-white dark:bg-[#0f1f38] p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                Milestone Level
              </span>
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 block">
                Level 2
              </span>
              <span className="text-xs text-emerald-500 font-semibold mt-2 block">
                3 Months Premium Unlocked
              </span>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3.5 rounded-2xl text-emerald-600 dark:text-emerald-400">
              <Award className="h-6 w-6" />
            </div>
          </Card>
        </div>
      </div>

      {/* Rewards Milestones Line */}
      <Card className="border-slate-100 dark:border-slate-800/40 bg-white dark:bg-[#0f1f38] p-6 rounded-2xl mb-8">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
            Premium Rewards Progression
          </CardTitle>
        </CardHeader>
        
        {/* Visual Line */}
        <div className="relative mt-8 mb-6 px-4">
          <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full" />
          <div className="absolute top-0 left-4 h-2 bg-emerald-500 rounded-full transition-all duration-500" style={{ width: "60%" }} />

          <div className="flex justify-between items-center absolute -top-3 w-full left-0 px-4">
            {milestones.map((m, idx) => (
              <div key={idx} className="flex flex-col items-center relative">
                {/* Node circle */}
                <div className={`h-8 w-8 rounded-full border-4 flex items-center justify-center text-xs font-extrabold z-10 transition ${
                  m.reached 
                    ? "bg-emerald-500 border-white dark:border-[#0f1f38] text-white shadow-sm"
                    : m.current
                      ? "bg-white dark:bg-[#0f1f38] border-emerald-500 text-emerald-600 animate-pulse"
                      : "bg-white dark:bg-[#0f1f38] border-slate-200 dark:border-slate-800 text-slate-400"
                }`}>
                  {m.count}
                </div>
                {/* Node detail block */}
                <div className="mt-3 text-center whitespace-nowrap">
                  <span className={`text-[10px] font-bold block ${
                    m.reached 
                      ? "text-emerald-600 dark:text-emerald-400"
                      : m.current
                        ? "text-slate-800 dark:text-white"
                        : "text-slate-400"
                  }`}>
                    {m.label}
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">
                    {m.reached ? "Unlocked!" : m.current ? "2 more needed" : `${m.count} referrals`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Referrals Activity log table */}
      <Card className="border-slate-100 dark:border-slate-800/40 bg-white dark:bg-[#0f1f38] overflow-hidden rounded-2xl shadow-sm">
        <CardHeader className="p-6 border-b border-slate-50 dark:border-slate-800/40 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
            Invited Contacts
          </CardTitle>
          <span className="text-xs text-slate-500">Updates live every 24 hours</span>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800/60 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4 pl-6">Contact Email</th>
                <th className="p-4">Invite Date</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 pr-6 text-right">Premium Reward</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/40">
              {referralLog.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition">
                  <td className="p-4 pl-6 font-semibold text-slate-800 dark:text-slate-200">
                    {log.email}
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">
                    {log.date}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      log.status === "Subscribed"
                        ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-950/20"
                        : log.status === "Signed Up"
                          ? "bg-blue-500/10 text-blue-600 dark:bg-blue-950/20"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right text-slate-700 dark:text-slate-300 font-medium">
                    {log.reward}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
