import React, { useState, useEffect } from 'react';
import { Unit, Topic } from '@/types';
import { useProgress } from '@/context/ProgressContext';
import { CodeEditor } from '@/components/code-editor/CodeEditor';
import { UnitQuizModal } from '@/components/quizzes/UnitQuizModal';
import { db } from '@/services/db';
import { 
  CheckCircle2, Circle, Bookmark, ChevronLeft, ChevronRight, 
  HelpCircle, AlertTriangle, Lightbulb, BookOpen, Award, FileCode 
} from 'lucide-react';

interface TopicReaderProps {
  unit: Unit;
  initialTopicId?: string;
  onNavigateBack: () => void;
}

export const TopicReader: React.FC<TopicReaderProps> = ({
  unit,
  initialTopicId,
  onNavigateBack,
}) => {
  const { 
    cProgress, 
    cppProgress, 
    toggleTopicCompletion, 
    recordLastVisited, 
    toggleBookmark, 
    isBookmarked 
  } = useProgress();

  const [activeTopicId, setActiveTopicId] = useState<string>(
    initialTopicId || unit.topics[0]?.id || ''
  );
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  const activeTopic: Topic | undefined = unit.topics.find(t => t.id === activeTopicId) || unit.topics[0];
  const activeIndex = unit.topics.findIndex(t => t.id === activeTopicId);

  const currentProgress = unit.courseId === 'c' ? cProgress : cppProgress;
  const isTopicDone = activeTopic ? currentProgress.completedTopicIds.includes(activeTopic.id) : false;
  const isBookmarkedCurrent = activeTopic ? isBookmarked(activeTopic.id) : false;

  // Record visit
  useEffect(() => {
    if (activeTopic) {
      recordLastVisited(unit.courseId, unit.id, activeTopic.id);
    }
  }, [activeTopic, unit.id, unit.courseId, recordLastVisited]);

  const handleNext = () => {
    if (activeIndex < unit.topics.length - 1) {
      setActiveTopicId(unit.topics[activeIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Last topic reached: open quiz modal!
      setIsQuizModalOpen(true);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveTopicId(unit.topics[activeIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const unitQuiz = db.getQuiz(unit.id);

  if (!activeTopic) {
    return <div className="p-8 text-center text-slate-500">No topics found in this unit.</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start max-w-7xl mx-auto px-4 sm:px-6 py-6">
      
      {/* Left Sidebar: Topics Navigation List */}
      <aside className="w-full lg:w-80 flex-shrink-0 bg-white dark:bg-navy-900 rounded-2xl border border-navy-100 dark:border-navy-800 p-5 shadow-soft lg:sticky lg:top-20">
        <button
          onClick={onNavigateBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-600 transition-colors mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Course Units</span>
        </button>

        <div className="border-b border-navy-100 dark:border-navy-800 pb-3 mb-4">
          <span className="text-[11px] font-bold tracking-wider text-teal-600 uppercase">
            Unit {unit.unitNumber}
          </span>
          <h3 className="font-bold text-navy-900 dark:text-white text-base leading-snug mt-0.5">
            {unit.title}
          </h3>
        </div>

        {/* Topic Links */}
        <div className="space-y-1.5 max-h-[50vh] lg:max-h-[60vh] overflow-y-auto pr-1">
          {unit.topics.map((t, idx) => {
            const isCompleted = currentProgress.completedTopicIds.includes(t.id);
            const isActive = t.id === activeTopicId;

            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTopicId(t.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-2.5 text-xs ${
                  isActive
                    ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-200 font-semibold border border-teal-200 dark:border-teal-800'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-navy-800 border border-transparent'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <span className="opacity-75 block text-[10px] font-mono">Topic {idx + 1}</span>
                  <span className="line-clamp-2 leading-tight">{t.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Unit Quiz Callout Card */}
        {unitQuiz && (
          <div className="mt-6 pt-4 border-t border-navy-100 dark:border-navy-800">
            <button
              onClick={() => setIsQuizModalOpen(true)}
              className="w-full p-3.5 rounded-xl bg-gradient-to-r from-teal-500/10 to-coral-500/10 border border-teal-200/50 dark:border-teal-800/50 hover:border-teal-400 text-left transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-teal-500 text-navy-950">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-navy-900 dark:text-white">Unit Assessment</h4>
                  <p className="text-[11px] text-slate-500">{unitQuiz.questions.length} Questions</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        )}
      </aside>

      {/* Main Lesson Content Area */}
      <main className="flex-1 bg-white dark:bg-navy-900 rounded-2xl border border-navy-100 dark:border-navy-800 p-6 sm:p-8 shadow-soft overflow-hidden w-full">
        
        {/* Lesson Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-navy-100 dark:border-navy-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <BookOpen className="w-3.5 h-3.5 text-teal-500" />
              <span>Topic {activeIndex + 1} of {unit.topics.length}</span>
              <span>•</span>
              <span className="capitalize">{unit.courseId.toUpperCase()} Core</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 dark:text-white mt-1">
              {activeTopic.title}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              {activeTopic.summary}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Bookmark button */}
            <button
              onClick={() => toggleBookmark({
                type: 'topic',
                itemId: activeTopic.id,
                itemTitle: activeTopic.title,
                courseId: unit.courseId,
                subtitle: `${unit.title} - Topic ${activeIndex + 1}`
              })}
              className={`p-2.5 rounded-xl border transition-all ${
                isBookmarkedCurrent
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-500'
                  : 'border-slate-200 dark:border-navy-700 text-slate-400 hover:text-navy-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-navy-800'
              }`}
              title={isBookmarkedCurrent ? 'Remove Bookmark' : 'Bookmark this topic'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarkedCurrent ? 'fill-current' : ''}`} />
            </button>

            {/* Mark as Completed Button */}
            <button
              onClick={() => toggleTopicCompletion(unit.courseId, activeTopic.id, unit.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${
                isTopicDone
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : 'bg-teal-500 hover:bg-teal-600 text-navy-950'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isTopicDone ? 'Completed' : 'Mark as Completed'}</span>
            </button>
          </div>
        </div>

        {/* Definition Section */}
        <div className="mt-8 space-y-6">
          <div className="p-5 rounded-2xl bg-ivory-100 dark:bg-navy-950 border border-navy-100 dark:border-navy-800">
            <div className="flex items-center gap-2 text-navy-900 dark:text-white font-bold text-sm mb-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Conceptual Definition</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {activeTopic.content.definition}
            </p>
          </div>

          {/* Syntax Block (if present) */}
          {activeTopic.content.syntax && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Standard Syntax Specification
              </h3>
              <div className="p-4 rounded-xl bg-navy-950 text-teal-300 font-mono text-xs overflow-x-auto border border-navy-800">
                <pre>{activeTopic.content.syntax}</pre>
              </div>
            </div>
          )}

          {/* Code Sandbox / Implementation Example */}
          {activeTopic.content.codeSnippet && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-teal-500" />
                  <span>Verified Code Example & Live Sandbox</span>
                </h3>
              </div>
              <CodeEditor
                initialCode={activeTopic.content.codeSnippet}
                language={unit.courseId}
                title={activeTopic.title}
              />
            </div>
          )}

          {/* Line-by-Line Code Breakdown */}
          {activeTopic.content.lineByLineExplanation && activeTopic.content.lineByLineExplanation.length > 0 && (
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Line-by-Line Logic Breakdown
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {activeTopic.content.lineByLineExplanation.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-950 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs"
                  >
                    <code className="font-mono text-teal-600 dark:text-teal-400 font-semibold sm:w-1/3 truncate bg-teal-50 dark:bg-teal-950/50 px-2 py-1 rounded">
                      {item.line}
                    </code>
                    <p className="text-slate-600 dark:text-slate-300 flex-1 leading-normal">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Concepts Grid */}
          {activeTopic.content.keyConcepts && activeTopic.content.keyConcepts.length > 0 && (
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Core Academic Concepts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeTopic.content.keyConcepts.map((concept, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-navy-800 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{concept}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Mistakes & Pitfalls */}
          {activeTopic.content.commonMistakes && activeTopic.content.commonMistakes.length > 0 && (
            <div className="p-4 rounded-xl bg-coral-50 dark:bg-coral-950/20 border border-coral-200 dark:border-coral-900/40 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-coral-800 dark:text-coral-300 mb-2">
                <AlertTriangle className="w-4 h-4 text-coral-500" />
                <span>Common Student Mistakes to Avoid</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-coral-200/90 pl-1">
                {activeTopic.content.commonMistakes.map((mistake, idx) => (
                  <li key={idx}>{mistake}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Revision Checklist */}
          {activeTopic.content.quickRevision && activeTopic.content.quickRevision.length > 0 && (
            <div className="p-4 rounded-xl bg-lavender-50 dark:bg-lavender-950/20 border border-lavender-200 dark:border-lavender-900/40 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-navy-900 dark:text-lavender-300 mb-2">
                <HelpCircle className="w-4 h-4 text-lavender-600 dark:text-lavender-400" />
                <span>Quick Revision Summary</span>
              </div>
              <div className="grid grid-cols-1 gap-1 text-slate-700 dark:text-slate-300">
                {activeTopic.content.quickRevision.map((rev, idx) => (
                  <p key={idx} className="flex items-center gap-2">
                    <span className="text-teal-500 font-bold">✓</span>
                    <span>{rev}</span>
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Topic Navigation Footer */}
        <div className="mt-12 pt-6 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Topic</span>
          </button>

          <span className="text-xs text-slate-400 hidden sm:inline">
            Topic {activeIndex + 1} of {unit.topics.length}
          </span>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-navy-950 text-xs font-bold transition-all shadow-sm"
          >
            <span>{activeIndex === unit.topics.length - 1 ? 'Take Unit Quiz' : 'Next Topic'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Unit Quiz Modal */}
      {unitQuiz && (
        <UnitQuizModal
          quiz={unitQuiz}
          isOpen={isQuizModalOpen}
          onClose={() => setIsQuizModalOpen(false)}
        />
      )}
    </div>
  );
};
