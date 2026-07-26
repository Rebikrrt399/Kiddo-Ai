"use client";

import { useState } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Play, Clock, Star, Search, Sparkles, X, RotateCcw, 
  Volume2, Maximize, CheckCircle, BookOpen 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Mental Health", "Screen Time", "Social Media", "Emotional Support"];

const videoLessons = [
  {
    id: "v1",
    title: "Understanding Tweens & Digital FOMO",
    description: "Learn why kids feel excluded online and how to support them when they are left out of group chats.",
    category: "Mental Health",
    duration: "4 min",
    stars: 4.9,
    reviews: 142,
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    summary: [
      "Digital exclusion triggers the same neural pain centers as physical exclusion.",
      "Never dismiss a child's FOMO as 'just an app' — to them, it's their entire social landscape.",
      "Co-create boundaries: support them in hosting offline social gatherings to rebuild real-world connection."
    ]
  },
  {
    id: "v2",
    title: "Setting Screen Boundaries That Actually Work",
    description: "Move away from daily friction. Build cooperative screen agreements that children respect.",
    category: "Screen Time",
    duration: "7 min",
    stars: 4.8,
    reviews: 98,
    gradient: "from-purple-600 via-pink-600 to-red-600",
    summary: [
      "Avoid sudden 'device snatching' which triggers cortisol spikes.",
      "Establish a consistent 'device curfew' 1 hour before bedtime for the entire household.",
      "Offer transition warnings: 'You have 10 minutes left' is much better than 'Turn it off now'."
    ]
  },
  {
    id: "v3",
    title: "Spotting Early Signs of Cyberbullying",
    description: "Key behavioral shifts to look out for, and the correct way to intervene without losing trust.",
    category: "Social Media",
    duration: "8 min",
    stars: 5.0,
    reviews: 215,
    gradient: "from-red-600 via-orange-600 to-yellow-600",
    summary: [
      "Look for sudden withdrawal after device use or hiding the screen when you walk by.",
      "Document everything before reporting. Do not retaliate or message the bully directly.",
      "Assure your child that reporting the bullying will not result in taking away their device access."
    ]
  },
  {
    id: "v4",
    title: "Building Emotional Resilience in the Tech Age",
    description: "Help children build self-regulation and online safety awareness without constant monitoring.",
    category: "Emotional Support",
    duration: "6 min",
    stars: 4.7,
    reviews: 84,
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    summary: [
      "Teach mindfulness practices specifically geared for post-screen stimulation.",
      "Encourage children to name their emotions using a 1-10 scale after social media browsing.",
      "Model healthy digital balance by taking intentional tech holidays as a family."
    ]
  },
  {
    id: "v5",
    title: "TikTok & Algorithms: What Parents Must Know",
    description: "An inside look at how recommendation loops affect children's dopamine levels and attention spans.",
    category: "Social Media",
    duration: "5 min",
    stars: 4.9,
    reviews: 178,
    gradient: "from-cyan-600 via-blue-600 to-indigo-600",
    summary: [
      "TikTok's algorithm is designed to optimize for session length, not interest.",
      "High-dopamine content loops reduce natural patience thresholds for offline tasks.",
      "Balance high-stimulus feeds with constructive, active creation like coding, sketching, or building."
    ]
  },
  {
    id: "v6",
    title: "Device Bedtimes: Sleep Science for Parents",
    description: "Why blue light is only half the problem. Learn how cognitive arousal ruins children's REM cycles.",
    category: "Screen Time",
    duration: "9 min",
    stars: 4.9,
    reviews: 130,
    gradient: "from-amber-600 via-orange-600 to-red-600",
    summary: [
      "Active engagement (chatting, gaming) triggers high-alert focus states that block melatonin.",
      "Set up a central 'charging station' in the kitchen, not the bedroom, to prevent late-night checks.",
      "Introduce low-stimulation alternatives: audiobooks, physical books, or journaling before sleep."
    ]
  }
];

export default function ParentingVideosPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState<typeof videoLessons[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(35);

  const filteredVideos = videoLessons.filter(v => {
    const matchesCategory = selectedCategory === "All" || v.category === selectedCategory;
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/30 dark:bg-[#081225]/30">
      <Topbar 
        title="Parenting Videos Hub" 
        subtitle="Recommended micro-lessons and expert guides for supporting your child's digital life." 
      />

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition ${
                selectedCategory === cat
                  ? "bg-[#0f274a] text-white dark:bg-white dark:text-[#0f274a]"
                  : "bg-white dark:bg-[#0f1f38] text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800/40 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search lessons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-100 dark:border-slate-800/40 bg-white dark:bg-[#0f1f38] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((v) => (
          <Card 
            key={v.id} 
            className="border-slate-100 dark:border-slate-800/40 bg-white dark:bg-[#0f1f38] overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-md transition duration-300 rounded-2xl"
          >
            <div>
              {/* Thumbnail Container */}
              <div className={`relative h-44 bg-gradient-to-br ${v.gradient} flex items-center justify-center p-6 text-white`}>
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition duration-300" />
                <button 
                  onClick={() => {
                    setActiveVideo(v);
                    setIsPlaying(true);
                  }}
                  className="relative z-10 bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-slate-900 h-14 w-14 rounded-full flex items-center justify-center transition active:scale-95 shadow-lg group-hover:scale-105"
                >
                  <Play className="h-6 w-6 fill-current ml-0.5" />
                </button>
                <div className="absolute bottom-3 right-3 bg-slate-900/80 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  {v.duration}
                </div>
                <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                  {v.category}
                </div>
              </div>

              {/* Title & Info */}
              <div className="p-5">
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug">
                  {v.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {v.description}
                </p>
              </div>
            </div>

            {/* Footer Rating */}
            <div className="px-5 pb-5 pt-3 border-t border-slate-50 dark:border-slate-800/40 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-800 dark:text-slate-200">{v.stars}</span>
                <span>({v.reviews} reviews)</span>
              </div>
              <button 
                onClick={() => {
                  setActiveVideo(v);
                  setIsPlaying(true);
                }}
                className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
              >
                Watch Now →
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Custom Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#0f1f38] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {activeVideo.category}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mt-2 leading-none">
                    {activeVideo.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setActiveVideo(null)}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-950 p-2 rounded-full transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Simulated Player View */}
                <div className="lg:col-span-7 bg-slate-950 flex flex-col justify-between min-h-[300px] relative text-white">
                  <div className={`absolute inset-0 bg-gradient-to-br ${activeVideo.gradient} opacity-20`} />
                  
                  {/* Floating badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg text-xs">
                    <Clock className="h-3.5 w-3.5 text-blue-400" />
                    <span>Parenting Masterclass · {activeVideo.duration}</span>
                  </div>

                  {/* Playback Simulation */}
                  <div className="flex-1 flex items-center justify-center relative">
                    {isPlaying ? (
                      <div className="flex flex-col items-center gap-2 animate-pulse">
                        <div className="h-16 w-16 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
                          <Play className="h-8 w-8 fill-current text-white animate-spin-slow" />
                        </div>
                        <span className="text-xs text-slate-300 tracking-wider">Streaming Video Lesson...</span>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setIsPlaying(true)}
                        className="bg-white text-slate-950 h-16 w-16 rounded-full flex items-center justify-center shadow-2xl transition active:scale-95 hover:scale-105"
                      >
                        <Play className="h-7 w-7 fill-current ml-1" />
                      </button>
                    )}
                  </div>

                  {/* Video Controls Bar */}
                  <div className="bg-slate-900/90 backdrop-blur-md p-4 flex flex-col gap-3 border-t border-white/5">
                    {/* Progress Slider */}
                    <div className="flex items-center gap-3 text-[10px] text-slate-400">
                      <span>2:15</span>
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full relative cursor-pointer overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${videoProgress}%` }}
                        />
                      </div>
                      <span>{activeVideo.duration}</span>
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="hover:text-blue-400 transition"
                        >
                          <Play className={`h-4 w-4 ${isPlaying ? "fill-current" : ""}`} />
                        </button>
                        <button 
                          onClick={() => setVideoProgress(0)}
                          className="hover:text-blue-400 transition"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </button>
                        <Volume2 className="h-4 w-4 text-slate-300 cursor-pointer" />
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                          HD 1080P
                        </span>
                        <Maximize className="h-4 w-4 text-slate-300 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Takeaways Panel */}
                <div className="lg:col-span-5 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-[#0f274a] dark:text-blue-300">
                      <Sparkles className="h-5 w-5 text-blue-500" />
                      <h4 className="font-heading text-sm font-bold uppercase tracking-wider">
                        AI Parenting Takeaways
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {activeVideo.summary.map((t, idx) => (
                        <div key={idx} className="flex gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                            {t}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <BookOpen className="h-4 w-4" />
                      <span>Includes resource checklist</span>
                    </div>
                    <button className="bg-[#0f274a] dark:bg-white text-white dark:text-[#0f274a] hover:opacity-90 px-4 py-2 rounded-xl text-xs font-semibold transition">
                      Download PDF Guide
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
