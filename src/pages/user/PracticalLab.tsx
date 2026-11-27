import React, { useState } from 'react';
import { db } from '@/services/db';
import { useProgress } from '@/context/ProgressContext';
import { CodeEditor } from '@/components/code-editor/CodeEditor';
import { PracticalProgram, CourseId } from '@/types';
import { 
  Terminal, Search, Filter, CheckCircle2, Bookmark, Copy, 
  Play, Sparkles, ChevronRight, HelpCircle, Code 
} from 'lucide-react';

interface PracticalLabProps {
  initialCourseId?: CourseId;
  onNavigate: (route: string) => void;
}

export const PracticalLab: React.FC<PracticalLabProps> = ({
  initialCourseId = 'c',
}) => {
  const [courseFilter, setCourseFilter] = useState<CourseId>(initialCourseId);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const { cProgress, cppProgress, togglePracticalCompletion, toggleBookmark, isBookmarked } = useProgress();

  const allPracticals = db.getPracticals(courseFilter);
  const categories = ['All', ...Array.from(new Set(allPracticals.map(p => p.category)))];

  // Filtered practical list
  const filteredPracticals = allPracticals.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.problemStatement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.keyConcepts.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const [activeProgramId, setActiveProgramId] = useState<string>(
    filteredPracticals[0]?.id || allPracticals[0]?.id || ''
  );

  const activeProgram: PracticalProgram | undefined = 
    filteredPracticals.find(p => p.id === activeProgramId) || filteredPracticals[0] || allPracticals[0];

  const currentProgress = courseFilter === 'c' ? cProgress : cppProgress;
  const isCompleted = activeProgram ? currentProgress.completedPracticalIds.includes(activeProgram.id) : false;
  const isBookmarkedCurrent = activeProgram ? isBookmarked(activeProgram.id) : false;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
      
      {/* Lab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-100 dark:border-navy-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400">
              Interactive Compiler Lab
            </span>
            <span className="text-xs text-slate-400">• Real Sandbox Execution</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mt-1">
            Practical Code Library & Sandbox
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compile, run, and master verified code examples across algorithmic categories with sample input/output streams.
          </p>
        </div>

        {/* Course Switcher Tabs */}
        <div className="flex p-1 rounded-xl bg-ivory-100 dark:bg-navy-900 border border-navy-100 dark:border-navy-800 self-start sm:self-auto gap-1">
          <button
            onClick={() => {
              setCourseFilter('c');
              setSelectedCategory('All');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              courseFilter === 'c'
                ? 'bg-teal-500 text-navy-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white'
            }`}
          >
            C Practical Lab
          </button>
          <button
            onClick={() => {
              setCourseFilter('cpp');
              setSelectedCategory('All');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              courseFilter === 'cpp'
                ? 'bg-coral-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white'
            }`}
          >
            C++ Practical Lab
          </button>
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={`Search ${courseFilter.toUpperCase()} practical programs by title, problem, or concepts...`}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white outline-none focus:border-teal-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-navy-900 dark:bg-teal-500 text-white dark:text-navy-950 font-bold'
                  : 'bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Lab Layout: Programs Sidebar & Active Code Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Program Directory (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-navy-900 rounded-2xl border border-navy-100 dark:border-navy-800 p-4 shadow-soft max-h-[75vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-navy-100 dark:border-navy-800 text-xs">
            <span className="font-bold text-navy-900 dark:text-white">Program Directory</span>
            <span className="text-slate-400">{filteredPracticals.length} Found</span>
          </div>

          <div className="space-y-1.5">
            {filteredPracticals.map((pr) => {
              const done = currentProgress.completedPracticalIds.includes(pr.id);
              const isSelected = pr.id === activeProgram?.id;

              return (
                <button
                  key={pr.id}
                  onClick={() => setActiveProgramId(pr.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-2.5 text-xs ${
                    isSelected
                      ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-200 font-semibold border border-teal-200 dark:border-teal-800 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-navy-800 border border-transparent'
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Terminal className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      {pr.category}
                    </span>
                    <h4 className="font-bold truncate mt-0.5">{pr.title}</h4>
                    <span className="text-[10px] text-slate-400">{pr.difficulty}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Program View & Code Editor (8 cols) */}
        {activeProgram ? (
          <div className="lg:col-span-8 space-y-6">
            
            {/* Program Details Header Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-slate-300">
                      {activeProgram.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activeProgram.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
                      activeProgram.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {activeProgram.difficulty}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-navy-900 dark:text-white mt-1.5">
                    {activeProgram.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark({
                      type: 'practical',
                      itemId: activeProgram.id,
                      itemTitle: activeProgram.title,
                      courseId: activeProgram.courseId,
                      category: activeProgram.category
                    })}
                    className={`p-2 rounded-xl border transition-all ${
                      isBookmarkedCurrent
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-500'
                        : 'border-slate-200 dark:border-navy-700 text-slate-400 hover:text-navy-900 dark:hover:text-white'
                    }`}
                    title={isBookmarkedCurrent ? 'Remove Bookmark' : 'Bookmark this practical'}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarkedCurrent ? 'fill-current' : ''}`} />
                  </button>

                  {/* Mark as Completed Button */}
                  <button
                    onClick={() => togglePracticalCompletion(courseFilter, activeProgram.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      isCompleted
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        : 'bg-teal-500 hover:bg-teal-600 text-navy-950'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isCompleted ? 'Completed' : 'Mark Completed'}</span>
                  </button>
                </div>
              </div>

              {/* Problem Statement */}
              <div className="mt-4 pt-4 border-t border-navy-100 dark:border-navy-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Problem Statement
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {activeProgram.problemStatement}
                </p>
              </div>

              {/* Concepts Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {activeProgram.keyConcepts.map((k, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-ivory-100 dark:bg-navy-950 text-slate-600 dark:text-slate-300 text-[11px] font-mono border border-slate-200 dark:border-navy-800"
                  >
                    #{k}
                  </span>
                ))}
              </div>
            </div>

            {/* Live Interactive Code Sandbox */}
            <div className="space-y-2">
              <CodeEditor
                key={activeProgram.id} // Re-mounts editor on program switch
                initialCode={activeProgram.sourceCode}
                language={courseFilter}
                title={activeProgram.title}
                defaultStdin={activeProgram.sampleInput.includes('(None') ? '' : activeProgram.sampleInput}
              />
            </div>

            {/* Explanation & Expected Output Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Step-by-Step Logic Explanation */}
              <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
                <div className="flex items-center gap-2 mb-3 text-navy-900 dark:text-white font-bold text-xs uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-teal-500" />
                  <span>Step-by-Step Logic</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {activeProgram.explanation.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sample I/O */}
              <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft space-y-3">
                <div className="flex items-center gap-2 text-navy-900 dark:text-white font-bold text-xs uppercase tracking-wider">
                  <Terminal className="w-4 h-4 text-coral-500" />
                  <span>Sample Input & Expected Output</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Sample Input:</span>
                  <pre className="p-2 bg-ivory-100 dark:bg-navy-950 rounded-lg text-xs font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-800 mt-1">
                    {activeProgram.sampleInput}
                  </pre>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Expected Standard Output:</span>
                  <pre className="p-2 bg-navy-950 text-emerald-400 rounded-lg text-xs font-mono overflow-x-auto border border-navy-800 mt-1 whitespace-pre-wrap">
                    {activeProgram.expectedOutput}
                  </pre>
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="lg:col-span-8 p-12 text-center text-slate-400">
            No practical programs match your search or filter query.
          </div>
        )}

      </div>

    </div>
  );
};
