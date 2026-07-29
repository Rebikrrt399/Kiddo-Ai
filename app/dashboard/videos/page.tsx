"use client";

import { useState, useEffect } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card } from "@/components/ui/card";
import { 
  Play, Clock, Star, Search, Sparkles, X, 
  CheckCircle, BookOpen, ExternalLink, RefreshCw, ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function YoutubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

interface VideoLesson {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  duration: string;
  stars: number;
  reviews: number;
  author: string;
  youtubeId: string;
  youtubeUrl: string;
  directWatchUrl: string;
  thumbnailUrl: string;
  embedUrl: string;
  gradient: string;
  summary: string[];
}

export default function ParentingVideosPage() {
  const [categories, setCategories] = useState<string[]>([
    "All", "Child Screen Addiction", "Student Stress & Anxiety", "Mental Health & Routines", "Gaming & Screen Addiction", "Virtual Reality & Digital Behavior", "Study Focus & Learning"
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState<VideoLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<VideoLesson | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCategory && selectedCategory !== "All") {
          params.set("category", selectedCategory);
        }
        if (searchQuery) {
          params.set("query", searchQuery);
        }

        const res = await fetch(`/api/videos?${params.toString()}`);
        const data = await res.json();

        if (data.success) {
          setVideos(data.videos);
          if (data.categories) {
            setCategories(data.categories);
          }
        }
      } catch (err) {
        console.error("Failed to fetch videos from backend API:", err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(fetchVideos, 200);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  const handleOpenYouTube = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-slate-50/30 dark:bg-[#081225]/30 p-6 md:p-8">
      <Topbar 
        title="Mental Health & Screen Time Videos" 
        subtitle="Curated Video Library: Dr. Sweta Adatia, Med School Insiders, Abhasa, TED Talks, and Dr. Debmita Dutta." 
      />

      {/* Featured Header */}
      <div className="my-6 bg-[#0f274a] text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden border border-blue-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <YoutubeIcon className="h-3 w-3" />
                Featured Video Collection
              </span>
              <span className="bg-blue-500/30 text-blue-200 border border-blue-400/30 text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                Dr. Sweta Adatia • Med School Insiders • Abhasa • Dr. Debmita Dutta
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight font-heading text-white">
              Child Screen Addiction & Study Focus Library
            </h2>

            <p className="text-xs md:text-sm text-blue-100/90 leading-relaxed">
              Click any video thumbnail or watch button to open the video directly on YouTube.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition duration-200 ${
                selectedCategory === cat
                  ? "bg-[#0f274a] text-white dark:bg-white dark:text-[#0f274a] shadow-sm"
                  : "bg-white dark:bg-[#0f1f38] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50"
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
            placeholder="Search Dr. Debmita Dutta, focus, routines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1f38] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
          />
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm font-medium">Fetching video collection from backend...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="bg-white dark:bg-[#0f1f38] border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
          <YoutubeIcon className="h-12 w-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No videos found</h3>
          <p className="text-sm text-slate-500 mt-1">Try adjusting your search terms or selecting a different category.</p>
        </div>
      ) : (
        /* Videos Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v) => (
            <Card 
              key={v.id} 
              className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0f1f38] overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-lg transition duration-300 rounded-2xl"
            >
              <div>
                {/* Thumbnail Container with Direct YouTube Redirect */}
                <div 
                  onClick={() => handleOpenYouTube(v.directWatchUrl || v.youtubeUrl)}
                  className={`relative h-48 bg-gradient-to-br ${v.gradient} overflow-hidden cursor-pointer flex items-center justify-center`}
                  title={`Play exact video on YouTube: ${v.title}`}
                >
                  <img
                    src={v.thumbnailUrl}
                    alt={v.title}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-95 group-hover:opacity-100 absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-white/10 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white z-10">
                    {v.category}
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-slate-950/90 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-white/10 z-10">
                    <Clock className="h-3 w-3 text-amber-400" />
                    {v.duration}
                  </div>

                  {/* Red YouTube Play Button */}
                  <div className="relative z-20 h-14 w-14 bg-red-600 group-hover:bg-red-500 text-white rounded-full flex items-center justify-center transition active:scale-95 shadow-xl group-hover:scale-110">
                    <Play className="h-6 w-6 fill-current ml-0.5" />
                  </div>

                  <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 bg-red-600/90 text-white px-2.5 py-0.5 rounded text-[10px] font-bold">
                    <YoutubeIcon className="h-3 w-3" />
                    <span>Watch on YouTube ↗</span>
                  </div>
                </div>

                {/* Title, Subtitle & Author */}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-red-600 dark:text-red-400 font-bold flex items-center gap-1">
                      <YoutubeIcon className="h-3.5 w-3.5" />
                      {v.author}
                    </span>
                  </div>

                  <h3 
                    onClick={() => handleOpenYouTube(v.directWatchUrl || v.youtubeUrl)}
                    className="font-heading text-base font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition leading-snug line-clamp-2 cursor-pointer"
                  >
                    {v.title}
                  </h3>

                  {/* Subtitle */}
                  {v.subtitle && (
                    <p className="text-xs font-medium text-blue-600 dark:text-blue-300 mt-1 line-clamp-2 italic">
                      "{v.subtitle}"
                    </p>
                  )}

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-2">
                    {v.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-800 dark:text-slate-200">{v.stars}</span>
                  <span>({v.reviews})</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setActiveVideo(v)}
                    className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white font-medium px-2 py-1 rounded transition"
                  >
                    AI Takeaways
                  </button>
                  <a
                    href={v.directWatchUrl || v.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1 shadow-sm"
                  >
                    <YoutubeIcon className="h-3.5 w-3.5" />
                    <span>Watch Video ↗</span>
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Embedded YouTube Player & Summary Modal */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#0f1f38] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-red-600 text-white p-2 rounded-xl">
                    <YoutubeIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {activeVideo.category} • {activeVideo.author}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mt-1 leading-none">
                      {activeVideo.title}
                    </h3>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveVideo(null)}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-950 dark:hover:text-white p-2 rounded-full transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Banner for Direct YouTube Link */}
              <div className="bg-red-600 text-white px-5 py-2.5 flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <YoutubeIcon className="h-4 w-4 shrink-0" />
                  <span>Open exact video on YouTube website:</span>
                </div>
                <a
                  href={activeVideo.directWatchUrl || activeVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-red-600 px-3 py-1 rounded-lg font-bold hover:bg-slate-100 transition flex items-center gap-1 shadow-sm"
                >
                  <span>Open Watch Link ({activeVideo.youtubeId})</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Player & Key Takeaways Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* YouTube iFrame Player */}
                <div className="lg:col-span-7 bg-black min-h-[340px] md:min-h-[400px] flex flex-col justify-center relative">
                  <iframe
                    src={`${activeVideo.embedUrl}?autoplay=1&rel=0`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full min-h-[340px] md:min-h-[400px] border-0"
                  />
                </div>

                {/* Right Panel: AI Takeaways */}
                <div className="lg:col-span-5 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-[#0f274a] dark:text-blue-300">
                      <Sparkles className="h-5 w-5 text-blue-500" />
                      <h4 className="font-heading text-sm font-bold uppercase tracking-wider">
                        Key Video Takeaways
                      </h4>
                    </div>

                    {activeVideo.subtitle && (
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2 italic">
                        "{activeVideo.subtitle}"
                      </p>
                    )}

                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                      {activeVideo.description}
                    </p>

                    <div className="space-y-3">
                      {activeVideo.summary.map((t, idx) => (
                        <div key={idx} className="flex gap-3 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800/40">
                          <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <p className="text-slate-700 dark:text-slate-200 text-xs leading-relaxed font-medium">
                            {t}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span>{activeVideo.author} Guide</span>
                    </div>
                    <a
                      href={activeVideo.directWatchUrl || activeVideo.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
                    >
                      <YoutubeIcon className="h-4 w-4" />
                      <span>Watch Video on YouTube ↗</span>
                    </a>
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
