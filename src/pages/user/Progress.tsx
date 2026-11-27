import React from 'react';
import { useProgress } from '@/context/ProgressContext';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/services/db';
import { 
  Award, CheckCircle2, Flame, Target, BookOpen, Terminal, 
  TrendingUp, Calendar, ShieldCheck 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

export const Progress: React.FC = () => {
  const { currentUser } = useAuth();
  const { 
    cProgress, 
    cppProgress, 
    quizAttempts, 
    getCProgressPercentage, 
    getCppProgressPercentage, 
    getOverallProgressPercentage 
  } = useProgress();

  const cPercent = getCProgressPercentage();
  const cppPercent = getCppProgressPercentage();
  const overallPercent = getOverallProgressPercentage();

  const cUnits = db.getUnits('c');
  const cppUnits = db.getUnits('cpp');

  // Chart data for curriculum completion
  const courseComparisonData = [
    { name: 'C Language', completed: cProgress.completedTopicIds.length, total: 24, percent: cPercent },
    { name: 'C++ Modern', completed: cppProgress.completedTopicIds.length, total: 24, percent: cppPercent },
  ];

  // Practical distribution data
  const practicalDistributionData = [
    { name: 'C Lab Programs', value: cProgress.completedPracticalIds.length || 1, color: '#24B8A6' },
    { name: 'C++ Lab Programs', value: cppProgress.completedPracticalIds.length || 1, color: '#F08068' },
  ];

  const totalCertifiedUnits = cProgress.completedUnitIds.length + cppProgress.completedUnitIds.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-100 dark:border-navy-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400">
              Academic Analytics
            </span>
            <span className="text-xs text-slate-400">• Persistent Progress Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mt-1">
            Student Progress & Certification Readiness
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Live metric tracking across units, verified practical programs, unit mastery quizzes, and learning streaks.
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <ShieldCheck className="w-8 h-8 text-teal-500" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Certification Status</span>
            <p className="text-xs font-bold text-navy-900 dark:text-white">
              {overallPercent >= 80 ? 'Distinction Certified' : overallPercent >= 50 ? 'Intermediate Candidate' : 'Foundation Phase'}
            </p>
          </div>
        </div>
      </div>

      {/* Top 4 Stat Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <span className="text-xs text-slate-400 font-semibold uppercase">Overall Academy Progress</span>
          <p className="text-3xl font-black text-navy-900 dark:text-white mt-1">{overallPercent}%</p>
          <div className="w-full bg-slate-100 dark:bg-navy-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-teal-500 h-full rounded-full" style={{ width: `${overallPercent}%` }} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <span className="text-xs text-slate-400 font-semibold uppercase">Daily Streak</span>
          <div className="flex items-center gap-2 mt-1">
            <Flame className="w-6 h-6 text-coral-500 fill-current" />
            <p className="text-3xl font-black text-navy-900 dark:text-white">{currentUser?.streakDays || 1}</p>
            <span className="text-xs text-slate-400">Days</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Active since {currentUser?.lastActiveDate}</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <span className="text-xs text-slate-400 font-semibold uppercase">Units Mastered</span>
          <p className="text-3xl font-black text-navy-900 dark:text-white mt-1">{totalCertifiedUnits} / 15</p>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">MCQ Quizzes Passed</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <span className="text-xs text-slate-400 font-semibold uppercase">Practicals Executed</span>
          <p className="text-3xl font-black text-navy-900 dark:text-white mt-1">
            {cProgress.completedPracticalIds.length + cppProgress.completedPracticalIds.length}
          </p>
          <span className="text-[11px] text-slate-500 mt-1 block">Compiled in Sandbox</span>
        </div>
      </div>

      {/* Visual Analytics Graphs (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Course-wise Progress Bar Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <h3 className="font-bold text-base text-navy-900 dark:text-white mb-1">
            Curriculum Completion Percentage
          </h3>
          <p className="text-xs text-slate-400 mb-6">Comparison across procedural C and modern C++ tracks.</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#687587" fontSize={12} tickLine={false} />
                <YAxis stroke="#687587" fontSize={12} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#14243A',
                    borderRadius: '12px',
                    border: '1px solid #334E68',
                    color: '#FFF',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="percent" fill="#24B8A6" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Practical Lab Balance Pie Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-navy-900 dark:text-white mb-1">
              Practical Lab Activity Distribution
            </h3>
            <p className="text-xs text-slate-400 mb-4">Hands-on coding execution balance between C and C++.</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={practicalDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {practicalDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#14243A',
                    borderRadius: '12px',
                    border: '1px solid #334E68',
                    color: '#FFF',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs pt-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-teal-500" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">C ({cProgress.completedPracticalIds.length})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-coral-500" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">C++ ({cppProgress.completedPracticalIds.length})</span>
            </div>
          </div>
        </div>

      </div>

      {/* Unit Completion Breakdown Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
        <h3 className="font-bold text-base text-navy-900 dark:text-white mb-4">
          Unit Certification Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-navy-100 dark:border-navy-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3">Course</th>
                <th className="pb-3">Unit Name</th>
                <th className="pb-3">Topics Completed</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100 dark:divide-navy-800 text-navy-900 dark:text-slate-300">
              {cUnits.map(u => {
                const completed = u.topics.filter(t => cProgress.completedTopicIds.includes(t.id)).length;
                const isPassed = cProgress.completedUnitIds.includes(u.id);

                return (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-navy-800/40 transition-colors">
                    <td className="py-3 font-bold text-teal-600">C Language</td>
                    <td className="py-3 font-semibold">{u.title}</td>
                    <td className="py-3">{completed} / {u.topics.length}</td>
                    <td className="py-3">
                      {isPassed ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full text-[10px]">
                          <CheckCircle2 className="w-3 h-3" /> Mastered
                        </span>
                      ) : (
                        <span className="text-slate-400">In Progress</span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {cppUnits.map(u => {
                const completed = u.topics.filter(t => cppProgress.completedTopicIds.includes(t.id)).length;
                const isPassed = cppProgress.completedUnitIds.includes(u.id);

                return (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-navy-800/40 transition-colors">
                    <td className="py-3 font-bold text-coral-600">C++ Modern</td>
                    <td className="py-3 font-semibold">{u.title}</td>
                    <td className="py-3">{completed} / {u.topics.length}</td>
                    <td className="py-3">
                      {isPassed ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full text-[10px]">
                          <CheckCircle2 className="w-3 h-3" /> Mastered
                        </span>
                      ) : (
                        <span className="text-slate-400">In Progress</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
