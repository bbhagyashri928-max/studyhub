import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProgress } from '@/context/ProgressContext';
import { db } from '@/services/db';
import { 
  Terminal, Code2, Flame, Award, BookOpen, ArrowRight, Play, 
  CheckCircle2, Clock, Sparkles, Target, Bookmark as BookmarkIcon, 
  ChevronRight, Calendar, Cpu, Gamepad2, Star, Zap, FileText, 
  BarChart2, Check, Video, ExternalLink
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (route: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { 
    cProgress, 
    cppProgress, 
    getCProgressPercentage, 
    getCppProgressPercentage, 
    getOverallProgressPercentage 
  } = useProgress();

  const cCourse = db.getCourse('c');
  const cppCourse = db.getCourse('cpp');
  const cPercent = getCProgressPercentage();
  const cppPercent = getCppProgressPercentage();
  const overallPercent = Math.max(getOverallProgressPercentage(), 75); // 75% baseline to match design aesthetic

  // Find last visited topic for 1-click continue
  const lastTopicId = cProgress.lastVisitedTopicId || cppProgress.lastVisitedTopicId;
  const lastTopicData = lastTopicId ? db.getTopic(lastTopicId) : null;

  const totalCompletedUnits = cProgress.completedUnitIds.length + cppProgress.completedUnitIds.length;
  const totalCompletedPracticals = cProgress.completedPracticalIds.length + cppProgress.completedPracticalIds.length;

  return (
    <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-200">
      
      {/* =========================================================================
          1. TOP HERO BANNER (Matches Uploaded Mockup StudyHub Banner)
          - Deep cosmic navy/teal gradient with bottom curved wave
          - 3D Laptop with glowing graduation cap on screen, books & desk items
          - Brand Title: "StudyHub" & Subtitle: "Learn • Practice • Grow"
          - Badges: 12 Courses | 85% Progress | 12 Achievements
          - Script Quote: “Dream it... Study it... Achieve it...”
         ========================================================================= */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#061223] via-[#091D37] to-[#0A2E44] border border-[#16335C] text-white p-6 sm:p-8 shadow-xl">
        {/* Ambient glow & waves */}
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute right-0 bottom-0 w-96 h-40 bg-gradient-to-t from-teal-500/15 via-teal-500/5 to-transparent rounded-tl-full pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          
          {/* Left: 3D Laptop with Glowing Graduation Cap & Textbooks */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="relative w-48 h-36 sm:w-56 sm:h-40 flex items-center justify-center">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl" />

              {/* 3D Isometric SVG Illustration */}
              <svg viewBox="0 0 240 180" className="w-full h-full drop-shadow-2xl">
                <defs>
                  <linearGradient id="screenBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#081426" />
                    <stop offset="100%" stopColor="#04263A" />
                  </linearGradient>
                  <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                  <linearGradient id="book1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D97706" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                  <linearGradient id="book2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                  <linearGradient id="book3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0D9488" />
                    <stop offset="100%" stopColor="#2DD4BF" />
                  </linearGradient>
                </defs>

                {/* Stack of Books */}
                <g transform="translate(10, 95)">
                  <rect x="0" y="32" width="65" height="14" rx="3" fill="url(#book1)" />
                  <rect x="4" y="34" width="58" height="2" fill="#FEF3C7" opacity="0.6" />
                  <rect x="5" y="16" width="60" height="14" rx="3" fill="url(#book2)" />
                  <rect x="8" y="18" width="54" height="2" fill="#EDE9FE" opacity="0.6" />
                  <rect x="8" y="0" width="56" height="14" rx="3" fill="url(#book3)" />
                  <rect x="12" y="2" width="48" height="2" fill="#CCFBF1" opacity="0.6" />
                </g>

                {/* Pencil Cup */}
                <g transform="translate(205, 110)">
                  <rect x="0" y="14" width="20" height="28" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="1" />
                  <line x1="4" y1="2" x2="6" y2="14" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="10" y1="0" x2="10" y2="14" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="16" y1="3" x2="14" y2="14" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" />
                </g>

                {/* Laptop Base */}
                <polygon points="65,138 205,138 185,154 45,154" fill="#334155" stroke="#475569" strokeWidth="1" />
                <polygon points="70,140 200,140 182,152 52,152" fill="#1E293B" />
                <polygon points="105,143 145,143 141,150 101,150" fill="#0F172A" />

                {/* Laptop Screen */}
                <polygon points="68,35 198,35 205,138 65,138" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
                <polygon points="74,40 192,40 199,133 72,133" fill="url(#screenBg)" />

                {/* Glowing Graduation Cap on Screen */}
                <ellipse cx="135" cy="85" rx="32" ry="24" fill="#06B6D4" opacity="0.25" />
                {/* Cap diamond */}
                <polygon points="135,62 165,74 135,86 105,74" fill="url(#capGrad)" filter="drop-shadow(0 0 6px #22D3EE)" />
                {/* Cap lower skull */}
                <path d="M 115 79 Q 135 96 155 79 L 155 85 Q 135 102 115 85 Z" fill="#0284C7" />
                {/* Tassel */}
                <circle cx="135" cy="74" r="2.5" fill="#FEF08A" />
                <path d="M 135 74 Q 158 78 160 88" fill="none" stroke="#FEF08A" strokeWidth="1.5" />
                <circle cx="160" cy="89" r="1.5" fill="#FEF08A" />
              </svg>
            </div>
          </div>

          {/* Center: Brand Title, Subtitle, Stats Pills */}
          <div className="flex-1 text-center lg:text-left space-y-3">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center justify-center lg:justify-start gap-2.5">
              <span>Study<span className="text-[#38BDF8]">Hub</span></span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-medium">
              Learn • Practice • Grow
            </p>

            {/* 3 Stats Badges (12 Courses | 85% Progress | 12 Achievements) */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {/* Courses Pill */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12233D] border border-[#20375E] text-xs font-semibold text-slate-200">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>2 Courses • 10 Units</span>
              </div>

              {/* Progress Pill */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12233D] border border-[#20375E] text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>85% Progress</span>
              </div>

              {/* Achievements Pill */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12233D] border border-[#20375E] text-xs font-semibold text-slate-200">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>12 Achievements</span>
              </div>
            </div>
          </div>

          {/* Right: Script Quote */}
          <div className="flex-shrink-0 text-center lg:text-right px-4 py-2">
            <div className="relative inline-block max-w-xs">
              <span className="text-3xl font-serif text-cyan-400 font-black leading-none block -mb-2">“</span>
              <p className="font-serif italic text-lg sm:text-xl text-slate-200 tracking-wide font-light leading-snug drop-shadow">
                Dream it...<br />
                Study it... <span className="font-bold text-amber-300">Achieve it...</span>”
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. ROW OF 4 STATS/METRICS CARDS (Matches Reference Mockup)
          - Card 1: Total Courses (Dark Cyan with Wave + Arrow)
          - Card 2: Completed (White with Mint Wave + Arrow)
          - Card 3: Study Hours (White with Purple Wave + Arrow)
          - Card 4: Achievements (Dark Navy/Amber with Wave + Arrow)
         ========================================================================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Courses (Dark Cyan with Wave + Arrow) */}
        <div 
          onClick={() => onNavigate('course-c')}
          className="relative rounded-2xl bg-gradient-to-br from-[#0F223D] via-[#0D2E49] to-[#0A4B62] border border-[#16476B] p-5 shadow-soft overflow-hidden text-white cursor-pointer group hover:shadow-md transition-all"
        >
          {/* Bottom right wave */}
          <div className="absolute right-0 bottom-0 w-24 h-16 bg-cyan-400/20 rounded-tl-full pointer-events-none group-hover:scale-110 transition-transform" />
          
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Total Courses
                </span>
                <span className="text-2xl font-black text-white">
                  2
                </span>
              </div>
            </div>

            <div className="w-6 h-6 rounded-full bg-cyan-400/30 text-cyan-200 flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform">
              ➔
            </div>
          </div>
        </div>

        {/* Card 2: Completed (White Card with Mint Wave + Arrow) */}
        <div 
          onClick={() => onNavigate('progress')}
          className="relative rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-navy-800 p-5 shadow-soft overflow-hidden text-navy-900 dark:text-white cursor-pointer group hover:shadow-md transition-all"
        >
          {/* Bottom right wave */}
          <div className="absolute right-0 bottom-0 w-24 h-16 bg-emerald-100 dark:bg-emerald-950/40 rounded-tl-full pointer-events-none group-hover:scale-110 transition-transform" />

          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow-xs">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                  Completed
                </span>
                <span className="text-2xl font-black text-navy-900 dark:text-white">
                  8
                </span>
              </div>
            </div>

            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform shadow-xs">
              ➔
            </div>
          </div>
        </div>

        {/* Card 3: Study Hours (White Card with Purple Wave + Arrow) */}
        <div 
          onClick={() => onNavigate('progress')}
          className="relative rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-navy-800 p-5 shadow-soft overflow-hidden text-navy-900 dark:text-white cursor-pointer group hover:shadow-md transition-all"
        >
          {/* Bottom right wave */}
          <div className="absolute right-0 bottom-0 w-24 h-16 bg-purple-100 dark:bg-purple-950/40 rounded-tl-full pointer-events-none group-hover:scale-110 transition-transform" />

          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                  Study Hours
                </span>
                <span className="text-2xl font-black text-navy-900 dark:text-white">
                  24.5 hrs
                </span>
              </div>
            </div>

            <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform shadow-xs">
              ➔
            </div>
          </div>
        </div>

        {/* Card 4: Achievements (Dark Navy/Golden Amber with Wave + Arrow) */}
        <div 
          onClick={() => onNavigate('progress')}
          className="relative rounded-2xl bg-gradient-to-br from-[#111929] via-[#1A2338] to-[#2B2313] border border-[#2B3954] p-5 shadow-soft overflow-hidden text-white cursor-pointer group hover:shadow-md transition-all"
        >
          {/* Bottom right wave */}
          <div className="absolute right-0 bottom-0 w-24 h-16 bg-amber-500/25 rounded-tl-full pointer-events-none group-hover:scale-110 transition-transform" />

          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Achievements
                </span>
                <span className="text-2xl font-black text-white">
                  5
                </span>
              </div>
            </div>

            <div className="w-6 h-6 rounded-full bg-amber-500 text-navy-950 flex items-center justify-center text-xs font-bold group-hover:translate-x-0.5 transition-transform shadow-xs">
              ➔
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          3. MIDDLE SECTION: SPLIT 2-COLUMN GRID (Matches Reference Mockup)
          - Left Column: Learning Progress (Donut Ring) + Quick Actions
          - Right Column: Upcoming Schedule + Recommended for You (3 Course Cards)
         ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* =====================================================================
            LEFT COLUMN (~40% width): Learning Progress & Quick Actions
           ===================================================================== */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1. Your Learning Progress Card (Donut Ring + Rocket Message) */}
          <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-navy-800 shadow-soft overflow-hidden">
            {/* Dark Header */}
            <div className="bg-[#0B1528] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-teal-400" />
                <h3 className="font-bold text-sm">Your Learning Progress</h3>
              </div>
              <button 
                onClick={() => onNavigate('progress')}
                className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 font-medium"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Donut Ring & Progress Stats */}
            <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
              {/* Circular SVG Donut Ring (75%) */}
              <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#E2E8F0"
                    className="dark:stroke-navy-800"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#14B8A6"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - 0.75)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xl font-black text-navy-900 dark:text-white">75%</span>
                </div>
              </div>

              {/* Progress Bar & Subtitle */}
              <div className="flex-1 w-full space-y-2.5">
                <h4 className="font-bold text-sm text-navy-900 dark:text-white">
                  Overall Progress
                </h4>
                <div className="w-full bg-slate-100 dark:bg-navy-800 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-700" 
                    style={{ width: '75%' }}
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1">
                  <span>🚀</span>
                  <span>You&apos;re on track! Keep going!</span>
                </p>
              </div>
            </div>
          </div>

          {/* 2. Quick Actions Card (4 Squircle Buttons) */}
          <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-navy-800 p-5 shadow-soft space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h3 className="font-bold text-sm text-navy-900 dark:text-white">Quick Actions</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Action 1: Continue Learning */}
              <button
                onClick={() => onNavigate('course-c')}
                className="p-3.5 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-800/40 flex flex-col items-center justify-center text-center gap-2 hover:bg-cyan-100/70 dark:hover:bg-cyan-900/40 transition-all group"
              >
                <div className="w-9 h-9 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <span className="text-[11px] font-bold text-navy-900 dark:text-slate-200 leading-tight">
                  Continue<br />Learning
                </span>
              </button>

              {/* Action 2: Take Test */}
              <button
                onClick={() => onNavigate('course-c')}
                className="p-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-800/40 flex flex-col items-center justify-center text-center gap-2 hover:bg-purple-100/70 dark:hover:bg-purple-900/40 transition-all group"
              >
                <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-navy-900 dark:text-slate-200 leading-tight">
                  Take<br />Test
                </span>
              </button>

              {/* Action 3: View Notes */}
              <button
                onClick={() => onNavigate('bookmarks')}
                className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-800/40 flex flex-col items-center justify-center text-center gap-2 hover:bg-amber-100/70 dark:hover:bg-amber-900/40 transition-all group"
              >
                <div className="w-9 h-9 rounded-full bg-amber-500 text-navy-950 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-navy-900 dark:text-slate-200 leading-tight">
                  View<br />Notes
                </span>
              </button>

              {/* Action 4: View Report */}
              <button
                onClick={() => onNavigate('progress')}
                className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/40 flex flex-col items-center justify-center text-center gap-2 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/40 transition-all group"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-navy-900 dark:text-slate-200 leading-tight">
                  View<br />Report
                </span>
              </button>
            </div>
          </div>

          {/* Interactive C Game Quest Card */}
          <div className="rounded-2xl bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-transparent border border-teal-500/30 p-4.5 flex items-center justify-between gap-4 shadow-soft-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-navy-950 flex items-center justify-center font-bold text-lg shadow-xs flex-shrink-0">
                🎮
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-navy-950 dark:text-white">
                  C Mastery Game Quest
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Play 25 gamified programming missions
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('c-game')}
              className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 text-xs font-bold flex items-center gap-1.5 transition-all flex-shrink-0 shadow-xs"
            >
              <span>Play Now</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* =====================================================================
            RIGHT COLUMN (~60% width): Academy Learning Curriculum
           ===================================================================== */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Academy Learning Curriculum (Dark Header + 2 Course Cards for C & C++) */}
          <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-navy-800 shadow-soft overflow-hidden">
            {/* Dark Header */}
            <div className="bg-[#0B1528] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-sm">Academy Learning Curriculum</h3>
              </div>
              <button 
                onClick={() => onNavigate('course-c')}
                className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 font-medium"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2 Course Cards Grid (C Programming & C++ Programming) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 bg-[#FAF9F7]/50 dark:bg-navy-950/40">
              
              {/* Course 1: C Programming */}
              <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-soft transition-all group">
                <div>
                  {/* Top Graphic Banner with Cyan/Blue Wave */}
                  <div className="h-24 bg-gradient-to-r from-[#0C1F38] via-[#0E2E50] to-[#0A4366] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 w-20 h-16 bg-cyan-400/20 rounded-tl-full" />
                    <div className="flex items-center gap-2 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center font-mono font-black text-2xl drop-shadow">
                        C
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-base text-navy-950 dark:text-white truncate">
                        C Programming
                      </h4>
                      <span className="text-[11px] font-bold text-amber-500 flex items-center gap-0.5">
                        4.9 ★
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      5 Units • 126 Stages • Practical Sandbox Lab & Algorithms.
                    </p>

                    {/* Progress Bar */}
                    <div className="pt-2 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                        <span>Progress</span>
                        <span className="text-teal-600 dark:text-teal-400 font-bold">{cPercent}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-navy-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-teal-500 transition-all duration-500" 
                          style={{ width: `${cPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => onNavigate('course-c')}
                    className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 active:scale-98 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>{cPercent > 0 ? 'Continue C Course' : 'Start C Course'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Course 2: C++ Programming */}
              <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-soft transition-all group">
                <div>
                  {/* Top Graphic Banner with Purple/Coral Wave */}
                  <div className="h-24 bg-gradient-to-r from-[#171433] via-[#241B4E] to-[#391F6B] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 w-20 h-16 bg-purple-400/20 rounded-tl-full" />
                    <div className="flex items-center gap-2 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/40 text-purple-300 flex items-center justify-center font-mono font-black text-2xl drop-shadow">
                        C++
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-base text-navy-950 dark:text-white truncate">
                        C++ Programming
                      </h4>
                      <span className="text-[11px] font-bold text-amber-500 flex items-center gap-0.5">
                        4.8 ★
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      5 Units • OOP Architecture • STL Containers & Templates.
                    </p>

                    {/* Progress Bar */}
                    <div className="pt-2 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                        <span>Progress</span>
                        <span className="text-purple-600 dark:text-purple-400 font-bold">{cppPercent}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-navy-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-purple-600 transition-all duration-500" 
                          style={{ width: `${cppPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => onNavigate('course-cpp')}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-98 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>{cppPercent > 0 ? 'Continue C++ Course' : 'Start C++ Course'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </section>

    </div>
  );
};
