import React, { useState } from 'react';
import { Stage, CourseId } from '@/types';
import { db } from '@/services/db';
import confetti from 'canvas-confetti';
import { 
  X, CheckCircle2, ChevronLeft, ChevronRight, BookOpen, 
  Code2, Terminal, Lightbulb, AlertCircle, Sparkles, Check, 
  HelpCircle, ArrowRight, Award, Copy 
} from 'lucide-react';

interface StageModalReaderProps {
  stage: Stage;
  allStages: Stage[];
  courseId: CourseId;
  userId: string;
  onClose: () => void;
  onNavigateStage: (nextStage: Stage) => void;
  onProgressUpdated: () => void;
}

export const StageModalReader: React.FC<StageModalReaderProps> = ({
  stage,
  allStages,
  courseId,
  userId,
  onClose,
  onNavigateStage,
  onProgressUpdated
}) => {
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Check completion
  const progress = db.getStudentStageProgress(userId, courseId);
  const isCompleted = progress.completedStageIds.includes(stage.id);

  // Sort stages by number
  const sortedStages = [...allStages].sort((a, b) => a.stageNumber - b.stageNumber);
  const currentIndex = sortedStages.findIndex(s => s.id === stage.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < sortedStages.length - 1;

  const handleMarkCompleted = () => {
    db.markStageCompleted(userId, courseId, stage.id);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    onProgressUpdated();
  };

  const handleCopyCode = () => {
    if (stage.content.codeSnippet) {
      navigator.clipboard.writeText(stage.content.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      const nextStage = sortedStages[currentIndex + 1];
      setSelectedQuizOption(null);
      setIsQuizSubmitted(false);
      onNavigateStage(nextStage);
    }
  };

  const handlePrev = () => {
    if (hasPrev) {
      const prevStage = sortedStages[currentIndex - 1];
      setSelectedQuizOption(null);
      setIsQuizSubmitted(false);
      onNavigateStage(prevStage);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      
      {/* Modal Card Container */}
      <div className="bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-soft-lg overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-navy-100 dark:border-navy-800 flex items-center justify-between bg-slate-50/50 dark:bg-navy-950/60">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
              Stage {stage.stageNumber} of {sortedStages.length}
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Completed
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Lesson Content (All 10 Required Sections) */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-7">
          
          {/* 1. Stage Title & Subtitle */}
          <div className="space-y-1">
            {stage.subtitle && (
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                {stage.subtitle}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white leading-tight">
              {stage.title}
            </h1>
          </div>

          {/* 2. Simple Explanation */}
          <div className="bg-slate-50 dark:bg-navy-950 p-5 rounded-2xl border border-slate-200 dark:border-navy-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-teal-500" />
              <span>Core Explanation</span>
            </h3>
            <p className="text-sm sm:text-base text-navy-900 dark:text-slate-200 leading-relaxed font-normal">
              {stage.content.explanation}
            </p>
          </div>

          {/* 3. Important Definitions */}
          {stage.content.definitions && stage.content.definitions.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Important Definitions</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {stage.content.definitions.map((def, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-xl bg-ivory-100 dark:bg-navy-950/80 border border-slate-200 dark:border-navy-800 text-xs text-navy-900 dark:text-slate-300 leading-relaxed"
                  >
                    📌 {def}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Syntax Specification */}
          {stage.content.syntax && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-teal-500" />
                <span>Syntax & Grammar</span>
              </h3>
              <pre className="p-4 rounded-xl font-mono text-xs bg-navy-950 text-teal-300 border border-navy-800 overflow-x-auto leading-relaxed shadow-inner">
                {stage.content.syntax}
              </pre>
            </div>
          )}

          {/* 5. Real-Life Example / Analogy */}
          {stage.content.realLifeExample && (
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Real-World Engineering Analogy</span>
              </div>
              <p className="leading-relaxed">
                {stage.content.realLifeExample}
              </p>
            </div>
          )}

          {/* 6. Code Example */}
          {stage.content.codeSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-teal-500" />
                  <span>Code Implementation</span>
                </h3>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-teal-500 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl font-mono text-xs bg-navy-950 text-emerald-300 border border-navy-800 overflow-x-auto leading-relaxed shadow-inner">
                {stage.content.codeSnippet}
              </pre>
            </div>
          )}

          {/* 7. Line-by-Line Code Explanation */}
          {stage.content.lineByLineExplanation && stage.content.lineByLineExplanation.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-teal-500" />
                <span>Line-by-Line Breakdown</span>
              </h3>
              <div className="space-y-1.5">
                {stage.content.lineByLineExplanation.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-xs flex flex-col sm:flex-row gap-2"
                  >
                    <code className="font-mono text-teal-600 dark:text-teal-400 font-bold sm:w-1/3 flex-shrink-0">
                      {item.line}
                    </code>
                    <span className="text-slate-600 dark:text-slate-300 sm:w-2/3">
                      {item.explanation}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. Expected Terminal Output */}
          {stage.content.expectedOutput && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-teal-500" />
                <span>Expected Output</span>
              </h3>
              <pre className="p-3.5 rounded-xl font-mono text-xs bg-navy-950 text-slate-200 border border-navy-800">
                {stage.content.expectedOutput}
              </pre>
            </div>
          )}

          {/* 9. Important Points to Remember */}
          {stage.content.pointsToRemember && stage.content.pointsToRemember.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-coral-500" />
                <span>Important Points to Remember</span>
              </h3>
              <ul className="space-y-1.5">
                {stage.content.pointsToRemember.map((point, idx) => (
                  <li 
                    key={idx} 
                    className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                  >
                    <span className="text-teal-500 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 10. Short Knowledge-Check Question */}
          {stage.quiz && (
            <div className="p-5 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/60 space-y-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                  Stage Mastery Check
                </h3>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-navy-900 dark:text-white">
                {stage.quiz.question}
              </p>

              <div className="space-y-2 pt-1">
                {stage.quiz.options.map((opt, idx) => {
                  const isSelected = selectedQuizOption === idx;
                  const isCorrect = idx === stage.quiz?.correctIndex;

                  let optClass = 'bg-white dark:bg-navy-900 border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300';
                  if (isSelected) {
                    optClass = 'border-teal-500 ring-2 ring-teal-500/20 text-teal-900 dark:text-teal-200 font-bold';
                  }
                  if (isQuizSubmitted) {
                    if (isCorrect) {
                      optClass = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optClass = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200 line-through';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isQuizSubmitted}
                      onClick={() => setSelectedQuizOption(idx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${optClass}`}
                    >
                      <span>{opt}</span>
                      {isQuizSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-500" />}
                    </button>
                  );
                })}
              </div>

              {!isQuizSubmitted ? (
                <button
                  disabled={selectedQuizOption === null}
                  onClick={() => setIsQuizSubmitted(true)}
                  className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-600 disabled:opacity-40 text-navy-950 transition-all shadow-sm"
                >
                  Verify Answer
                </button>
              ) : (
                <div className="text-xs pt-1 text-slate-600 dark:text-slate-300">
                  💡 <strong>Explanation:</strong> {stage.quiz.explanation}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Bottom Navigation & Completion Bar */}
        <div className="px-6 py-4 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between bg-slate-50/50 dark:bg-navy-950/60">
          
          <button
            disabled={!hasPrev}
            onClick={handlePrev}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-800 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous Stage</span>
          </button>

          <button
            onClick={handleMarkCompleted}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-soft flex items-center gap-1.5 ${
              isCompleted
                ? 'bg-emerald-600 text-white'
                : 'bg-teal-500 hover:bg-teal-600 text-navy-950'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Completed ✓' : 'Mark as Completed'}</span>
          </button>

          <button
            disabled={!hasNext}
            onClick={handleNext}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-800 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5 transition-colors"
          >
            <span className="hidden sm:inline">Next Stage</span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  );
};
