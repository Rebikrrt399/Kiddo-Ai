import { NextRequest, NextResponse } from "next/server";

interface ParentingVideo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "Child Screen Addiction" | "Student Stress & Anxiety" | "Mental Health & Routines" | "Gaming & Screen Addiction" | "Virtual Reality & Digital Behavior" | "Study Focus & Learning";
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

const PARENTING_VIDEOS: ParentingVideo[] = [
  {
    id: "v1",
    title: "Can You BREAK Your Screen Addiction of your CHILD?",
    subtitle: "SCREEN ADDICTION - स्मोकिंग से भी खतरनाक | Dr. Sweta Adatia @drsweta.adatiahindi",
    description: "Neurologist Dr. Sweta Adatia breaks down the neuroscience behind child screen addiction, explaining how infinite scrolling dysregulates dopamine and providing practical digital fasting solutions.",
    category: "Child Screen Addiction",
    duration: "15 min",
    stars: 4.9,
    reviews: 480,
    author: "Dr. Sweta Adatia @drsweta.adatiahindi",
    youtubeId: "IJ8E2-XNPqg",
    youtubeUrl: "https://www.youtube.com/watch?v=IJ8E2-XNPqg",
    directWatchUrl: "https://www.youtube.com/watch?v=IJ8E2-XNPqg",
    thumbnailUrl: "https://img.youtube.com/vi/IJ8E2-XNPqg/hqdefault.jpg",
    embedUrl: "https://www.youtube-nocookie.com/embed/IJ8E2-XNPqg",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    summary: [
      "Children mirror adult device habits: parents must model healthy digital boundaries at home.",
      "Implement structured 'digital fasts' and device-free days to reset dopamine baseline receptors.",
      "Develop an internal stopping brake system to help children transition off screens without friction."
    ]
  },
  {
    id: "v2",
    title: "How to Manage Stress as a Student",
    subtitle: "MANAGE STRESS AS A STUDENT | Med School Insiders",
    description: "Med School Insiders provides a structured, evidence-based roadmap for students to manage academic anxiety, prevent burnout, and build long-term stress resilience.",
    category: "Student Stress & Anxiety",
    duration: "14 min",
    stars: 4.9,
    reviews: 620,
    author: "Med School Insiders",
    youtubeId: "Bk2-dKH2Ta4",
    youtubeUrl: "https://www.youtube.com/watch?v=Bk2-dKH2Ta4",
    directWatchUrl: "https://www.youtube.com/watch?v=Bk2-dKH2Ta4",
    thumbnailUrl: "https://img.youtube.com/vi/Bk2-dKH2Ta4/hqdefault.jpg",
    embedUrl: "https://www.youtube-nocookie.com/embed/Bk2-dKH2Ta4",
    gradient: "from-purple-600 via-pink-600 to-red-600",
    summary: [
      "Understand the Yerkes-Dodson curve: optimize mild motivation while stopping chronic distress.",
      "Establish foundational habits: prioritized sleep, physical activity, and structured time blocks.",
      "Apply acute breathing techniques and cognitive self-talk during high-pressure exam periods."
    ]
  },
  {
    id: "v3",
    title: "Stop Copying Morning Routines. Do This Instead.",
    subtitle: "The Morning Routine that actually works | Abhasa - Mental Health",
    description: "Abhasa Mental Health explores why copying rigid morning trends causes decision fatigue and guilt, presenting a personalized approach to morning mental wellness.",
    category: "Mental Health & Routines",
    duration: "12 min",
    stars: 4.8,
    reviews: 350,
    author: "Abhasa - Mental Health",
    youtubeId: "hHmw32DML-s",
    youtubeUrl: "https://www.youtube.com/watch?v=hHmw32DML-s",
    directWatchUrl: "https://www.youtube.com/watch?v=hHmw32DML-s",
    thumbnailUrl: "https://img.youtube.com/vi/hHmw32DML-s/hqdefault.jpg",
    embedUrl: "https://www.youtube-nocookie.com/embed/hHmw32DML-s",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    summary: [
      "Avoid unrealistic 10-step influencer routines that trigger early morning cortisol spikes.",
      "Tailor morning habits to your individual energy levels, chronotype, and real-world responsibilities.",
      "Prioritize early sunlight exposure and calm reflection before opening notifications and social feeds."
    ]
  },
  {
    id: "v4",
    title: "Escaping video game addiction: Cam Adair at TEDxBoulder",
    subtitle: "Recognizing video game addiction, dopamine loops, and rebuilding offline motivation in youth.",
    description: "Cam Adair shares his personal journey overcoming extreme video game addiction, explaining the four core psychological needs gaming satisfies and how families can rebuild real-world purpose.",
    category: "Gaming & Screen Addiction",
    duration: "19 min",
    stars: 4.9,
    reviews: 512,
    author: "Cam Adair (TEDxBoulder)",
    youtubeId: "EHmC2D0_Hdg",
    youtubeUrl: "https://www.youtube.com/watch?v=EHmC2D0_Hdg",
    directWatchUrl: "https://www.youtube.com/watch?v=EHmC2D0_Hdg",
    thumbnailUrl: "https://img.youtube.com/vi/EHmC2D0_Hdg/hqdefault.jpg",
    embedUrl: "https://www.youtube-nocookie.com/embed/EHmC2D0_Hdg",
    gradient: "from-red-600 via-orange-600 to-amber-600",
    summary: [
      "Video game addiction satisfies 4 core needs: temporary escape, social connection, constant challenge, and measurable progress.",
      "Sudden device confiscation triggers isolation; replace gaming hours with tangible offline hobbies, sports, or creative goals.",
      "Build open family support systems focusing on understanding underlying emotional triggers rather than punitive shame."
    ]
  },
  {
    id: "v5",
    title: "Can Behavior Be Influenced By The Virtual World?",
    subtitle: "Psychological research on how immersive screens, virtual realities, and digital environments shape human behavior.",
    description: "Dr. Barbara O. Rothbaum explores the psychological power of virtual environments, demonstrating how digital worlds influence emotional responses, social behavior, and mental health.",
    category: "Virtual Reality & Digital Behavior",
    duration: "16 min",
    stars: 4.8,
    reviews: 420,
    author: "Barbara O. Rothbaum (TEDxPeachtree)",
    youtubeId: "bGW562cyOeU",
    youtubeUrl: "https://www.youtube.com/watch?v=bGW562cyOeU",
    directWatchUrl: "https://www.youtube.com/watch?v=bGW562cyOeU",
    thumbnailUrl: "https://img.youtube.com/vi/bGW562cyOeU/hqdefault.jpg",
    embedUrl: "https://www.youtube-nocookie.com/embed/bGW562cyOeU",
    gradient: "from-teal-600 via-cyan-600 to-blue-600",
    summary: [
      "Immersive digital environments trigger genuine biological and psychological responses in developing brains.",
      "Virtual tools can be used constructively to build emotional regulation, exposure therapy, and empathy.",
      "Balanced parental guidance ensures virtual world engagement enhances rather than replaces real-world experiences."
    ]
  },
  {
    id: "v6",
    title: "How to make your child focus while studying",
    subtitle: "Practical study routines, energy management, and focus techniques for children and teenagers.",
    description: "Parenting expert Dr. Debmita Dutta presents actionable strategies for parents to help children and teenagers focus while studying, manage fatigue, and eliminate digital study distractions.",
    category: "Study Focus & Learning",
    duration: "10 min",
    stars: 4.9,
    reviews: 310,
    author: "Dr. Debmita Dutta",
    youtubeId: "oKIgkfJE7qg",
    youtubeUrl: "https://www.youtube.com/watch?v=oKIgkfJE7qg",
    directWatchUrl: "https://www.youtube.com/watch?v=oKIgkfJE7qg",
    thumbnailUrl: "https://img.youtube.com/vi/oKIgkfJE7qg/hqdefault.jpg",
    embedUrl: "https://www.youtube-nocookie.com/embed/oKIgkfJE7qg",
    gradient: "from-indigo-600 via-violet-600 to-pink-600",
    summary: [
      "Address physical fatigue and sleep debt before expecting high cognitive focus during homework.",
      "Break study sessions into 20-25 minute focused blocks followed by short active physical breaks.",
      "Remove smartphone notifications and extraneous digital screens from the child's study environment."
    ]
  }
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const query = searchParams.get("query");

  let filtered = [...PARENTING_VIDEOS];

  if (category && category !== "All") {
    filtered = filtered.filter((v) => v.category === category);
  }

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.subtitle.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.author.toLowerCase().includes(q)
    );
  }

  const categories = [
    "All", 
    "Child Screen Addiction", 
    "Student Stress & Anxiety", 
    "Mental Health & Routines",
    "Gaming & Screen Addiction",
    "Virtual Reality & Digital Behavior",
    "Study Focus & Learning"
  ];

  return NextResponse.json({
    success: true,
    total: filtered.length,
    categories,
    videos: filtered,
  });
}
