import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProgress } from '@/context/ProgressContext';
import { db } from '@/services/db';
import { 
  BookOpen, ArrowRight, CheckCircle2, 
  FileText, Zap, BarChart2, Award, 
  X
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (route: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { 
    getCProgressPercentage, 
    getCppProgressPercentage, 
  } = useProgress();

  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);

  const cPercent = getCProgressPercentage();
  const cppPercent = getCppProgressPercentage();

  return (
    <div className="max-w-[1520px] w-full max-w-full mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-5 space-y-4 sm:space-y-5 overflow-x-hidden animate-in fade-in duration-200">
      
      {/* =========================================================================
          1. TOP ACTION BAR (Strictly One Line on Mobile & Desktop)
          - View Note
          - Live Test
          - View Report
          - Achievement
         ========================================================================= */}
      <section className="w-full">
        <div className="grid grid-cols-4 gap-2 sm:gap-3.5">
          
          {/* Action 1: View Note */}
          <button
            onClick={() => onNavigate('bookmarks')}
            className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-amber-50/90 dark:bg-amber-950/25 border border-amber-200/80 dark:border-amber-800/40 hover:bg-amber-100/80 dark:hover:bg-amber-900/30 text-amber-900 dark:text-amber-200 flex flex-col items-center justify-center gap-1.5 shadow-2xs hover:shadow-soft transition-all duration-200 active:scale-95 group"
            title="View Saved Notes & Bookmarks"
          >
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-amber-500 text-navy-950 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform flex-shrink-0">
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </div>
            <span className="text-[10px] sm:text-xs font-black tracking-tight text-center truncate w-full">
              View Note
            </span>
          </button>

          {/* Action 2: Live Test */}
          <button
            onClick={() => onNavigate('practical-lab?course=c')}
            className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-cyan-50/90 dark:bg-cyan-950/25 border border-cyan-200/80 dark:border-cyan-800/40 hover:bg-cyan-100/80 dark:hover:bg-cyan-900/30 text-cyan-900 dark:text-cyan-200 flex flex-col items-center justify-center gap-1.5 shadow-2xs hover:shadow-soft transition-all duration-200 active:scale-95 group"
            title="Launch Practical Code Tests & Sandbox"
          >
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-cyan-500 text-navy-950 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform flex-shrink-0">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current stroke-[2.5]" />
            </div>
            <span className="text-[10px] sm:text-xs font-black tracking-tight text-center truncate w-full">
              Live Test
            </span>
          </button>

          {/* Action 3: View Report */}
          <button
            onClick={() => onNavigate('progress')}
            className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/25 border border-emerald-200/80 dark:border-emerald-800/40 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/30 text-emerald-900 dark:text-emerald-200 flex flex-col items-center justify-center gap-1.5 shadow-2xs hover:shadow-soft transition-all duration-200 active:scale-95 group"
            title="View Academic Progress & Reports"
          >
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform flex-shrink-0">
              <BarChart2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </div>
            <span className="text-[10px] sm:text-xs font-black tracking-tight text-center truncate w-full">
              View Report
            </span>
          </button>

          {/* Action 4: Achievement */}
          <button
            onClick={() => setIsAchievementModalOpen(true)}
            className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-purple-50/90 dark:bg-purple-950/25 border border-purple-200/80 dark:border-purple-800/40 hover:bg-purple-100/80 dark:hover:bg-purple-900/30 text-purple-900 dark:text-purple-200 flex flex-col items-center justify-center gap-1.5 shadow-2xs hover:shadow-soft transition-all duration-200 active:scale-95 group"
            title="View Student Achievements & Badges"
          >
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-purple-600 text-amber-300 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform flex-shrink-0">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </div>
            <span className="text-[10px] sm:text-xs font-black tracking-tight text-center truncate w-full">
              Achievement
            </span>
          </button>

        </div>
      </section>

      {/* =========================================================================
          2. COMPACT STUDYHUB BANNER ("little bit small")
          - Matches reference mockup in media_1795861432071_48ab522b.jpg
          - Reduced padding, smaller laptop graphic, horizontal balance on mobile
          - Badges: 2 Courses • 10 Units | 85% Progress | 12 Achievements
          - Script Quote: “Dream it... Study it... Achieve it...”
         ========================================================================= */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#061223] via-[#091D37] to-[#0A2E44] border border-[#16335C] text-white p-3.5 sm:p-5 lg:p-6 shadow-md">
        {/* Ambient glow & waves */}
        <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute right-0 bottom-0 w-64 h-24 bg-gradient-to-t from-teal-500/15 via-teal-500/5 to-transparent rounded-tl-full pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Left: 3D Laptop with Glowing Cap & Books (Scaled Down for Compactness) */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="relative w-20 h-16 sm:w-32 sm:h-24 lg:w-40 lg:h-28 flex items-center justify-center">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl" />

              {/* 3D Isometric SVG Illustration */}
              <svg viewBox="0 0 240 180" className="w-full h-full drop-shadow-md">
                <defs>
                  <linearGradient id="screenBgCompact" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#081426" />
                    <stop offset="100%" stopColor="#04263A" />
                  </linearGradient>
                  <linearGradient id="capGradCompact" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                  <linearGradient id="book1Compact" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D97706" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                  <linearGradient id="book2Compact" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                  <linearGradient id="book3Compact" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0D9488" />
                    <stop offset="100%" stopColor="#2DD4BF" />
                  </linearGradient>
                </defs>

                {/* Stack of Books */}
                <g transform="translate(10, 95)">
                  <rect x="0" y="32" width="65" height="14" rx="3" fill="url(#book1Compact)" />
                  <rect x="4" y="34" width="58" height="2" fill="#FEF3C7" opacity="0.6" />
                  <rect x="5" y="16" width="60" height="14" rx="3" fill="url(#book2Compact)" />
                  <rect x="8" y="18" width="54" height="2" fill="#EDE9FE" opacity="0.6" />
                  <rect x="8" y="0" width="56" height="14" rx="3" fill="url(#book3Compact)" />
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
                <polygon points="74,40 192,40 199,133 72,133" fill="url(#screenBgCompact)" />

                {/* Glowing Graduation Cap on Screen */}
                <ellipse cx="135" cy="85" rx="32" ry="24" fill="#06B6D4" opacity="0.25" />
                <polygon points="135,62 165,74 135,86 105,74" fill="url(#capGradCompact)" filter="drop-shadow(0 0 5px #22D3EE)" />
                <path d="M 115 79 Q 135 96 155 79 L 155 85 Q 135 102 115 85 Z" fill="#0284C7" />
                <circle cx="135" cy="74" r="2.5" fill="#FEF08A" />
                <path d="M 135 74 Q 158 78 160 88" fill="none" stroke="#FEF08A" strokeWidth="1.5" />
                <circle cx="160" cy="89" r="1.5" fill="#FEF08A" />
              </svg>
            </div>
          </div>

          {/* Center Content: Title, Subtitle & Compact Pills */}
          <div className="flex-1 min-w-0 space-y-1 sm:space-y-1.5">
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight">
                Study<span className="text-[#38BDF8]">Hub</span>
              </h1>
              <span className="text-[10px] sm:text-xs text-slate-300 font-medium hidden xs:inline">
                • Learn • Practice • Grow
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-300 font-medium xs:hidden">
              Learn • Practice • Grow
            </p>

            {/* Badges: 2 Courses • 10 Units | 85% Progress | 12 Achievements */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5">
              <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#12233D]/90 border border-[#20375E] text-[10px] sm:text-xs font-semibold text-slate-200">
                <BookOpen className="w-3 h-3 text-cyan-400" />
                <span>2 Courses • 10 Units</span>
              </div>

              <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#12233D]/90 border border-[#20375E] text-[10px] sm:text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>85% Progress</span>
              </div>

              <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#12233D]/90 border border-[#20375E] text-[10px] sm:text-xs font-semibold text-slate-200">
                <span className="text-amber-400">★</span>
                <span>12 Achievements</span>
              </div>
            </div>

            {/* Quote on Mobile & Desktop */}
            <div className="pt-0.5">
              <p className="font-serif italic text-[11px] sm:text-xs lg:text-sm text-slate-200 tracking-wide font-light leading-snug drop-shadow">
                &ldquo;Dream it... Study it... <span className="font-bold text-amber-300">Achieve it...</span>&rdquo;
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. ACADEMY LEARNING CURRICULUM
          - Clean header: Academy Learning Curriculum
          - 2 Course Cards: C Programming & C++ Programming
         ========================================================================= */}
      <section className="space-y-3 pt-1">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-500" />
            <h2 className="font-extrabold text-sm sm:text-base text-navy-950 dark:text-white">
              Academy Learning Curriculum
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            2 Courses Available
          </span>
        </div>

        {/* 2 Course Cards Grid (C Programming & C++ Programming) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5">
          
          {/* Course 1: C Programming */}
          <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-navy-800 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-soft transition-all group">
            <div>
              {/* Top Graphic Banner with Cyan/Blue Wave */}
              <div className="h-20 sm:h-24 bg-gradient-to-r from-[#0C1F38] via-[#0E2E50] to-[#0A4366] flex items-center justify-center relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-20 h-16 bg-cyan-400/20 rounded-tl-full" />
                <div className="flex items-center gap-2 relative z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center font-mono font-black text-xl sm:text-2xl drop-shadow">
                    C
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-sm sm:text-base text-navy-950 dark:text-white truncate">
                    C Programming
                  </h3>
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
          <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-navy-800 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-soft transition-all group">
            <div>
              {/* Top Graphic Banner with Purple/Coral Wave */}
              <div className="h-20 sm:h-24 bg-gradient-to-r from-[#171433] via-[#241B4E] to-[#391F6B] flex items-center justify-center relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-20 h-16 bg-purple-400/20 rounded-tl-full" />
                <div className="flex items-center gap-2 relative z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-purple-500/20 border border-purple-400/40 text-purple-300 flex items-center justify-center font-mono font-black text-xl sm:text-2xl drop-shadow">
                    C++
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-sm sm:text-base text-navy-950 dark:text-white truncate">
                    C++ Programming
                  </h3>
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
      </section>

      {/* Quick Achievement Pop-up Modal */}
      {isAchievementModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  🏆
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-navy-950 dark:text-white">
                  Student Achievements & Badges
                </h3>
              </div>
              <button
                onClick={() => setIsAchievementModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40">
                <span className="text-xl">🔥</span>
                <h4 className="font-bold text-xs text-navy-950 dark:text-amber-200 mt-1">7-Day Streak</h4>
                <p className="text-[10px] text-slate-500">Studied consistently</p>
              </div>

              <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-800/40">
                <span className="text-xl">🎓</span>
                <h4 className="font-bold text-xs text-navy-950 dark:text-teal-200 mt-1">Unit 1 Master</h4>
                <p className="text-[10px] text-slate-500">100% C Unit 1 completed</p>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/40">
                <span className="text-xl">⚡</span>
                <h4 className="font-bold text-xs text-navy-950 dark:text-purple-200 mt-1">Algorithm Ace</h4>
                <p className="text-[10px] text-slate-500">Flowchart & logic solved</p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/40">
                <span className="text-xl">💻</span>
                <h4 className="font-bold text-xs text-navy-950 dark:text-blue-200 mt-1">Code Pioneer</h4>
                <p className="text-[10px] text-slate-500">First compiler build run</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setIsAchievementModalOpen(false);
                  onNavigate('progress');
                }}
                className="w-full py-2.5 rounded-xl bg-[#0B1528] hover:bg-[#13223B] text-white text-xs font-bold transition-all shadow-xs"
              >
                View Full Progress & Report
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
