import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProgress } from '@/context/ProgressContext';
import { db } from '@/services/db';
import { 
  BookOpen, CheckCircle2, Clock, Trophy, BarChart3, 
  Calendar, Star, Play, CheckSquare, FileText, ArrowRight, 
  Sparkles, Code, Globe, Terminal, ChevronRight, Zap
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

  const cPercent = getCProgressPercentage();
  const cppPercent = getCppProgressPercentage();
  const overallPercent = Math.max(getOverallProgressPercentage(), 75);

  return (
    <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-200">
      
      {/* =========================================================================
          1. PANORAMIC HERO BANNER (Matches Reference Mockup)
          - Deep midnight teal/navy gradient with sweeping waves
          - 3D Laptop with glowing cyan Graduation Cap, stack of books, pencil holder
          - "StudyHub" & "Learn • Practice • Grow"
          - Pills: 12 Courses | 85% Progress | 12 Achievements
          - Script Quote: "Dream it... Study it... Achieve it..."
         ========================================================================= */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#071726] via-[#0A2636] to-[#0D3644] border border-[#144759] text-white p-6 sm:p-8 lg:p-9 shadow-xl">
        
        {/* Sweeping Turquoise & Cyan Neon Wave Accents */}
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Flowing Organic Wave in background (matches bottom curve of banner in mockup) */}
        <div className="absolute -bottom-10 -right-10 w-[550px] h-40 bg-gradient-to-t from-teal-400/20 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-32 bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          
          {/* Left: 3D Laptop with Glowing Cyan Graduation Cap & Desk Items */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="relative w-52 h-40 sm:w-64 sm:h-44 flex items-center justify-center">
              
              {/* Radial Cyan Glow Aura */}
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-2xl" />

              {/* 3D Isometric SVG Illustration */}
              <svg viewBox="0 0 260 190" className="w-full h-full drop-shadow-2xl">
                <defs>
                  <linearGradient id="deskLaptopScreen" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0B1C2B" />
                    <stop offset="100%" stopColor="#042F3D" />
                  </linearGradient>
                  <linearGradient id="cyanNeon" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#22D3EE" />
                  </linearGradient>
                  <linearGradient id="bookGreen" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                  <linearGradient id="bookPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                  <linearGradient id="bookYellow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D97706" />
                    <stop offset="100%" stopColor="#FBBF24" />
                  </linearGradient>
                </defs>

                {/* Stack of Colorful Books on Left */}
                <g transform="translate(12, 105)">
                  {/* Yellow Book */}
                  <rect x="0" y="32" width="65" height="14" rx="3" fill="url(#bookYellow)" />
                  <rect x="4" y="34" width="58" height="2" fill="#FEF3C7" opacity="0.6" />
                  {/* Purple Book */}
                  <rect x="4" y="16" width="62" height="14" rx="3" fill="url(#bookPurple)" />
                  <rect x="8" y="18" width="55" height="2" fill="#EDE9FE" opacity="0.6" />
                  {/* Green Book */}
                  <rect x="8" y="0" width="58" height="14" rx="3" fill="url(#bookGreen)" />
                  <rect x="12" y="2" width="50" height="2" fill="#D1FAE5" opacity="0.6" />
                </g>

                {/* Pencil Cup Holder on Right */}
                <g transform="translate(215, 105)">
                  <rect x="0" y="18" width="22" height="28" rx="4" fill="#0E2333" stroke="#1D4E63" strokeWidth="1.5" />
                  {/* Pens / Pencils */}
                  <line x1="6" y1="2" x2="8" y2="20" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
                  <line x1="12" y1="-2" x2="11" y2="20" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                  <line x1="17" y1="4" x2="14" y2="20" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" />
                </g>

                {/* Isometric Laptop Base */}
                <polygon points="80,145 225,145 205,162 60,162" fill="#294454" stroke="#3D677D" strokeWidth="1" />
                <polygon points="85,147 220,147 202,160 67,160" fill="#142836" />
                {/* Touchpad */}
                <polygon points="125,150 165,150 160,158 120,158" fill="#0C1B26" />

                {/* Isometric Laptop Screen */}
                <polygon points="82,40 218,40 225,145 80,145" fill="#172B38" stroke="#3D677D" strokeWidth="1.5" />
                <polygon points="88,45 212,45 219,140 86,140" fill="url(#deskLaptopScreen)" />

                {/* Screen Neon Glow Aura */}
                <ellipse cx="152" cy="92" rx="42" ry="30" fill="#06B6D4" opacity="0.25" />

                {/* Graduation Cap Mortarboard Graphic on Screen (Matches Reference Image) */}
                <g transform="translate(122, 68)">
                  {/* Cap Diamond */}
                  <polygon points="30,0 60,12 30,24 0,12" fill="none" stroke="url(#cyanNeon)" strokeWidth="3" strokeLinejoin="round" />
                  {/* Cap Skull Base */}
                  <path d="M 12 18 L 12 30 C 12 38 48 38 48 30 L 48 18" fill="none" stroke="url(#cyanNeon)" strokeWidth="3" strokeLinecap="round" />
                  {/* Tassel */}
                  <path d="M 30 12 L 62 20 L 62 34" fill="none" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="62" cy="35" r="2.5" fill="#FBBF24" />
                </g>

                {/* Small floating sparkles */}
                <circle cx="235" cy="55" r="2" fill="#38BDF8" />
                <polygon points="50,45 52,50 57,52 52,54 50,59 48,54 43,52 48,50" fill="#FBBF24" opacity="0.9" />
              </svg>
            </div>
          </div>

          {/* Center Info: Title, Subtitle, Stats Pills */}
          <div className="flex-1 text-center lg:text-left space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white flex items-center justify-center lg:justify-start gap-2">
              <span>Study</span><span className="text-cyan-400">Hub</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 font-semibold tracking-wide">
              Learn <span className="text-cyan-400">•</span> Practice <span className="text-cyan-400">•</span> Grow
            </p>

            {/* Badges Row (Matches Reference: 12 Courses | 85% Progress | 12 Achievements) */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E2C3D]/80 border border-[#1A4B63] text-xs font-semibold text-slate-200">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>12 Courses</span>
              </div>

              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E2C3D]/80 border border-[#1A4B63] text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>85% Progress</span>
              </div>

              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E2C3D]/80 border border-[#1A4B63] text-xs font-semibold text-slate-200">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>12 Achievements</span>
              </div>
            </div>
          </div>

          {/* Right: Quote Block with Calligraphy ("Dream it... Study it... Achieve it...") */}
          <div className="flex-shrink-0 text-center lg:text-right px-4 py-2">
            <div className="relative inline-block">
              {/* Cyan Big Quote Mark */}
              <span className="text-4xl text-cyan-400 font-serif leading-none block lg:text-right mb-1">“</span>
              <p className="font-serif italic text-lg sm:text-2xl text-slate-100 tracking-wide font-light leading-snug">
                &ldquo;Dream it...<br />
                Study it... <span className="font-bold text-amber-300 not-italic font-sans">Achieve it...</span>&rdquo;
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. TOP 4 SUMMARY METRIC CARDS (Matches Reference Row)
          - Card 1: Total Courses (Dark Cyan with cyan wave + 12 + arrow)
          - Card 2: Completed (White card with mint wave + 8 + arrow)
          - Card 3: Study Hours (White card with purple wave + 24.5 hrs + arrow)
          - Card 4: Achievements (Dark Navy with amber wave + 5 + arrow)
         ========================================================================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Card 1: Total Courses */}
        <div 
          onClick={() => onNavigate('course-c')}
          className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#0A2233] to-[#081B29] border border-[#16435F] p-5 text-white shadow-soft cursor-pointer group hover:shadow-soft-md transition-all"
        >
          {/* Cyan Glow Wave on Right */}
          <div className="absolute right-0 bottom-0 w-36 h-28 bg-gradient-to-tl from-cyan-500/30 via-teal-500/10 to-transparent rounded-tl-full pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-xs">
              <BookOpen className="w-6 h-6 text-cyan-300" />
            </div>

            <button className="w-7 h-7 rounded-full bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-navy-950 flex items-center justify-center transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative z-10 mt-4">
            <span className="text-xs font-semibold text-slate-300 block">Total Courses</span>
            <p className="text-3xl font-extrabold text-white mt-1">12</p>
          </div>
        </div>

        {/* Card 2: Completed */}
        <div 
          onClick={() => onNavigate('progress')}
          className="relative overflow-hidden rounded-[22px] bg-white dark:bg-[#0C1B2E] border border-slate-200/90 dark:border-navy-800 p-5 shadow-soft cursor-pointer group hover:shadow-soft-md transition-all"
        >
          {/* Mint Wave on Right */}
          <div className="absolute right-0 bottom-0 w-36 h-28 bg-gradient-to-tl from-emerald-400/20 via-teal-400/5 to-transparent rounded-tl-full pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>

            <button className="w-7 h-7 rounded-full bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center justify-center transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative z-10 mt-4">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Completed</span>
            <p className="text-3xl font-extrabold text-navy-950 dark:text-white mt-1">8</p>
          </div>
        </div>

        {/* Card 3: Study Hours */}
        <div 
          onClick={() => onNavigate('progress')}
          className="relative overflow-hidden rounded-[22px] bg-white dark:bg-[#0C1B2E] border border-slate-200/90 dark:border-navy-800 p-5 shadow-soft cursor-pointer group hover:shadow-soft-md transition-all"
        >
          {/* Lavender/Purple Wave on Right */}
          <div className="absolute right-0 bottom-0 w-36 h-28 bg-gradient-to-tl from-purple-400/20 via-purple-400/5 to-transparent rounded-tl-full pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6] text-white flex items-center justify-center shadow-xs">
              <Clock className="w-6 h-6 stroke-[2.5]" />
            </div>

            <button className="w-7 h-7 rounded-full bg-purple-50 hover:bg-purple-600 text-purple-600 hover:text-white dark:bg-purple-950/60 dark:text-purple-300 flex items-center justify-center transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative z-10 mt-4">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Study Hours</span>
            <p className="text-3xl font-extrabold text-navy-950 dark:text-white mt-1">24.5 <span className="text-lg font-bold text-slate-400">hrs</span></p>
          </div>
        </div>

        {/* Card 4: Achievements */}
        <div 
          onClick={() => onNavigate('progress')}
          className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#0F1E33] to-[#0A1626] border border-[#233B5D] p-5 text-white shadow-soft cursor-pointer group hover:shadow-soft-md transition-all"
        >
          {/* Amber/Gold Wave on Right */}
          <div className="absolute right-0 bottom-0 w-36 h-28 bg-gradient-to-tl from-amber-400/30 via-amber-500/10 to-transparent rounded-tl-full pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-2xl shadow-xs">
              🏆
            </div>

            <button className="w-7 h-7 rounded-full bg-amber-500/20 hover:bg-amber-400 text-amber-300 hover:text-navy-950 flex items-center justify-center transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative z-10 mt-4">
            <span className="text-xs font-semibold text-slate-300 block">Achievements</span>
            <p className="text-3xl font-extrabold text-white mt-1">5</p>
          </div>
        </div>

      </section>

      {/* =========================================================================
          3. MAIN CONTENT: 2-COLUMN SPLIT LAYOUT (Matches Reference Image)
          - Left Column (~42%):
              - Your Learning Progress (75% Circular Ring + Progress Bar)
              - Quick Actions (Continue Learning, Take Test, View Notes, View Report)
          - Right Column (~58%):
              - Upcoming Schedule (Date 28 Nov | Subject | Time | Join Class)
              - Recommended for You (C++, Python Basics, Web Development)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* =====================================================================
            LEFT COLUMN (~42% width)
           ===================================================================== */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Card A: Your Learning Progress */}
          <div className="rounded-[24px] bg-white dark:bg-[#0B1528] border border-slate-200/90 dark:border-navy-800 p-5 sm:p-6 shadow-soft">
            
            {/* Header: Title + View Details */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-navy-800/80">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-navy-950 dark:text-white">
                  Your Learning Progress
                </h3>
              </div>

              <button 
                onClick={() => onNavigate('progress')}
                className="text-xs font-bold text-teal-600 hover:text-teal-700 dark:text-teal-400 flex items-center gap-1 transition-colors"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Content: Donut Circular Progress + Progress Bar */}
            <div className="pt-5 flex items-center gap-6">
              
              {/* Circular Donut Ring Showing 75% */}
              <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Track circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="text-slate-100 dark:text-navy-800"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  {/* Progress arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#14B8A6"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - 0.75)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-navy-950 dark:text-white font-mono">
                    75%
                  </span>
                </div>
              </div>

              {/* Progress details */}
              <div className="flex-1 space-y-2">
                <h4 className="font-extrabold text-sm text-navy-900 dark:text-white">
                  Overall Progress
                </h4>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-navy-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: '75%' }} />
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1 font-medium">
                  <span>🚀</span>
                  <span>You&apos;re on track! Keep going!</span>
                </p>
              </div>

            </div>

          </div>

          {/* Card B: Quick Actions (4 Action Buttons) */}
          <div className="rounded-[24px] bg-white dark:bg-[#0B1528] border border-slate-200/90 dark:border-navy-800 p-5 sm:p-6 shadow-soft space-y-4">
            
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h3 className="font-extrabold text-sm text-navy-950 dark:text-white">
                Quick Actions
              </h3>
            </div>

            {/* 4 Square/Rounded Action Buttons */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              
              {/* 1. Continue Learning */}
              <button
                onClick={() => onNavigate('course-c')}
                className="p-3 rounded-2xl bg-[#E8F8F5] dark:bg-[#0D2E36] hover:bg-[#D5F2ED] border border-teal-200/60 dark:border-teal-800/50 flex flex-col items-center justify-center gap-2 group transition-all text-center"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <span className="text-[11px] font-bold text-navy-900 dark:text-teal-200 leading-tight">
                  Continue Learning
                </span>
              </button>

              {/* 2. Take Test */}
              <button
                onClick={() => onNavigate('course-c')}
                className="p-3 rounded-2xl bg-[#F3EFFC] dark:bg-[#201B38] hover:bg-[#E9E2FA] border border-purple-200/60 dark:border-purple-800/50 flex flex-col items-center justify-center gap-2 group transition-all text-center"
              >
                <div className="w-8 h-8 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <CheckSquare className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-[11px] font-bold text-navy-900 dark:text-purple-200 leading-tight">
                  Take Test
                </span>
              </button>

              {/* 3. View Notes */}
              <button
                onClick={() => onNavigate('bookmarks')}
                className="p-3 rounded-2xl bg-[#FFF7E8] dark:bg-[#2E2413] hover:bg-[#FEEFCF] border border-amber-200/60 dark:border-amber-800/50 flex flex-col items-center justify-center gap-2 group transition-all text-center"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-navy-950 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <FileText className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-[11px] font-bold text-navy-900 dark:text-amber-200 leading-tight">
                  View Notes
                </span>
              </button>

              {/* 4. View Report */}
              <button
                onClick={() => onNavigate('progress')}
                className="p-3 rounded-2xl bg-[#E8F8F5] dark:bg-[#0E2C2B] hover:bg-[#D5F2ED] border border-teal-200/60 dark:border-teal-800/50 flex flex-col items-center justify-center gap-2 group transition-all text-center"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-[11px] font-bold text-navy-900 dark:text-emerald-200 leading-tight">
                  View Report
                </span>
              </button>

            </div>

          </div>

        </div>

        {/* =====================================================================
            RIGHT COLUMN (~58% width)
           ===================================================================== */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Card C: Upcoming Schedule */}
          <div className="rounded-[24px] bg-white dark:bg-[#0B1528] border border-slate-200/90 dark:border-navy-800 p-5 sm:p-6 shadow-soft">
            
            {/* Header: Title + View All */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-navy-800/80">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-navy-950 dark:text-white">
                  Upcoming Schedule
                </h3>
              </div>

              <button 
                onClick={() => onNavigate('course-c')}
                className="text-xs font-bold text-slate-500 hover:text-navy-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Schedule Row Item (Matches Reference: 28 Nov | Data Structures & Algorithms | 7:00 PM - 8:30 PM | Join Class) */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3.5 rounded-2xl bg-[#F0F8FF] dark:bg-[#0C1E36] border border-blue-100 dark:border-blue-900/40">
              
              <div className="flex items-center gap-4">
                
                {/* Date Box: 28 Nov */}
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#112440] border border-blue-200/80 dark:border-blue-800/60 flex flex-col items-center justify-center shadow-2xs flex-shrink-0">
                  <span className="text-xl font-black text-navy-950 dark:text-white leading-none">
                    28
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mt-0.5">
                    Nov
                  </span>
                </div>

                {/* Vertical Divider */}
                <div className="h-10 w-[2px] bg-blue-200 dark:bg-blue-800/60 hidden sm:block" />

                {/* Class Details */}
                <div>
                  <h4 className="font-bold text-sm text-navy-950 dark:text-white leading-snug">
                    Data Structures & Algorithms
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>7:00 PM – 8:30 PM</span>
                  </p>
                </div>

              </div>

              {/* Action Button: Join Class */}
              <button
                onClick={() => onNavigate('course-c')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0B1528] hover:bg-[#13223B] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all flex-shrink-0"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Join Class</span>
              </button>

            </div>

          </div>

          {/* Card D: Recommended for You */}
          <div className="rounded-[24px] bg-white dark:bg-[#0B1528] border border-slate-200/90 dark:border-navy-800 p-5 sm:p-6 shadow-soft space-y-4">
            
            {/* Header: Title + View All */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-sm">⭐</span>
                <h3 className="font-extrabold text-base text-navy-950 dark:text-white">
                  Recommended for You
                </h3>
              </div>

              <button 
                onClick={() => onNavigate('course-c')}
                className="text-xs font-bold text-slate-500 hover:text-navy-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3 Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              
              {/* Course 1: C++ Programming */}
              <div className="rounded-2xl bg-[#0E1F36] border border-[#1C3A61] overflow-hidden text-white flex flex-col justify-between group shadow-soft-sm hover:shadow-soft transition-all">
                {/* Banner with code icon and cyan wave */}
                <div className="relative h-20 bg-gradient-to-r from-[#0C1A2E] to-[#0A263D] p-3 flex items-center justify-between overflow-hidden">
                  <div className="absolute right-0 bottom-0 w-24 h-20 bg-gradient-to-tl from-cyan-400/30 to-transparent rounded-tl-full pointer-events-none" />
                  <span className="text-2xl font-black text-cyan-300 font-mono tracking-wider">&lt;/&gt;</span>
                </div>

                <div className="p-3.5 space-y-2.5">
                  <div>
                    <h4 className="font-bold text-xs text-white group-hover:text-teal-300 transition-colors truncate">
                      C++ Programming
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Beginner • 4.5 ★
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigate('course-cpp')}
                    className="w-full py-1.5 px-3 rounded-full bg-[#117684] hover:bg-[#168E9F] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Start Course</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Course 2: Python Basics */}
              <div className="rounded-2xl bg-[#141A36] border border-[#252C59] overflow-hidden text-white flex flex-col justify-between group shadow-soft-sm hover:shadow-soft transition-all">
                {/* Banner with Python icon and purple wave */}
                <div className="relative h-20 bg-gradient-to-r from-[#121630] to-[#1C1F45] p-3 flex items-center justify-between overflow-hidden">
                  <div className="absolute right-0 bottom-0 w-24 h-20 bg-gradient-to-tl from-purple-500/30 to-transparent rounded-tl-full pointer-events-none" />
                  <span className="text-2xl">🐍</span>
                </div>

                <div className="p-3.5 space-y-2.5">
                  <div>
                    <h4 className="font-bold text-xs text-white group-hover:text-purple-300 transition-colors truncate">
                      Python Basics
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Beginner • 4.7 ★
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigate('course-c')}
                    className="w-full py-1.5 px-3 rounded-full bg-[#6D42C7] hover:bg-[#7D4DE0] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Start Course</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Course 3: Web Development */}
              <div className="rounded-2xl bg-[#1F1E29] border border-[#3D374D] overflow-hidden text-white flex flex-col justify-between group shadow-soft-sm hover:shadow-soft transition-all">
                {/* Banner with Globe icon and amber wave */}
                <div className="relative h-20 bg-gradient-to-r from-[#1A1826] to-[#2E283E] p-3 flex items-center justify-between overflow-hidden">
                  <div className="absolute right-0 bottom-0 w-24 h-20 bg-gradient-to-tl from-amber-500/30 to-transparent rounded-tl-full pointer-events-none" />
                  <Globe className="w-6 h-6 text-amber-300" />
                </div>

                <div className="p-3.5 space-y-2.5">
                  <div>
                    <h4 className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors truncate">
                      Web Development
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Intermediate • 4.6 ★
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigate('course-c')}
                    className="w-full py-1.5 px-3 rounded-full bg-[#D97706] hover:bg-[#F59E0B] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Start Course</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
