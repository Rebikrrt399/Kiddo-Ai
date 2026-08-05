"use client";

import { useState, useEffect } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HeartPulse,
  Sparkles,
  Star,
  MapPin,
  Calendar,
  Video,
  Check,
  X,
  FileText,
  ClipboardList,
  CheckCircle2,
  User,
  ArrowRight,
  Loader2,
  Search,
  RefreshCw,
  Send,
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
  availableSlots?: string[];
}

const mockPatients = [
  { id: "child_01", name: "Aarav Sharma", age: 12, wellbeingScore: 74, activeAlerts: 2, topApp: "YouTube" },
  { id: "p2", name: "Leo Sinclair", age: 10, wellbeingScore: 88, activeAlerts: 0, topApp: "Minecraft" },
  { id: "p3", name: "Maya Patel", age: 14, wellbeingScore: 61, activeAlerts: 4, topApp: "Instagram" },
];

export default function DoctorsHubPage() {
  const [activeTab, setActiveTab] = useState<"parent" | "doctor">("parent");
  const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [subscription, setSubscription] = useState<string>("Premium");
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [parentQuery, setParentQuery] = useState("");
  const [isMatching, setIsMatching] = useState(false);
  const [matchSource, setMatchSource] = useState<string>("");

  // Booking Form State
  const [bookingDate, setBookingDate] = useState("2026-08-10");
  const [bookingType, setBookingType] = useState<"video" | "inperson">("video");
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");

  // Doctor Portal State
  const [selectedPatient, setSelectedPatient] = useState(mockPatients[0]);
  const [notes, setNotes] = useState("");
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);

  useEffect(() => {
    const sub = localStorage.getItem("kiddoai_subscription");
    if (sub) {
      setSubscription(sub);
    }
  }, []);

  const fetchSuggestions = async (query = "") => {
    setIsMatching(true);
    try {
      const res = await fetch("/api/doctors/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parentQuery: query }),
      });
      if (res.ok) {
        const data = await res.json();
        setDoctorsList(data.suggestions || []);
        setMatchSource(data.source || "backend");
      }
    } catch (err) {
      console.error("Failed to fetch doctor suggestions:", err);
    } finally {
      setIsMatching(false);
    }
  };

  const fetchPatientNotes = async (childId: string) => {
    setIsLoadingNotes(true);
    try {
      const res = await fetch(`/api/doctors/notes?childId=${childId}`);
      if (res.ok) {
        const data = await res.json();
        setNotes(data.note?.note || "");
      }
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    } finally {
      setIsLoadingNotes(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  useEffect(() => {
    if (activeTab === "doctor") {
      fetchPatientNotes(selectedPatient.id);
    }
  }, [activeTab, selectedPatient]);

  const handleUpgrade = () => {
    setIsUpgrading(true);
    setTimeout(() => {
      setIsUpgrading(false);
      setSubscription("Family");
      localStorage.setItem("kiddoai_subscription", "Family");
      window.location.reload();
    }, 1500);
  };

  const handleAIMatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSuggestions(parentQuery);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDoctor) return;
    setIsSubmittingBooking(true);
    try {
      const res = await fetch("/api/doctors/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          bookingDate,
          bookingType,
          childId: selectedPatient.id,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setBookingMessage(data.message || "Consultation requested successfully!");
        setBookingConfirmed(true);
      }
    } catch (err) {
      console.error("Failed to book consultation:", err);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    try {
      const res = await fetch("/api/doctors/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childId: selectedPatient.id,
          childName: selectedPatient.name,
          doctorName: "Dr. Sarah Jenkins",
          note: notes,
        }),
      });
      if (res.ok) {
        setNotesSaved(true);
        setTimeout(() => setNotesSaved(false), 2500);
      }
    } catch (err) {
      console.error("Failed to save notes:", err);
    } finally {
      setIsSavingNotes(false);
    }
  };

  const isLocked = subscription !== "Family";

  return (
    <div className="relative min-h-[75vh]">
      <Topbar
        title="Pediatric Clinic Hub"
        subtitle="Premium medical-level features. Backend AI matches specialists based on behavioral risk signals, or login as a clinician."
      />

      <div className={isLocked ? "transition-all duration-500 blur-md pointer-events-none select-none opacity-40" : "transition-all duration-500"}>

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
        /* PARENT PORTAL - DOCTOR RECOMMENDATION ENGINE */
        <div>
          {/* AI Matching Diagnostic & Query Form */}
          <Card className="border-blue-500/20 bg-blue-50/5 dark:bg-blue-950/10 p-6 rounded-2xl mb-8 flex flex-col gap-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  <span className="font-heading text-sm font-bold uppercase tracking-wider">
                    AI Pediatric Matching Engine (Backend Powered)
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
                  Our backend AI cross-references Aarav&apos;s digital logs (night curfew delays, screen fatigue, social anxiety signals) to rank specialists. Describe specific concerns below to customize backend recommendations.
                </p>
              </div>

              <div className="flex flex-col gap-2 shrink-0 bg-white dark:bg-[#0f1f38] border border-slate-100 dark:border-slate-800/40 p-4 rounded-xl text-xs">
                <div className="flex justify-between items-center gap-6">
                  <span className="text-slate-400 font-semibold">TARGET CHILD:</span>
                  <span className="font-bold text-slate-800 dark:text-white">Aarav Sharma</span>
                </div>
                <div className="flex justify-between items-center gap-6">
                  <span className="text-slate-400 font-semibold">AI MATCH MODEL:</span>
                  <span className="text-blue-500 font-bold uppercase">
                    {matchSource === "openai" ? "GPT-4o Medical" : "Rule Engine"}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-6">
                  <span className="text-slate-400 font-semibold">MATCH STABILITY:</span>
                  <span className="text-emerald-500 font-bold uppercase">Optimal (High)</span>
                </div>
              </div>
            </div>

            {/* Custom Query Input */}
            <form onSubmit={handleAIMatchSubmit} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. 'My child refuses to sleep before midnight' or 'Experiencing gaming isolation'..."
                  value={parentQuery}
                  onChange={(e) => setParentQuery(e.target.value)}
                  className="w-full bg-white dark:bg-[#0f1f38] border border-slate-200 dark:border-slate-800 pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-800 dark:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={isMatching}
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 disabled:opacity-50"
              >
                {isMatching ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Run AI Match</span>
                  </>
                )}
              </button>
            </form>
          </Card>

          {/* Recommended Doctors List */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg font-bold text-[#0f274a] dark:text-white">
              Recommended Mental Health & Pediatric Specialists
            </h3>
            <span className="text-xs text-slate-400 font-semibold">
              Showing {doctorsList.length} AI-ranked doctors
            </span>
          </div>

          <div className="space-y-6">
            {isMatching ? (
              <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="text-sm font-semibold">Querying backend AI Doctor Suggestion engine...</p>
              </div>
            ) : (
              doctorsList.map((doc) => (
                <Card
                  key={doc.id}
                  className="border-slate-100 dark:border-slate-800/40 bg-white dark:bg-[#0f1f38] p-6 rounded-2xl shadow-sm flex flex-col lg:flex-row justify-between gap-6 hover:border-slate-200 transition"
                >
                  {/* Doctor Bio info */}
                  <div className="flex-1 flex flex-col md:flex-row gap-5 items-start">
                    <div className={`h-16 w-16 bg-gradient-to-br ${doc.gradient || "from-blue-500 to-indigo-600"} rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md`}>
                      <HeartPulse className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="font-heading text-lg font-bold text-slate-900 dark:text-white leading-tight">
                          {doc.name}
                        </h4>
                        <Badge className="bg-emerald-500/10 text-emerald-600 dark:bg-emerald-950/20 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">
                          {doc.matchScore}% AI Match
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
                            AI Diagnostic Insight
                          </span>
                          {doc.matchReason}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking Call to Action */}
                  <div className="flex lg:flex-col justify-end lg:justify-center items-end shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-50 dark:border-slate-800/40">
                    <button
                      onClick={() => {
                        setSelectedDoctor(doc);
                        setBookingConfirmed(false);
                      }}
                      className="bg-[#0f274a] dark:bg-white text-white dark:text-[#0f274a] hover:opacity-90 px-6 py-3 rounded-xl text-xs font-bold transition flex items-center gap-2 active:scale-95 shadow-sm"
                    >
                      <span>Schedule Consult</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      ) : (
        /* DOCTOR PORTAL - CLINICIAN VIEW */
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Patient Selection sidebar list */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
              Active Patient Cases
            </h3>
            {mockPatients.map((pat) => (
              <div
                key={pat.id}
                onClick={() => {
                  setSelectedPatient(pat);
                  setNotesSaved(false);
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
                    Connected via Kiddo Link Backend REST API
                  </p>
                </div>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                  Case ID #{selectedPatient.id.toUpperCase()}
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
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-4.5 w-4.5 text-blue-500" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Clinician Care Advice & Case Notes (Backend Persisted)
                    </span>
                  </div>
                  {isLoadingNotes && (
                    <span className="text-[10px] text-blue-500 flex items-center gap-1 font-semibold">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Loading backend notes...
                    </span>
                  )}
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
                    Saved notes will be immediately broadcasted via <code className="text-blue-500">/api/doctors/notes</code>.
                  </span>
                  <button
                    onClick={handleSaveNotes}
                    disabled={isSavingNotes}
                    className="bg-[#0f274a] dark:bg-white text-white dark:text-[#0f274a] hover:opacity-90 px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 active:scale-95 shadow-sm disabled:opacity-50"
                  >
                    {isSavingNotes ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : notesSaved ? (
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
                        type="button"
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
                        type="button"
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
                    onClick={handleConfirmBooking}
                    disabled={isSubmittingBooking}
                    className="w-full bg-[#0f274a] dark:bg-white text-white dark:text-[#0f274a] hover:opacity-90 py-3.5 rounded-xl text-xs font-bold transition active:scale-95 shadow-md mt-6 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmittingBooking ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Processing Backend Booking...</span>
                      </>
                    ) : (
                      <span>Confirm Booking Consultation</span>
                    )}
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
                    {bookingMessage || `We have sent Aarav's digital wellbeing report logs directly to ${selectedDoctor.name}.`}
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

      {/* Paywall Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-6 bg-slate-50/5 dark:bg-slate-950/10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0b192e] border border-slate-800 text-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center flex flex-col items-center"
          >
            <div className="h-14 w-14 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center mb-5 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <HeartPulse size={28} />
            </div>

            <h3 className="text-xl font-heading font-extrabold text-white">Doctor Clinic is Locked</h3>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Matching child psychologists, ADHD specialists, pediatric clinics, and exportable medical report exports are only available on the **Family** plan.
            </p>

            <div className="w-full mt-6 space-y-3">
              <button
                onClick={handleUpgrade}
                disabled={isUpgrading}
                className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 disabled:text-purple-300 font-semibold py-3.5 px-4 rounded-xl text-sm transition active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                {isUpgrading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Unlocking Clinic...</span>
                  </>
                ) : (
                  <span>Upgrade to Family ($19/mo)</span>
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
