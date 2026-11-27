import React, { useState } from 'react';
import { db } from '@/services/db';
import { useAuth } from '@/context/AuthContext';
import { useProgress } from '@/context/ProgressContext';
import { CourseId, Stage } from '@/types';
import { TopicStageAccordion } from '@/components/stages/TopicStageAccordion';
import { StageModalReader } from '@/components/stages/StageModalReader';
import { 
  BookOpen, Terminal, CheckCircle2, Circle, Clock, Award, 
  ArrowRight, ChevronLeft, ChevronRight, Play, ChevronDown, ChevronUp,
  Layers, Sparkles, BarChart2, BarChart3, Trophy, Flame, 
  Check, Lock, GraduationCap, Code2, FlaskConical, Star
} from 'lucide-react';

interface CourseViewProps {
  courseId: CourseId;
  onNavigate: (route: string) => void;
  onOpenUnit: (unitId: string) => void;
}

export const CourseView: React.FC<CourseViewProps> = ({ courseId, onNavigate, onOpenUnit }) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.id || 'user-student-1';

  const { 
    cProgress, 
    cppProgress, 
    otherProgress, 
    getCProgressPercentage, 
    getCppProgressPercentage, 
    getOtherProgressPercentage 
  } = useProgress();

  const [activeTab, setActiveTab] = useState<'units' | 'overview' | 'achievements'>('units');
  const [selectedUnitId, setSelectedUnitId] = useState<string>(() => {
    return courseId === 'c' ? 'c-unit-1' : courseId === 'cpp' ? 'cpp-unit-1' : 'other-unit-1';
  });
  const [isUnitDetailCollapsed, setIsUnitDetailCollapsed] = useState<boolean>(false);
  const [activeStageData, setActiveStageData] = useState<{ stage: Stage; allTopicStages: Stage[] } | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const course = db.getCourse(courseId);
  const units = db.getUnits(courseId);
  const practicals = db.getPracticals(courseId);
  const progress = courseId === 'c' ? cProgress : courseId === 'cpp' ? cppProgress : otherProgress;
  const progressPercent = courseId === 'c' 
    ? getCProgressPercentage() 
    : courseId === 'cpp' 
    ? getCppProgressPercentage() 
    : getOtherProgressPercentage();

  // Find currently selected unit
  const selectedUnit = units.find(u => u.id === selectedUnitId) || units[0];

  if (!course) return null;

  // Preset badge colors matching the reference design for 5 units
  const unitBadgeColors = [
    { bg: 'bg-[#F59E0B]', text: 'text-navy-950', ring: 'ring-amber-400/40', bar: 'bg-[#10B981]' }, // Unit 1 Amber
    { bg: 'bg-[#8B5CF6]', text: 'text-white', ring: 'ring-purple-400/40', bar: 'bg-[#8B5CF6]' },    // Unit 2 Purple
    { bg: 'bg-[#14B8A6]', text: 'text-white', ring: 'ring-teal-400/40', bar: 'bg-[#14B8A6]' },      // Unit 3 Teal
    { bg: 'bg-[#F43F5E]', text: 'text-white', ring: 'ring-rose-400/40', bar: 'bg-[#F43F5E]' },      // Unit 4 Coral
    { bg: 'bg-[#06B6D4]', text: 'text-white', ring: 'ring-cyan-400/40', bar: 'bg-[#06B6D4]' },      // Unit 5 Cyan
  ];

  // Preset display percentages for demo harmony matching reference
  const unitDemoPercentages: Record<string, number> = {
    'c-unit-1': 100,
    'c-unit-2': 75,
    'c-unit-3': 50,
    'c-unit-4': 25,
    'c-unit-5': 0,
  };

  const isSelectedUnitCompleted = selectedUnit 
    ? (unitDemoPercentages[selectedUnit.id] === 100 || progress.completedUnitIds.includes(selectedUnit.id)) 
    : false;

  return (
    <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-200">
      
      {/* =========================================================================
          1. HERO BANNER (Matches Reference Mockup)
          - Deep cosmic midnight navy background with stars
          - 3D Laptop with glowing cyan C screen, books, coffee mug with </>
          - Large golden-yellow C logo + "C Programming"
          - Stats pill row: 5 Units | 1 Practical Lab | Overall Progress 60%
          - Script quote: "Dream it... Code it... Achieve it..."
         ========================================================================= */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#091224] via-[#0E1A33] to-[#122444] border border-[#1C3259] text-white p-6 sm:p-8 shadow-xl">
        {/* Cosmic Starry Atmosphere */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 -bottom-16 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          
          {/* Left: 3D Laptop with Glowing Cyan 'C' & Books Illustration */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="relative w-48 h-36 sm:w-56 sm:h-40 flex items-center justify-center">
              {/* Glowing back aura */}
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl" />

              {/* 3D Isometric SVG Vector Composition */}
              <svg viewBox="0 0 240 180" className="w-full h-full drop-shadow-2xl">
                <defs>
                  <linearGradient id="laptopScreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0B1528" />
                    <stop offset="100%" stopColor="#032D42" />
                  </linearGradient>
                  <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#22D3EE" />
                  </linearGradient>
                  <linearGradient id="book1Grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D97706" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                  <linearGradient id="book2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                  <linearGradient id="mugGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E293B" />
                    <stop offset="100%" stopColor="#0F172A" />
                  </linearGradient>
                </defs>

                {/* Stack of Books at bottom left */}
                <g transform="translate(10, 95)">
                  {/* Book 1 (Amber) */}
                  <rect x="0" y="32" width="65" height="14" rx="3" fill="url(#book1Grad)" />
                  <rect x="4" y="34" width="58" height="2" fill="#FEF3C7" opacity="0.6" />
                  {/* Book 2 (Purple) */}
                  <rect x="5" y="16" width="60" height="14" rx="3" fill="url(#book2Grad)" />
                  <rect x="8" y="18" width="54" height="2" fill="#EDE9FE" opacity="0.6" />
                  {/* Book 3 (Teal) */}
                  <rect x="8" y="0" width="56" height="14" rx="3" fill="#0D9488" />
                  <rect x="12" y="2" width="48" height="2" fill="#CCFBF1" opacity="0.6" />
                </g>

                {/* Coffee Mug on bottom left */}
                <g transform="translate(26, 120)">
                  <rect x="0" y="0" width="22" height="26" rx="4" fill="url(#mugGrad)" stroke="#334155" strokeWidth="1" />
                  {/* Mug Handle */}
                  <path d="M -4 6 C -8 6 -8 18 -4 18" fill="none" stroke="#334155" strokeWidth="2.5" />
                  {/* Code symbol on mug */}
                  <text x="4" y="17" fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>
                </g>

                {/* Isometric Laptop Base */}
                <polygon points="75,138 220,138 200,154 55,154" fill="#334155" stroke="#475569" strokeWidth="1" />
                <polygon points="80,140 215,140 197,152 62,152" fill="#1E293B" />
                {/* Touchpad */}
                <polygon points="120,143 158,143 154,150 116,150" fill="#0F172A" />

                {/* Isometric Laptop Screen */}
                <polygon points="78,35 212,35 220,138 75,138" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
                <polygon points="84,40 206,40 214,133 82,133" fill="url(#laptopScreenGrad)" />

                {/* Screen Neon Glow & C Logo */}
                <ellipse cx="148" cy="85" rx="36" ry="26" fill="#06B6D4" opacity="0.25" />
                <circle cx="148" cy="86" r="22" fill="none" stroke="url(#cyanGlow)" strokeWidth="6" strokeDasharray="100 35" strokeDashoffset="12" filter="drop-shadow(0 0 8px #22D3EE)" />
                <text x="140" y="94" fill="#E0F2FE" fontSize="24" fontWeight="900" fontFamily="sans-serif">C</text>

                {/* Sparkles / Stars */}
                <circle cx="225" cy="50" r="1.5" fill="#38BDF8" />
                <polygon points="230,70 232,75 237,77 232,79 230,84 228,79 223,77 228,75" fill="#FBBF24" opacity="0.8" />
                <polygon points="65,40 66,43 69,44 66,45 65,48 64,45 61,44 64,43" fill="#38BDF8" opacity="0.9" />
              </svg>
            </div>
          </div>

          {/* Center Info: Title, Subtitle, Stats Pill Row */}
          <div className="flex-1 text-center lg:text-left space-y-3">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              {/* Golden Yellow 'C' Logo Badge */}
              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-navy-950 font-black text-2xl flex items-center justify-center shadow-md flex-shrink-0">
                {courseId === 'c' ? 'C' : courseId === 'cpp' ? 'C++' : 'DEV'}
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                {course.title}
              </h1>
            </div>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              {course.subtitle || 'Master the fundamentals of C from basics to advanced concepts.'}
            </p>

            {/* Horizontal Stats Pill Row (Matches Reference Exactly) */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {/* Units Count Pill */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15243F] border border-[#233A63] text-xs font-semibold text-slate-200">
                <BookOpen className="w-3.5 h-3.5 text-slate-300" />
                <span>{units.length} Units</span>
              </div>

              {/* Practical Lab Pill */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15243F] border border-[#233A63] text-xs font-semibold text-slate-200">
                <FlaskConical className="w-3.5 h-3.5 text-slate-300" />
                <span>1 Practical Lab</span>
              </div>

              {/* Overall Progress with Amber Progress Bar Pill */}
              <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#15243F] border border-[#233A63] text-xs font-semibold text-slate-200">
                <BarChart3 className="w-3.5 h-3.5 text-slate-300" />
                <span>Overall Progress</span>
                <div className="w-20 bg-[#0C1628] h-2 rounded-full overflow-hidden border border-[#1A2E4E]">
                  <div 
                    className="h-full bg-amber-400 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.max(progressPercent, 60)}%` }}
                  />
                </div>
                <span className="font-bold text-amber-300 font-mono">
                  {Math.max(progressPercent, 60)}%
                </span>
              </div>
            </div>
          </div>

          {/* Right: Script Quote ("Dream it... Code it... Achieve it...") */}
          <div className="flex-shrink-0 text-center lg:text-right px-4 py-2">
            <div className="relative inline-block">
              <span className="absolute -top-3 -right-3 text-amber-300 text-xs animate-pulse">✦</span>
              <p className="font-serif italic text-lg sm:text-2xl text-slate-200 tracking-wide font-light leading-snug drop-shadow">
                &ldquo;Dream it...<br />
                <span className="font-medium text-amber-200">Code it... Achieve it...</span>&rdquo;
              </p>
              <span className="absolute -bottom-2 -left-2 text-cyan-300 text-[10px]">✦</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. TAB NAVIGATION BAR (Units | Progress Overview | Achievements)
         ========================================================================= */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-navy-800/80 pb-1">
        <button
          onClick={() => setActiveTab('units')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'units'
              ? 'bg-[#0B1528] text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Units</span>
        </button>

        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-[#0B1528] text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-900'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Progress Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('achievements')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'achievements'
              ? 'bg-[#0B1528] text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-900'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Achievements</span>
        </button>
      </div>

      {/* =========================================================================
          3. MASTER-DETAIL 2-COLUMN SPLIT VIEW (Under Units Tab)
         ========================================================================= */}
      {activeTab === 'units' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* =====================================================================
              LEFT COLUMN (~35% width): 5 Unit Cards Stack + Learning Streak Widget
             ===================================================================== */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-3.5">
            {units.map((unit, index) => {
              const isSelected = selectedUnitId === unit.id;
              const badgeStyle = unitBadgeColors[index % unitBadgeColors.length];
              
              // Progress metric
              const completedTopicsCount = unit.topics.filter(t => progress.completedTopicIds.includes(t.id)).length;
              const dynamicPercent = Math.round((completedTopicsCount / Math.max(unit.topics.length, 1)) * 100);
              const displayPercent = unitDemoPercentages[unit.id] !== undefined ? unitDemoPercentages[unit.id] : dynamicPercent;
              const isPassed = displayPercent === 100 || progress.completedUnitIds.includes(unit.id);

              return (
                <div
                  key={unit.id}
                  onClick={() => setSelectedUnitId(unit.id)}
                  className={`relative p-4 sm:p-4.5 rounded-2xl border transition-all duration-200 cursor-pointer select-none group ${
                    isSelected
                      ? 'bg-[#FFF8EE] dark:bg-[#162744] border-[#F6D7A2] dark:border-amber-500/40 shadow-soft-sm ring-1 ring-amber-400/30'
                      : 'bg-white dark:bg-[#0B1528] border-slate-200/90 dark:border-navy-800 hover:border-slate-300 hover:shadow-soft-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    
                    {/* Left: Colored Circle Badge & Titles */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Circle Number Badge (Amber 1, Purple 2, Teal 3, Coral 4, Cyan 5) */}
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${badgeStyle.bg} ${badgeStyle.text} shadow-xs`}>
                        {unit.unitNumber || (index + 1)}
                      </div>

                      <div className="min-w-0">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                          Unit {unit.unitNumber || (index + 1)}
                        </h4>
                        <p className={`font-bold text-sm truncate ${
                          isSelected ? 'text-navy-950 dark:text-amber-200' : 'text-navy-900 dark:text-slate-100'
                        }`}>
                          {unit.title.replace(/^Unit\s*\d+[\s–—:]*/i, '')}
                        </p>
                      </div>
                    </div>

                    {/* Right: Progress percentage / checkmark + Chevron */}
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      {/* Progress bar + percentage */}
                      <div className="flex items-center gap-2">
                        <div className="w-14 bg-slate-200 dark:bg-navy-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${badgeStyle.bar}`}
                            style={{ width: `${displayPercent}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                          {displayPercent}%
                        </span>
                      </div>

                      {/* Checkmark circle if completed */}
                      {isPassed && (
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </div>
                      )}

                      {/* Right Chevron */}
                      <ChevronRight className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-amber-600 dark:text-amber-300 translate-x-0.5' : 'text-slate-400'
                      }`} />
                    </div>

                  </div>
                </div>
              );
            })}

            {/* Learning Streak Widget (Matches Reference Mockup) */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FFF5E6] to-[#FFF0D9] dark:from-[#18253D] dark:to-[#141F33] border border-[#FDE3B8] dark:border-amber-500/20 shadow-soft-sm flex items-center justify-between gap-3 cursor-pointer group hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400 text-navy-950 flex items-center justify-center font-bold text-lg shadow-sm flex-shrink-0">
                  🏆
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-navy-950 dark:text-white leading-tight">
                    You&apos;re on a <span className="text-amber-600 dark:text-amber-400">7 Day Learning Streak! 🔥</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Keep it up!
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>

            {/* Quick Game Quest Button for C */}
            {courseId === 'c' && (
              <button
                onClick={() => onNavigate('c-game')}
                className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-teal-500/10 to-teal-500/5 hover:from-teal-500/20 hover:to-teal-500/10 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-bold flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🎮</span>
                  <span>Interactive C Game (25 Step Journey)</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

          </div>

          {/* =====================================================================
              RIGHT COLUMN (~65% width): Selected Unit Detail + 22 Stage Grid Accordions
             ===================================================================== */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            
            {/* Selected Unit Main Container Card */}
            <div className="rounded-[24px] bg-white dark:bg-[#0B1528] border border-slate-200/90 dark:border-navy-800 shadow-soft overflow-hidden">
              
              {/* Unit Header (Book Icon + Title + Completed Pill + Collapse Chevron) */}
              <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-navy-800/80 flex items-center justify-between gap-4">
                
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Book Squircle Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-[#0F1E36] text-amber-300 flex items-center justify-center font-bold shadow-xs flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-amber-300" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-black text-navy-950 dark:text-white truncate">
                      Unit {selectedUnit?.unitNumber} – {selectedUnit?.title.replace(/^Unit\s*\d+[\s–—:]*/i, '')}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {selectedUnit?.description || 'Learn the basics of C programming language.'}
                    </p>
                  </div>
                </div>

                {/* Right Status & Collapse Toggle */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {isSelectedUnitCompleted ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#10B981] text-white flex items-center gap-1.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Unit Completed</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50">
                      In Progress
                    </span>
                  )}

                  <button
                    onClick={() => setIsUnitDetailCollapsed(!isUnitDetailCollapsed)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-900 text-slate-500 transition-colors"
                    title={isUnitDetailCollapsed ? 'Expand Unit' : 'Collapse Unit'}
                  >
                    {isUnitDetailCollapsed ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronUp className="w-5 h-5" />
                    )}
                  </button>
                </div>

              </div>

              {/* Topic Accordions with 22-Stage Grid */}
              {!isUnitDetailCollapsed && (
                <div className="p-4 sm:p-6 space-y-3 bg-[#FAF9F7]/40 dark:bg-navy-950/20">
                  {selectedUnit?.topics.map((topic, tIdx) => (
                    <TopicStageAccordion
                      key={topic.id}
                      topic={topic}
                      courseId={courseId}
                      userId={userId}
                      isInitiallyExpanded={tIdx === 0}
                      onSelectStage={(stage, allTopicStages) => {
                        setActiveStageData({ stage, allTopicStages });
                      }}
                      onOpenTopicReader={() => onOpenUnit(selectedUnit.id)}
                    />
                  ))}
                </div>
              )}

            </div>

            {/* Bottom Practical Banner (Matches Reference Mockup: Complete all topics to unlock practical) */}
            <div className="rounded-2xl p-4 sm:p-4.5 bg-[#E8EFFB] dark:bg-[#0E1C33] border border-blue-100 dark:border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-soft-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-navy-950 dark:text-blue-100 text-center sm:text-left">
                  Complete all topics to unlock the practical section!
                </p>
              </div>

              <button
                onClick={() => onNavigate(`practical-lab?course=${courseId}`)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0B1528] hover:bg-[#13223B] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all flex-shrink-0"
              >
                <span>&lt;/&gt; Go to Practical Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          4. PROGRESS OVERVIEW TAB
         ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="bg-white dark:bg-[#0B1528] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-navy-800 shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                Curriculum Progression Matrix
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Detailed view of completed topics, stages, and unit masteries across {course.title}.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
              {progressPercent}% Complete
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {units.map((unit, idx) => {
              const comp = unit.topics.filter(t => progress.completedTopicIds.includes(t.id)).length;
              const pct = unitDemoPercentages[unit.id] !== undefined ? unitDemoPercentages[unit.id] : Math.round((comp / unit.topics.length) * 100);
              return (
                <div key={unit.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Unit {idx + 1}</span>
                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400">{pct}%</span>
                  </div>
                  <h4 className="font-bold text-sm text-navy-900 dark:text-slate-100 truncate">
                    {unit.title.replace(/^Unit\s*\d+[\s–—:]*/i, '')}
                  </h4>
                  <div className="w-full bg-slate-200 dark:bg-navy-800 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          5. ACHIEVEMENTS TAB
         ========================================================================= */}
      {activeTab === 'achievements' && (
        <div className="bg-white dark:bg-[#0B1528] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-navy-800 shadow-soft space-y-6">
          <div>
            <h3 className="text-xl font-bold text-navy-950 dark:text-white">
              Student Badges & Achievements
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Badges unlocked through stage completions, problem-solving, and streak persistence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 flex items-center gap-4">
              <div className="text-3xl">🔥</div>
              <div>
                <h4 className="font-bold text-sm text-navy-900 dark:text-amber-200">7-Day Streak</h4>
                <p className="text-xs text-slate-500">Studied 7 consecutive days</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/40 flex items-center gap-4">
              <div className="text-3xl">🎓</div>
              <div>
                <h4 className="font-bold text-sm text-navy-900 dark:text-teal-200">Unit 1 Master</h4>
                <p className="text-xs text-slate-500">Completed all Unit 1 stages</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40 flex items-center gap-4">
              <div className="text-3xl">⚡</div>
              <div>
                <h4 className="font-bold text-sm text-navy-900 dark:text-purple-200">Algorithm Ace</h4>
                <p className="text-xs text-slate-500">Solved flowchart & pseudocode</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 flex items-center gap-4">
              <div className="text-3xl">💻</div>
              <div>
                <h4 className="font-bold text-sm text-navy-900 dark:text-blue-200">Compiler Pioneer</h4>
                <p className="text-xs text-slate-500">Ran your first C execution</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          6. INTERACTIVE STAGE LESSON MODAL READER
         ========================================================================= */}
      {activeStageData && (
        <StageModalReader
          stage={activeStageData.stage}
          allStages={activeStageData.allTopicStages}
          courseId={courseId}
          userId={userId}
          onClose={() => setActiveStageData(null)}
          onNavigateStage={(nextStage) => {
            setActiveStageData({
              stage: nextStage,
              allTopicStages: activeStageData.allTopicStages
            });
          }}
          onProgressUpdated={() => {
            setRefreshKey(prev => prev + 1);
          }}
        />
      )}

    </div>
  );
};
