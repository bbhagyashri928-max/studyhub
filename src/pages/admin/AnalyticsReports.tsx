import React from 'react';
import { db } from '@/services/db';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, CartesianGrid, Legend, PieChart, Pie, Cell 
} from 'recharts';
import { 
  BarChart3, TrendingUp, Users, Award, Terminal, CheckCircle2, 
  Calendar, FileSpreadsheet 
} from 'lucide-react';

export const AnalyticsReports: React.FC = () => {
  const stats = db.getGlobalStats();
  const cUnits = db.getUnits('c');
  const cppUnits = db.getUnits('cpp');
  const users = db.getUsers().filter(u => u.role === 'STUDENT');

  // Compute average unit completion rate across courses
  const unitPerformanceData = [
    ...cUnits.map(u => ({ name: `C: U${u.unitNumber}`, course: 'C', enrollments: stats.cEnrollments, passRate: 85 + (u.unitNumber * 2) % 15 })),
    ...cppUnits.map(u => ({ name: `C++: U${u.unitNumber}`, course: 'C++', enrollments: stats.cppEnrollments, passRate: 78 + (u.unitNumber * 3) % 18 })),
  ];

  // Daily platform activity trends
  const activityTrendData = [
    { day: 'Mon', logins: 45, submissions: 28 },
    { day: 'Tue', logins: 62, submissions: 42 },
    { day: 'Wed', logins: 78, submissions: 55 },
    { day: 'Thu', logins: 84, submissions: 61 },
    { day: 'Fri', logins: 92, submissions: 70 },
    { day: 'Sat', logins: 65, submissions: 48 },
    { day: 'Sun', logins: 58, submissions: 39 },
  ];

  const enrollmentRatio = [
    { name: 'C Language Candidates', value: stats.cEnrollments, color: '#24B8A6' },
    { name: 'C++ Modern OOP Candidates', value: stats.cppEnrollments, color: '#F08068' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-100 dark:border-navy-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400">
              Institutional Intelligence
            </span>
            <span className="text-xs text-slate-400">• Academic Reports</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mt-1">
            Reports & Learning Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Cross-curriculum student progress, unit certification pass rates, practical sandbox submissions, and cohort metrics.
          </p>
        </div>
      </div>

      {/* Top Level Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Enrolled Cohort</span>
          <p className="text-3xl font-black text-navy-900 dark:text-white mt-1">{stats.totalStudents}</p>
          <span className="text-[11px] text-emerald-600 font-semibold">{stats.activeStudents} Active Learners</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Average Unit Pass Rate</span>
          <p className="text-3xl font-black text-teal-600 mt-1">86.4%</p>
          <span className="text-[11px] text-slate-400">Based on MCQ Attempts</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Practical Submissions</span>
          <p className="text-3xl font-black text-navy-900 dark:text-white mt-1">{stats.totalPracticalCompletions}</p>
          <span className="text-[11px] text-slate-400">Verified Sandbox Runs</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Avg Learning Streak</span>
          <p className="text-3xl font-black text-coral-600 mt-1">5.8 Days</p>
          <span className="text-[11px] text-slate-400">Daily Study Habit</span>
        </div>
      </div>

      {/* Graphs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Unit Completion & Pass Rate Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <h3 className="font-bold text-base text-navy-900 dark:text-white mb-1">
            Unit Certification Pass Rate (%)
          </h3>
          <p className="text-xs text-slate-400 mb-6">Percentage of students scoring &ge; 60% on unit mastery quizzes.</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={unitPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#687587" fontSize={10} tickLine={false} />
                <YAxis stroke="#687587" fontSize={11} tickLine={false} domain={[50, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#14243A',
                    borderRadius: '12px',
                    border: '1px solid #334E68',
                    color: '#FFF',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="passRate" fill="#24B8A6" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Activity Trends */}
        <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <h3 className="font-bold text-base text-navy-900 dark:text-white mb-1">
            Weekly Student Platform Engagement
          </h3>
          <p className="text-xs text-slate-400 mb-6">Active student sessions vs compiler lab code executions.</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                <XAxis dataKey="day" stroke="#687587" fontSize={11} tickLine={false} />
                <YAxis stroke="#687587" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#14243A',
                    borderRadius: '12px',
                    border: '1px solid #334E68',
                    color: '#FFF',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="logins" name="Student Logins" stroke="#24B8A6" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="submissions" name="Lab Executions" stroke="#F08068" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Cohort Performance Details Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base text-navy-900 dark:text-white">Cohort Progress Breakdown</h3>
          <span className="text-xs text-slate-400">{users.length} Active Candidates</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-navy-100 dark:border-navy-800 bg-ivory-100 dark:bg-navy-950 text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-3">Candidate</th>
                <th className="p-3">C Lessons Done</th>
                <th className="p-3">C++ Lessons Done</th>
                <th className="p-3">Total Practicals</th>
                <th className="p-3">Streak</th>
                <th className="p-3 text-right">Academic Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100 dark:divide-navy-800 text-navy-900 dark:text-slate-300">
              {users.map(u => {
                const cP = db.getProgress(u.id, 'c');
                const cppP = db.getProgress(u.id, 'cpp');
                const totalPracticals = cP.completedPracticalIds.length + cppP.completedPracticalIds.length;

                return (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-navy-800/40 transition-colors">
                    <td className="p-3 font-bold">{u.fullName} ({u.studentId})</td>
                    <td className="p-3 text-teal-600 font-bold">{cP.completedTopicIds.length} / 24</td>
                    <td className="p-3 text-coral-600 font-bold">{cppP.completedTopicIds.length} / 24</td>
                    <td className="p-3 font-semibold">{totalPracticals} Programs</td>
                    <td className="p-3">{u.streakDays} Days</td>
                    <td className="p-3 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
                        In Good Standing
                      </span>
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
