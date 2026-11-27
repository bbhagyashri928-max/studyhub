import React from 'react';
import { db } from '@/services/db';
import { useProgress } from '@/context/ProgressContext';
import { CourseId } from '@/types';
import { 
  BookOpen, Terminal, CheckCircle2, Circle, Clock, Award, 
  ArrowRight, ChevronLeft, ChevronRight, Play 
} from 'lucide-react';

interface CourseViewProps {
  courseId: CourseId;
  onNavigate: (route: string) => void;
  onOpenUnit: (unitId: string) => void;
}

export const CourseView: React.FC<CourseViewProps> = ({ courseId, onNavigate, onOpenUnit }) => {
  const { 
    cProgress, 
    cppProgress, 
    otherProgress, 
    getCProgressPercentage, 
    getCppProgressPercentage, 
    getOtherProgressPercentage 
  } = useProgress();

  const course = db.getCourse(courseId);
  const units = db.getUnits(courseId);
  const practicals = db.getPracticals(courseId);
  const progress = courseId === 'c' ? cProgress : courseId === 'cpp' ? cppProgress : otherProgress;
  const progressPercent = courseId === 'c' 
    ? getCProgressPercentage() 
    : courseId === 'cpp' 
    ? getCppProgressPercentage() 
    : getOtherProgressPercentage();

  if (!course) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Course Header Banner */}
      <div className={`p-6 sm:p-10 rounded-3xl border text-white shadow-soft-lg ${
        courseId === 'c'
          ? 'bg-gradient-to-r from-navy-900 via-navy-800 to-teal-950 border-teal-900/50'
          : courseId === 'cpp'
          ? 'bg-gradient-to-r from-navy-900 via-navy-800 to-coral-950 border-coral-900/50'
          : 'bg-gradient-to-r from-navy-900 via-navy-800 to-slate-900 border-lavender-900/50'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
              courseId === 'c' 
                ? 'bg-teal-500/20 text-teal-300' 
                : courseId === 'cpp' 
                ? 'bg-coral-500/20 text-coral-300' 
                : 'bg-lavender-500/20 text-lavender-300'
            }`}>
              {course.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {course.title}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-4 bg-navy-900/80 p-4 rounded-2xl border border-navy-700/60">
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Course Progress</span>
              <p className="text-2xl font-black text-white">{progressPercent}%</p>
              <div className="w-28 bg-navy-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    courseId === 'c' ? 'bg-teal-400' : courseId === 'cpp' ? 'bg-coral-400' : 'bg-lavender-400'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => onNavigate(`practical-lab?course=${courseId}`)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                courseId === 'c' 
                  ? 'bg-teal-500 hover:bg-teal-600 text-navy-950' 
                  : courseId === 'cpp' 
                  ? 'bg-coral-500 hover:bg-coral-600 text-white' 
                  : 'bg-lavender-600 hover:bg-lavender-700 text-white'
              }`}
            >
              Open Practical Lab
            </button>
          </div>
        </div>
      </div>

      {/* 5 Units List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-navy-900 dark:text-white">Course Curriculum (5 Units)</h2>
          <span className="text-xs text-slate-500">{units.length} Units • 1 Practical Section</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {units.map((unit) => {
            const completedTopicsInUnit = unit.topics.filter(t => progress.completedTopicIds.includes(t.id)).length;
            const isUnitPassed = progress.completedUnitIds.includes(unit.id);
            const unitPercent = Math.round((completedTopicsInUnit / unit.topics.length) * 100);

            return (
              <div
                key={unit.id}
                className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft hover:shadow-soft-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base flex-shrink-0 mt-0.5 ${
                    isUnitPassed
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                      : courseId === 'c'
                      ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400'
                      : courseId === 'cpp'
                      ? 'bg-coral-50 dark:bg-coral-950/60 text-coral-600 dark:text-coral-400'
                      : 'bg-lavender-50 dark:bg-lavender-950/60 text-lavender-600 dark:text-lavender-400'
                  }`}>
                    {isUnitPassed ? <CheckCircle2 className="w-6 h-6" /> : `U${unit.unitNumber}`}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Unit {unit.unitNumber}
                      </span>
                      {isUnitPassed && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                          Unit Mastered
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-navy-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {unit.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                      {unit.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 font-medium">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {unit.topics.length} In-Depth Lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {unit.estimatedHours} Hours
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        End-of-Unit MCQ Quiz
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side Progress & Action */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-navy-100 dark:border-navy-800">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-bold text-navy-900 dark:text-white">
                      {completedTopicsInUnit}/{unit.topics.length} Topics
                    </span>
                    <div className="w-24 bg-slate-100 dark:bg-navy-800 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          courseId === 'c' ? 'bg-teal-500' : courseId === 'cpp' ? 'bg-coral-500' : 'bg-lavender-500'
                        }`} 
                        style={{ width: `${unitPercent}%` }} 
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenUnit(unit.id)}
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl active:scale-95 font-bold text-xs transition-all shadow-sm ${
                      courseId === 'c'
                        ? 'bg-teal-500 hover:bg-teal-600 text-navy-950'
                        : courseId === 'cpp'
                        ? 'bg-coral-500 hover:bg-coral-600 text-white'
                        : 'bg-lavender-600 hover:bg-lavender-700 text-white'
                    }`}
                  >
                    <span>{unitPercent > 0 ? 'Continue Unit' : 'Start Learning'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Practical Lab Highlight Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600">
            <Terminal className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-navy-900 dark:text-white">
              {course.title} Practical Lab
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Explore {practicals.length} runnable programs across multiple algorithmic categories with code explanations and inputs.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate(`practical-lab?course=${courseId}`)}
          className="w-full md:w-auto px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <span>Open Practical Lab</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
