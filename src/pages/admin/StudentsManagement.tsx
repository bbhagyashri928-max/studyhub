import React, { useState } from 'react';
import { db } from '@/services/db';
import { UserProfile } from '@/types';
import { 
  Users, Search, Filter, CheckCircle2, XCircle, Shield, 
  ArrowRight, Mail, Hash, BookOpen, Clock, AlertTriangle 
} from 'lucide-react';

export const StudentsManagement: React.FC = () => {
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState<'all' | 'c' | 'cpp'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ACTIVE' | 'INACTIVE'>('all');
  const [selectedStudent, setSelectedStudent] = useState<UserProfile | null>(null);

  const users = db.getUsers().filter(u => u.role === 'STUDENT');

  const filteredStudents = users.filter(s => {
    const matchesSearch = s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.studentId && s.studentId.toLowerCase().includes(search.toLowerCase()));
    const matchesCourse = courseFilter === 'all' || s.enrolledCourses.includes(courseFilter);
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const handleToggleStatus = (id: string) => {
    db.toggleUserStatus(id);
    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent(db.getUser(id) || null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-100 dark:border-navy-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400">
              User Administration
            </span>
            <span className="text-xs text-slate-400">• Role-Based Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mt-1">
            Student Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review registered students, monitor individual learning progress, and activate or deactivate accounts.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search students by name, email, or Student ID..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white outline-none focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={courseFilter}
            onChange={e => setCourseFilter(e.target.value as any)}
            className="px-3 py-2 text-xs rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white outline-none"
          >
            <option value="all">All Course Tracks</option>
            <option value="c">C Track Enrolled</option>
            <option value="cpp">C++ Track Enrolled</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 text-xs rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="ACTIVE">Active Accounts</option>
            <option value="INACTIVE">Deactivated Accounts</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-navy-900 rounded-2xl border border-navy-100 dark:border-navy-800 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-navy-100 dark:border-navy-800 bg-ivory-100 dark:bg-navy-950 text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-4">Student</th>
                <th className="p-4">Student ID</th>
                <th className="p-4">Enrolled Courses</th>
                <th className="p-4">Daily Streak</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100 dark:divide-navy-800 text-navy-900 dark:text-slate-300">
              {filteredStudents.map(student => {
                const cProg = db.getProgress(student.id, 'c');
                const cppProg = db.getProgress(student.id, 'cpp');
                const totalMasteredUnits = cProg.completedUnitIds.length + cppProg.completedUnitIds.length;

                return (
                  <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-navy-800/40 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                          alt={student.fullName}
                          className="w-9 h-9 rounded-full object-cover border border-teal-500/30"
                        />
                        <div>
                          <p className="font-bold text-navy-900 dark:text-white">{student.fullName}</p>
                          <p className="text-[11px] text-slate-400">{student.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-mono font-semibold text-slate-600 dark:text-slate-300">
                      {student.studentId || 'N/A'}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-1.5">
                        {student.enrolledCourses.map(c => (
                          <span
                            key={c}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              c === 'c' ? 'bg-teal-100 text-teal-800' : 'bg-coral-100 text-coral-800'
                            }`}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="p-4 font-semibold">
                      {student.streakDays} Days
                    </td>

                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        student.status === 'ACTIVE'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {student.status === 'ACTIVE' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {student.status}
                      </span>
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-navy-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-teal-700 dark:text-teal-300 font-semibold text-xs transition-colors"
                      >
                        Inspect Progress
                      </button>

                      <button
                        onClick={() => handleToggleStatus(student.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          student.status === 'ACTIVE'
                            ? 'text-rose-600 hover:bg-rose-50'
                            : 'text-emerald-600 hover:bg-emerald-50'
                        }`}
                      >
                        {student.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Progress Inspection Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-navy-900 rounded-3xl shadow-soft-lg max-w-lg w-full border border-navy-100 dark:border-navy-800 p-6 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-navy-100 dark:border-navy-800">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudent.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                  alt={selectedStudent.fullName}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-teal-500/20"
                />
                <div>
                  <h3 className="font-bold text-base text-navy-900 dark:text-white">{selectedStudent.fullName}</h3>
                  <p className="text-xs text-slate-400">{selectedStudent.email} • ID: {selectedStudent.studentId}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 text-slate-400 hover:text-navy-900 dark:hover:text-white rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-ivory-100 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 space-y-2">
                <p className="font-bold text-slate-700 dark:text-slate-200">C Language Progress:</p>
                <p className="text-slate-500">
                  Topics Completed: <span className="font-bold text-navy-900 dark:text-white">{db.getProgress(selectedStudent.id, 'c').completedTopicIds.length}</span>
                </p>
                <p className="text-slate-500">
                  Practicals Executed: <span className="font-bold text-navy-900 dark:text-white">{db.getProgress(selectedStudent.id, 'c').completedPracticalIds.length}</span>
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-ivory-100 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 space-y-2">
                <p className="font-bold text-slate-700 dark:text-slate-200">C++ Programming Progress:</p>
                <p className="text-slate-500">
                  Topics Completed: <span className="font-bold text-navy-900 dark:text-white">{db.getProgress(selectedStudent.id, 'cpp').completedTopicIds.length}</span>
                </p>
                <p className="text-slate-500">
                  Practicals Executed: <span className="font-bold text-navy-900 dark:text-white">{db.getProgress(selectedStudent.id, 'cpp').completedPracticalIds.length}</span>
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-5 py-2 rounded-xl bg-navy-900 text-white font-bold text-xs"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
