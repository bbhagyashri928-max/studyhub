import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProgress } from '@/context/ProgressContext';
import { db } from '@/services/db';
import { 
  Terminal, Code2, Flame, Award, BookOpen, ArrowRight, Play, 
  CheckCircle2, Clock, Sparkles, Target, Bookmark as BookmarkIcon, 
  ChevronRight, Calendar, Cpu 
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (route: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { 
    cProgress, 
    cppProgress, 
    otherProgress,
    getCProgressPercentage, 
    getCppProgressPercentage, 
    getOtherProgressPercentage,
    getOverallProgressPercentage 
  } = useProgress();

  const cCourse = db.getCourse('c');
  const cppCourse = db.getCourse('cpp');
  const otherCourse = db.getCourse('other');
  const cPercent = getCProgressPercentage();
  const cppPercent = getCppProgressPercentage();
  const otherPercent = getOtherProgressPercentage();
  const overallPercent = getOverallProgressPercentage();

  // Find last visited topic for 1-click continue
  const lastTopicId = cProgress.lastVisitedTopicId || cppProgress.lastVisitedTopicId || otherProgress.lastVisitedTopicId;
  const lastTopicData = lastTopicId ? db.getTopic(lastTopicId) : null;

  // Recent topics
  const recentTopicIds = [...cProgress.completedTopicIds, ...cppProgress.completedTopicIds, ...otherProgress.completedTopicIds].slice(-4).reverse();
  const recentTopics = recentTopicIds.map(id => db.getTopic(id)).filter(Boolean);

  const announcements = db.getAnnouncements().slice(0, 2);

  const totalCompletedUnits = cProgress.completedUnitIds.length + cppProgress.completedUnitIds.length + otherProgress.completedUnitIds.length;
  const totalCompletedPracticals = cProgress.completedPracticalIds.length + cppProgress.completedPracticalIds.length + otherProgress.completedPracticalIds.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Personalized Welcome & Motivational Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-navy-950 p-6 sm:p-10 text-white shadow-soft-lg border border-navy-800">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-teal-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-3 border border-teal-500/30">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Academic Excellence & Mastery</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, <span className="text-teal-400">{currentUser?.fullName}</span>.
          </h1>

          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            &ldquo;The best way to understand systems architecture is to build it with low-level mastery in C and modern engineering in C++.&rdquo;
          </p>

          {/* Quick Metrics Pills */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-800/80 border border-navy-700">
              <Flame className="w-4 h-4 text-coral-400" />
              <span className="font-bold text-white">{currentUser?.streakDays || 1} Days</span>
              <span className="text-slate-400">Streak</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-800/80 border border-navy-700">
              <Award className="w-4 h-4 text-teal-400" />
              <span className="font-bold text-white">{totalCompletedUnits} / 10</span>
              <span className="text-slate-400">Units Certified</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-800/80 border border-navy-700">
              <Terminal className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white">{totalCompletedPracticals}</span>
              <span className="text-slate-400">Practicals Compiled</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Top Metric Cards Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Courses */}
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Courses</span>
            <BookOpen className="w-4 h-4 text-teal-500" />
          </div>
          <p className="text-2xl font-black text-navy-900 dark:text-white">3</p>
          <span className="text-xs text-teal-600 dark:text-teal-400 font-medium mt-1 block">
            C, C++ & Systems Tracks
          </span>
        </div>

        {/* Units Completed */}
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Completed Units</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-navy-900 dark:text-white">{totalCompletedUnits} <span className="text-sm text-slate-400 font-normal">/ 15</span></p>
          <span className="text-xs text-slate-500 mt-1 block">5 Units per Curriculum Track</span>
        </div>

        {/* Overall Progress */}
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Academy Progress</span>
            <Target className="w-4 h-4 text-coral-500" />
          </div>
          <p className="text-2xl font-black text-navy-900 dark:text-white">{overallPercent}%</p>
          <div className="w-full bg-slate-100 dark:bg-navy-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-coral-500 h-full rounded-full transition-all duration-500" style={{ width: `${overallPercent}%` }} />
          </div>
        </div>

        {/* Practical Programs */}
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Practical Lab Done</span>
            <Terminal className="w-4 h-4 text-lavender-600" />
          </div>
          <p className="text-2xl font-black text-navy-900 dark:text-white">{totalCompletedPracticals} <span className="text-sm text-slate-400 font-normal">Programs</span></p>
          <span className="text-xs text-slate-500 mt-1 block">Verified Sandbox Code</span>
        </div>

      </section>

      {/* 3. Continue Learning Highlight (if active) */}
      {lastTopicData && (
        <section className="p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200/80 dark:border-teal-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-teal-500 text-navy-950 mt-0.5">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                Continue Where You Left Off
              </span>
              <h3 className="text-base font-bold text-navy-900 dark:text-white">
                {lastTopicData.topic.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {lastTopicData.unit.title} • {lastTopicData.unit.courseId.toUpperCase()} Track
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate(`courses/${lastTopicData.unit.courseId}/unit/${lastTopicData.unit.id}?topic=${lastTopicData.topic.id}`)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 active:scale-95 text-navy-950 font-bold text-xs shadow-sm transition-all whitespace-nowrap"
          >
            <span>Resume Lesson</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      )}

      {/* 4. THREE MAIN COURSE CARDS - C, C++, and Systems & Essentials */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-navy-900 dark:text-white">Academy Learning Curriculums</h2>
            <p className="text-xs text-slate-500">Master procedural C, modern object-oriented C++, and systems programming engineering essentials.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* CARD 1 – C PROGRAMMING */}
          <div className="rounded-3xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 p-6 sm:p-7 shadow-soft-md hover:shadow-soft-lg transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black text-2xl font-mono border border-teal-500/20 group-hover:scale-105 transition-transform">
                  C
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300">
                  5 Units • Practical Lab
                </span>
              </div>

              <h3 className="text-xl font-bold text-navy-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                C Programming
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Master the fundamentals of procedural programming, memory architecture, low-level pointers, structures, and file I/O streams.
              </p>

              {/* Progress Bar */}
              <div className="mt-5 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Progress</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400">{cPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-navy-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full transition-all duration-500" style={{ width: `${cPercent}%` }} />
                </div>
                <span className="text-[11px] text-slate-400 block pt-0.5">
                  {cProgress.completedTopicIds.length} lessons & {cProgress.completedPracticalIds.length} practicals completed
                </span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between gap-2">
              <button
                onClick={() => onNavigate('course-c')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-navy-950 font-bold text-xs transition-all shadow-sm active:scale-95"
              >
                <span>{cPercent > 0 ? 'Continue' : 'Start C'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('practical-lab?course=c')}
                className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors"
              >
                C Lab ({db.getPracticals('c').length})
              </button>
            </div>
          </div>

          {/* CARD 2 – C++ PROGRAMMING */}
          <div className="rounded-3xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 p-6 sm:p-7 shadow-soft-md hover:shadow-soft-lg transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-coral-500/15 text-coral-600 dark:text-coral-400 flex items-center justify-center font-black text-2xl font-mono border border-coral-500/20 group-hover:scale-105 transition-transform">
                  C++
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-coral-100 dark:bg-coral-950/80 text-coral-700 dark:text-coral-300">
                  5 Units • Practical Lab
                </span>
              </div>

              <h3 className="text-xl font-bold text-navy-900 dark:text-white group-hover:text-coral-600 dark:group-hover:text-coral-400 transition-colors">
                C++ Programming
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Learn object-oriented programming, data encapsulation, polymorphism, inheritance, templates, exception handling, and STL containers.
              </p>

              {/* Progress Bar */}
              <div className="mt-5 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Progress</span>
                  <span className="font-bold text-coral-600 dark:text-coral-400">{cppPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-navy-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-coral-500 h-full rounded-full transition-all duration-500" style={{ width: `${cppPercent}%` }} />
                </div>
                <span className="text-[11px] text-slate-400 block pt-0.5">
                  {cppProgress.completedTopicIds.length} lessons & {cppProgress.completedPracticalIds.length} practicals completed
                </span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between gap-2">
              <button
                onClick={() => onNavigate('course-cpp')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs transition-all shadow-sm active:scale-95"
              >
                <span>{cppPercent > 0 ? 'Continue' : 'Start C++'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('practical-lab?course=cpp')}
                className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-coral-600 transition-colors"
              >
                C++ Lab ({db.getPracticals('cpp').length})
              </button>
            </div>
          </div>

          {/* CARD 3 – SYSTEMS & ESSENTIALS (OTHER) */}
          <div className="rounded-3xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 p-6 sm:p-7 shadow-soft-md hover:shadow-soft-lg transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-lavender-500/15 text-lavender-600 dark:text-lavender-400 flex items-center justify-center font-black text-2xl font-mono border border-lavender-500/20 group-hover:scale-105 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-lavender-100 dark:bg-lavender-950/80 text-lavender-700 dark:text-lavender-300">
                  5 Units • Systems Lab
                </span>
              </div>

              <h3 className="text-xl font-bold text-navy-900 dark:text-white group-hover:text-lavender-600 dark:group-hover:text-lavender-400 transition-colors">
                Systems & Essentials
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Data structures, GDB debugging, Valgrind memory leak profiling, CMake & Makefiles, POSIX multithreading, and software engineering.
              </p>

              {/* Progress Bar */}
              <div className="mt-5 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Progress</span>
                  <span className="font-bold text-lavender-600 dark:text-lavender-400">{otherPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-navy-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-lavender-500 h-full rounded-full transition-all duration-500" style={{ width: `${otherPercent}%` }} />
                </div>
                <span className="text-[11px] text-slate-400 block pt-0.5">
                  {otherProgress.completedTopicIds.length} lessons & {otherProgress.completedPracticalIds.length} practicals completed
                </span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between gap-2">
              <button
                onClick={() => onNavigate('course-other')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-lavender-600 hover:bg-lavender-700 text-white font-bold text-xs transition-all shadow-sm active:scale-95"
              >
                <span>{otherPercent > 0 ? 'Continue' : 'Start Track'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('practical-lab?course=other')}
                className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-lavender-600 transition-colors"
              >
                Systems Lab ({db.getPracticals('other').length})
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Recently Studied Topics & Learning Goals */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recently Studied Topics */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-navy-900 dark:text-white">Recently Studied Topics</h3>
            <span className="text-xs text-slate-400">{recentTopics.length} Activities</span>
          </div>

          {recentTopics.length > 0 ? (
            <div className="divide-y divide-navy-100 dark:divide-navy-800">
              {recentTopics.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-navy-900 dark:text-white">{item?.topic.title}</h4>
                      <p className="text-[10px] text-slate-400">{item?.unit.title} • {item?.unit.courseId.toUpperCase()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate(`courses/${item?.unit.courseId}/unit/${item?.unit.id}?topic=${item?.topic.id}`)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-slate-50 dark:hover:bg-navy-800 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No recent study history yet. Start learning either C or C++ above!
            </div>
          )}
        </div>

        {/* Upcoming Learning Goals Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-teal-500" />
              <h3 className="font-bold text-base text-navy-900 dark:text-white">Upcoming Learning Goals</h3>
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                <span className="font-bold text-teal-600 dark:text-teal-400 block text-[10px] uppercase">Goal 1</span>
                <p className="font-semibold text-navy-900 dark:text-white mt-0.5">Complete C Unit 3 Arrays and Strings</p>
                <p className="text-[11px] text-slate-500 mt-1">Master null-terminators and string handling functions.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                <span className="font-bold text-coral-600 dark:text-coral-400 block text-[10px] uppercase">Goal 2</span>
                <p className="font-semibold text-navy-900 dark:text-white mt-0.5">Pass C++ OOP Mastery Quiz</p>
                <p className="text-[11px] text-slate-500 mt-1">Achieve 80%+ on constructors, destructors, and this pointer.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                <span className="font-bold text-lavender-600 dark:text-lavender-400 block text-[10px] uppercase">Goal 3</span>
                <p className="font-semibold text-navy-900 dark:text-white mt-0.5">Debug Memory Leaks with Valgrind</p>
                <p className="text-[11px] text-slate-500 mt-1">Master systems debugging and POSIX multithreading in Systems track.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('progress')}
            className="w-full mt-4 py-2 text-center text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
          >
            View Full Progress Analytics →
          </button>
        </div>

      </section>

    </div>
  );
};
