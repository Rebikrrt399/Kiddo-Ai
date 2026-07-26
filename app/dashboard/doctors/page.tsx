"use client";

import { useState } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  HeartPulse, Sparkles, Star, MapPin, Calendar, Video, 
  Check, X, FileText, ClipboardList, CheckCircle2, User, 
  ArrowRight, ShieldAlert 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  matchScore: number;
  matchReason: string;
  stars: number;
  reviews: number;
  hospital: string;
  fees: string;
  gradient: string;
}

const doctors: Doctor[] = [
  {
    id: "doc1",
    name: "Dr. Sarah Jenkins",
    specialty: "Child Psychologist · Digital Anxiety & Peer Isolation Specialist",
    matchScore: 98,
    matchReason: "Matches your child's recent TikTok screen fatigue and flagged communication logs indicating social anxiety or digital FOMO.",
    stars: 4.9,
    reviews: 142,
    hospital: "Pediatric Psychology Center, Suite 410",
    fees: "$150/session",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    id: "doc2",
    name: "Dr. David Chen",
    specialty: "Pediatric Neuropsychiatrist · ADHD & Gaming Addiction Expert",
    matchScore: 92,
    matchReason: "Matches your child's 38% rise in weekend high-alert screen sessions and late-night gaming trends.",
    stars: 4.8,
    reviews: 108,
    hospital: "Neuro-Developmental Health Group",
    fees: "$180/session",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    id: "doc3",
    name: "Dr. Elena Rostova",
    specialty: "Family Sleep Coach & Behavioral Pediatrician",
    matchScore: 85,
    matchReason: "Matches Aarav's late-night phone logs (screen activity past midnight on 5 of the last 7 nights).",
    stars: 4.7,
    reviews: 95,
    hospital: "Metropolitan Family Wellness & Sleep Clinic",
    fees: "$130/session",
    gradient: "from-teal-500 to-cyan-600"
  }
];

const mockPatients = [
  { id: "p1", name: "Aarav Sharma", age: 12, wellbeingScore: 74, activeAlerts: 2, topApp: "YouTube" },
  { id: "p2", name: "Leo Sinclair", age: 10, wellbeingScore: 88, activeAlerts: 0, topApp: "Minecraft" },
  { id: "p3", name: "Maya Patel", age: 14, wellbeingScore: 61, activeAlerts: 4, topApp: "Instagram" }
];

export default function DoctorsHubPage() {
  const [activeTab, setActiveTab] = useState<"parent" | "doctor">("parent");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  
  // Booking Form State
  const [bookingDate, setBookingDate] = useState("2026-07-28");
  const [bookingType, setBookingType] = useState("video");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Doctor Portal State
  const [selectedPatient, setSelectedPatient] = useState(mockPatients[0]);
  const [notes, setNotes] = useState(
    "Aarav is showing moderate signs of evening digital stress. Suggested curfew at 9:30 PM. Will evaluate response to offline transitions next week."
  );
  const [notesSaved, setNotesSaved] = useState(false);

  const handleSaveNotes = () => {
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/30 dark:bg-[#081225]/30">
      <Topbar 
        title="Pediatric Clinic Hub" 
        subtitle="Premium medical-level features. Match specialists based on behavioral signals, or login as a clinician." 
      />

      {/* Tabs Switcher */}
      <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl max-w-md mb-8">
        <button
          onClick={() => setActiveTab("parent")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === "parent"
              ? "bg-[#0f274a] text-white dark:bg-white dark:text-[#0f274a] shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
          }`}
        >
          <User className="h-4 w-4" />
          <span>Parent Portal (Find Doctors)</span>
        </button>
        <button
          onClick={() => setActiveTab("doctor")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === "doctor"
              ? "bg-[#0f274a] text-white dark:bg-white dark:text-[#0f274a] shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
          }`}
        >
          <HeartPulse className="h-4 w-4" />
          <span>Doctor Portal (Clinician View)</span>
        </button>
      </div>

      {activeTab === "parent" ? (
        /* PARENT PORTAL - DOCTOR RECOMMENDATION TOOL */
        <div>
          {/* AI Matching Diagnostic Card */}
          <Card className="border-blue-500/20 bg-blue-50/5 dark:bg-blue-950/10 p-6 rounded-2xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Sparkles className="h-5 w-5 text-blue-500" />
                <span className="font-heading text-sm font-bold uppercase tracking-wider">
                  AI Pediatric Matching Diagnostic
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 leading-relaxed">
                We have analyzed Aarav&apos;s digital signature this week (night screen curfew delays, digital exclusion FOMO indicators, and weekend screen usage spikes) to cross-reference clinicians specialized in childhood screen behavioral wellness.
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0 bg-white dark:bg-[#0f1f38] border border-slate-100 dark:border-slate-800/40 p-4 rounded-xl text-xs">
              <div className="flex justify-between items-center gap-6">
                <span className="text-slate-400 font-semibold">TARGET CHILD:</span>
                <span className="font-bold text-slate-800 dark:text-white">Aarav Sharma</span>
              </div>
              <div className="flex justify-between items-center gap-6">
                <span className="text-slate-400 font-semibold">PRIMARY CONCERN:</span>
                <span className="bg-red-500/10 text-red-500 px-2 py-0.5 rounded font-bold uppercase">Digital FOMO</span>
              </div>
              <div className="flex justify-between items-center gap-6">
                <span className="text-slate-400 font-semibold">MATCH STABILITY:</span>
                <span className="text-emerald-500 font-bold uppercase">Optimal (High)</span>
              </div>
            </div>
          </Card>

          {/* Recommended Doctors List */}
          <h3 className="font-heading text-lg font-bold text-[#0f274a] dark:text-white mb-6">
            Recommended Mental Health Specialists
          </h3>
          <div className="space-y-6">
            {doctors.map((doc) => (
              <Card 
                key={doc.id} 
                className="border-slate-100 dark:border-slate-800/40 bg-white dark:bg-[#0f1f38] p-6 rounded-2xl shadow-sm flex flex-col lg:flex-row justify-between gap-6 hover:border-slate-200 transition"
              >
                {/* Doctor Bio info */}
                <div className="flex-1 flex flex-col md:flex-row gap-5 items-start">
                  {/* Photo container mockup */}
                  <div className={`h-16 w-16 bg-gradient-to-br ${doc.gradient} rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md`}>
                    <HeartPulse className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-heading text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        {doc.name}
                      </h4>
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:bg-emerald-950/20 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">
                        {doc.matchScore}% Match
                      </Badge>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                      {doc.specialty}
                    </p>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-1 items-center mt-3 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">{doc.stars}</span>
                        <span>({doc.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{doc.hospital}</span>
                      </div>
                      <div className="font-bold text-slate-700 dark:text-slate-300">
                        {doc.fees}
                      </div>
                    </div>

                    {/* AI Match Explanation Box */}
                    <div className="mt-4 p-3 bg-blue-50/30 dark:bg-blue-900/10 rounded-xl border border-blue-50/50 dark:border-blue-900/30 flex items-start gap-2.5 text-xs text-blue-900 dark:text-blue-300 leading-relaxed">
                      <Sparkles className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
                      <div>
                        <span className="font-extrabold uppercase text-[10px] tracking-wider block text-blue-600 dark:text-blue-400 mb-0.5">
                          AI Match Insight
                        </span>
                        {doc.matchReason}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Call to Action */}
                <div className="flex lg:flex-col justify-end lg:justify-center items-end shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-50 dark:border-slate-800/40">
                  <button
                    onClick={() => setSelectedDoctor(doc)}
                    className="bg-[#0f274a] dark:bg-white text-white dark:text-[#0f274a] hover:opacity-90 px-6 py-3 rounded-xl text-xs font-bold transition flex items-center gap-2 active:scale-95 shadow-sm"
                  >
                    <span>Schedule Consult</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* DOCTOR PORTAL - CLINICIAN VIEW */
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Patient Selection sidebar list */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
              Active Cases
            </h3>
            {mockPatients.map((pat) => (
              <div
                key={pat.id}
                onClick={() => {
                  setSelectedPatient(pat);
                  setNotesSaved(false);
                  if (pat.id === "p1") {
                    setNotes("Aarav is showing moderate signs of evening digital stress. Suggested curfew at 9:30 PM. Will evaluate response to offline transitions next week.");
                  } else if (pat.id === "p2") {
                    setNotes("Leo shows excellent digital balance. Gaming levels are stable and homework completion times are optimal. Maintain standard bounds.");
                  } else {
                    setNotes("Maya has critical risk flags regarding social isolation. Screen usage exceeds 6 hours daily, mostly passive browsing. Recommending immediate offline structured intervention.");
                  }
                }}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                  selectedPatient.id === pat.id
                    ? "bg-[#0f274a] text-white dark:bg-white dark:text-[#0f274a] border-transparent"
                    : "bg-white dark:bg-[#0f1f38] border-slate-100 dark:border-slate-800/40 hover:bg-slate-50"
                }`}
              >
                <div>
                  <h4 className="font-bold text-sm leading-snug">{pat.name}</h4>
                  <p className={`text-[10px] ${selectedPatient.id === pat.id ? "text-blue-200 dark:text-slate-500" : "text-slate-400"}`}>
                    Age {pat.age} · Score: {pat.wellbeingScore}
                  </p>
                </div>
                
                {pat.activeAlerts > 0 ? (
                  <span className={`inline-flex h-6 px-2 items-center justify-center rounded-full text-[9px] font-bold ${
                    selectedPatient.id === pat.id 
                      ? "bg-red-500 text-white" 
                      : "bg-red-50 text-red-600 dark:bg-red-950/20"
                  }`}>
                    {pat.activeAlerts} Alerts
                  </span>
                ) : (
                  <span className="text-[10px] text-emerald-500 font-bold uppercase">Clear</span>
                )}
              </div>
            ))}
          </div>

          {/* Patient details & Clinician Notes panel */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="border-slate-100 dark:border-slate-800/40 bg-white dark:bg-[#0f1f38] p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800/45 pb-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white leading-none">
                    Case Dashboard: {selectedPatient.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2">
                    Monitoring device: Aarav&apos;s iPhone 13 · Connected via Kiddo Link API
                  </p>
                </div>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                  Case ID #PED-820{selectedPatient.id === "p1" ? "1" : selectedPatient.id === "p2" ? "2" : "3"}
                </Badge>
              </div>

              {/* Patient Core metrics breakdown */}
              <div className="grid grid-cols-3 gap-4 my-6 text-center">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Wellbeing Score</span>
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 block">{selectedPatient.wellbeingScore}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Risk Alarms</span>
                  <span className="text-2xl font-extrabold text-red-500 mt-1 block">{selectedPatient.activeAlerts}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Top Feed App</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-2 block truncate">{selectedPatient.topApp}</span>
                </div>
              </div>

              {/* Clinician Case Advisor Form */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-4.5 w-4.5 text-blue-500" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Clinician Care Advice & Notes
                  </span>
                </div>
                
                <textarea
                  rows={5}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter medical recommendations, app guidelines, or parental advice guidelines..."
                  className="w-full border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/50 p-4 rounded-xl text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 leading-relaxed font-normal"
                />

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Saved notes will be immediately broadcasted to the parent&apos;s AI Assistant.
                  </span>
                  <button
                    onClick={handleSaveNotes}
                    className="bg-[#0f274a] dark:bg-white text-white dark:text-[#0f274a] hover:opacity-90 px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 active:scale-95 shadow-sm"
                  >
                    {notesSaved ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-500" />
                        <span className="text-emerald-500">Saved to Chart</span>
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4" />
                        <span>Save Case Note</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Appointment Booking Modal */}
      <AnimatePresence>
        {selectedDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#0f1f38] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-50 dark:border-slate-800/60">
                <h4 className="font-heading text-lg font-bold text-slate-900 dark:text-white leading-none">
                  Book Consultation
                </h4>
                <button 
                  onClick={() => {
                    setSelectedDoctor(null);
                    setBookingConfirmed(false);
                  }}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-950 p-2 rounded-full transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {!bookingConfirmed ? (
                /* STEP 1: FORM */
                <div className="mt-5 space-y-4">
                  {/* Selected Doctor Summary */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600">
                      <HeartPulse className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{selectedDoctor.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{selectedDoctor.specialty}</p>
                    </div>
                  </div>

                  {/* Date Input */}
                  <div>
                    <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1.5">
                      Select Consultation Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input 
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full border border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 pl-10 pr-4 py-2.5 text-sm rounded-xl text-slate-800 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Consultation Type Radio Buttons */}
                  <div>
                    <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1.5">
                      Consultation Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setBookingType("video")}
                        className={`p-3 border rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition ${
                          bookingType === "video"
                            ? "border-blue-500 bg-blue-500/10 text-blue-600"
                            : "border-slate-100 dark:border-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                        }`}
                      >
                        <Video className="h-4 w-4" />
                        <span>Video Consult</span>
                      </button>
                      <button
                        onClick={() => setBookingType("inperson")}
                        className={`p-3 border rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition ${
                          bookingType === "inperson"
                            ? "border-blue-500 bg-blue-500/10 text-blue-600"
                            : "border-slate-100 dark:border-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                        }`}
                      >
                        <MapPin className="h-4 w-4" />
                        <span>In-Person Clinic</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setBookingConfirmed(true)}
                    className="w-full bg-[#0f274a] dark:bg-white text-white dark:text-[#0f274a] hover:opacity-90 py-3.5 rounded-xl text-xs font-bold transition active:scale-95 shadow-md mt-6"
                  >
                    Confirm Booking Consultation
                  </button>
                </div>
              ) : (
                /* STEP 2: CONFIRMATION SUCCESS */
                <div className="mt-8 flex flex-col items-center text-center p-4">
                  <div className="h-16 w-16 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-full flex items-center justify-center shadow-lg border border-emerald-500/10 mb-5 animate-pulse">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                    Consultation Requested!
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 leading-relaxed">
                    We have sent Aarav&apos;s digital wellbeing report logs directly to <span className="font-bold text-slate-800 dark:text-white">{selectedDoctor.name}</span>. The clinic coordinator will contact you shortly to confirm the slot.
                  </p>

                  <button
                    onClick={() => {
                      setSelectedDoctor(null);
                      setBookingConfirmed(false);
                    }}
                    className="w-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 py-3 rounded-xl text-xs font-bold transition hover:bg-slate-50 mt-8"
                  >
                    Close Portal
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
