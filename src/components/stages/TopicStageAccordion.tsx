import React, { useState } from 'react';
import { Topic, Stage, CourseId } from '@/types';
import { db } from '@/services/db';
import { 
  ChevronRight, ChevronDown, Check, Lock, Sparkles, Circle
} from 'lucide-react';

interface TopicStageAccordionProps {
  topic: Topic;
  courseId: CourseId;
  userId: string;
  isInitiallyExpanded?: boolean;
  onSelectStage: (stage: Stage, allTopicStages: Stage[]) => void;
  onOpenTopicReader?: (topicId: string) => void;
}

export const TopicStageAccordion: React.FC<TopicStageAccordionProps> = ({
  topic,
  courseId,
  userId,
  isInitiallyExpanded = false,
  onSelectStage,
  onOpenTopicReader
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(isInitiallyExpanded);

  // Load stages from db
  const stages = db.getStages(topic.id).filter(s => s.published);
  const progress = db.getStudentStageProgress(userId, courseId);
  const completedCount = stages.filter(s => progress.completedStageIds.includes(s.id)).length;
  const isTopicFullyCompleted = stages.length > 0 && completedCount === stages.length;
  const isTopicStarted = completedCount > 0;

  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-navy-800/80 bg-white dark:bg-navy-950/70 overflow-hidden transition-all duration-200 shadow-soft-sm">
      
      {/* Accordion Header Row (Matches Reference Mockup) */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 sm:px-6 py-3.5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-50/80 dark:hover:bg-navy-900/60 transition-colors group"
      >
        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
          {/* Chevron */}
          <div className="text-slate-500 group-hover:text-teal-600 transition-colors flex-shrink-0">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </div>

          {/* Completion Indicator Circle (Reference Mockup) */}
          <div className="flex-shrink-0">
            {isTopicFullyCompleted ? (
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-2xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            ) : isTopicStarted ? (
              <div className="w-5 h-5 rounded-full border-2 border-teal-500 flex items-center justify-center text-[10px] font-bold text-teal-600">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
              </div>
            ) : (
              <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 stroke-[1.5]" />
            )}
          </div>

          {/* Topic Title */}
          <span className="font-bold text-sm sm:text-base text-navy-900 dark:text-slate-100 truncate group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">
            {topic.title}
          </span>
        </div>

        {/* Right Status Pill (Matches Reference Mockup: Completed / Not Started + Lock) */}
        <div className="flex items-center gap-2.5 flex-shrink-0 ml-2">
          {isTopicFullyCompleted ? (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
              Completed
            </span>
          ) : isTopicStarted ? (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60">
              {completedCount}/{stages.length} Done
            </span>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-navy-900 dark:text-slate-400 border border-slate-200/80 dark:border-navy-800">
                Not Started
              </span>
              <Lock className="w-3.5 h-3.5 text-slate-400" />
            </div>
          )}
        </div>
      </div>

      {/* Expanded State: Numbered Stage Grid (Exact Layout from Reference Image) */}
      {isExpanded && (
        <div className="px-4 sm:px-6 pb-6 pt-3 border-t border-slate-100 dark:border-navy-900/60 bg-[#FBFBFA]/60 dark:bg-navy-950/40">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Stage Learning Sequence ({stages.length} Steps)</span>
              <span>Click a stage box to study</span>
            </div>

            {/* Responsive Numbered Rectangular Stage Grid (12 cols desktop, 6-8 tablet, 4 mobile) */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11 xl:grid-cols-12 gap-2 sm:gap-2.5">
              {stages.map((stage) => {
                const isCompleted = progress.completedStageIds.includes(stage.id);
                const isUnlocked = db.isStageUnlocked(userId, courseId, stage, stages);
                const isCurrent = isUnlocked && !isCompleted && (
                  stage.stageNumber === 1 || 
                  progress.completedStageIds.includes(stages[stage.stageNumber - 2]?.id)
                );

                return (
                  <button
                    key={stage.id}
                    disabled={!isUnlocked}
                    onClick={() => isUnlocked && onSelectStage(stage, stages)}
                    title={`${stage.title}${!isUnlocked ? ' (Locked - complete prior stage first)' : ''}`}
                    className={`relative w-11 h-12 sm:w-12 sm:h-12 rounded-xl flex flex-col items-center justify-center font-mono text-xs sm:text-sm font-bold transition-all duration-150 select-none ${
                      isCurrent
                        ? 'bg-[#0B4B52] text-white border-2 border-teal-300 ring-2 ring-teal-400/50 shadow-md hover:scale-105'
                        : isCompleted
                        ? 'bg-[#0B4B52] text-white border border-[#146A74] hover:bg-[#125D66] shadow-2xs'
                        : isUnlocked
                        ? 'bg-white dark:bg-navy-900 text-slate-700 dark:text-slate-200 border-2 border-dashed border-teal-400/80 hover:bg-teal-50 hover:text-teal-700'
                        : 'bg-[#101F33] text-slate-300/80 border border-[#1A2E4B] cursor-not-allowed opacity-90'
                    }`}
                  >
                    {/* Glowing Star/Diamond badge for Current active stage */}
                    {isCurrent && (
                      <span className="absolute top-1 left-1 text-[8px] leading-none text-amber-300">
                        ✦
                      </span>
                    )}

                    {/* Stage Number & Content */}
                    <span className="leading-none">{stage.stageNumber}</span>

                    {/* Lock Icon for Locked stages (Matches Reference Screenshot) */}
                    {!isUnlocked && (
                      <Lock className="w-2.5 h-2.5 text-slate-400 mt-1" />
                    )}

                    {/* Circular Checkmark badge for completed stages (Matches Reference) */}
                    {isCompleted && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-2xs ring-1 ring-white dark:ring-navy-900">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
