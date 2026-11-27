import React from 'react';
import { db } from '@/services/db';
import { 
  Users, BookOpen, Terminal, CheckCircle2, TrendingUp, 
  Activity, ArrowRight, ShieldCheck, UserCheck, Bell, Award 
} from 'lucide-react';

interface AdminOverviewProps {
  onNavigate: (route: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onNavigate }) => {
  const stats = db.getGlobalStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Admin Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 border border-navy-800 text-white shadow-soft-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-coral-500/20 text-coral-400 mb-2 border border-coral-500/30">
            Academy Management System
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Administrative Command Center
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
            Real-time management for curriculum modules, practical laboratories, student accounts, certification quizzes, and system activities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate('admin-courses')}
            className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-navy-950 font-bold text-xs transition-all shadow-sm"
          >
            Manage Curriculum
          </button>
          <button
            onClick={() => onNavigate('admin-students')}
            className="px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-bold text-xs transition-all border border-navy-700"
          >
            Student Directory
          </button>
        </div>
      </div>

      {/* 6 Key Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Students</span>
          <p className="text-2xl font-black text-navy-900 dark:text-white mt-1">{stats.totalStudents}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">{stats.activeStudents} Active</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">C Track</span>
          <p className="text-2xl font-black text-teal-600 mt-1">{stats.cEnrollments}</p>
          <span className="text-[10px] text-slate-400">Enrollments</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">C++ Track</span>
          <p className="text-2xl font-black text-coral-600 mt-1">{stats.cppEnrollments}</p>
          <span className="text-[10px] text-slate-400">Enrollments</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Units</span>
          <p className="text-2xl font-black text-navy-900 dark:text-white mt-1">{stats.totalUnits}</p>
          <span className="text-[10px] text-slate-400">10 Certified</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Practicals</span>
          <p className="text-2xl font-black text-navy-900 dark:text-white mt-1">{stats.totalPracticals}</p>
          <span className="text-[10px] text-slate-400">Verified Labs</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Lab Executions</span>
          <p className="text-2xl font-black text-navy-900 dark:text-white mt-1">{stats.totalPracticalCompletions}</p>
          <span className="text-[10px] text-teal-600 font-semibold">Submissions</span>
        </div>
      </div>

      {/* Recent Student Registrations & Real-Time Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Registered Students */}
        <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-teal-500" />
              <h3 className="font-bold text-base text-navy-900 dark:text-white">Recent Student Registrations</h3>
            </div>
            <button
              onClick={() => onNavigate('admin-students')}
              className="text-xs font-bold text-teal-600 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="divide-y divide-navy-100 dark:divide-navy-800">
            {stats.recentUsers.map(student => (
              <div key={student.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={student.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                    alt={student.fullName}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-navy-900 dark:text-white">{student.fullName}</h4>
                    <p className="text-[10px] text-slate-400">{student.studentId} • {student.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    student.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {student.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Activity Logs */}
        <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-coral-500" />
              <h3 className="font-bold text-base text-navy-900 dark:text-white">Latest Academy Activities</h3>
            </div>
            <span className="text-[10px] text-slate-400">Live System Log</span>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {stats.recentActivities.map(act => (
              <div key={act.id} className="p-3 rounded-xl bg-ivory-100 dark:bg-navy-950 border border-navy-100 dark:border-navy-800 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-navy-900 dark:text-white">{act.action}</span>
                  <span className="text-[10px] text-slate-400">{new Date(act.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px]">{act.details}</p>
                <span className="text-[9px] text-teal-600 font-semibold block mt-1">By {act.userName}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
