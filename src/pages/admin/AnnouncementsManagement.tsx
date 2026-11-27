import React, { useState } from 'react';
import { db } from '@/services/db';
import { Announcement } from '@/types';
import { Bell, Plus, Trash2, CheckCircle2, Megaphone, AlertCircle } from 'lucide-react';

export const AnnouncementsManagement: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => db.getAnnouncements());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'academic' | 'feature' | 'urgent' | 'tip'>('academic');
  const [targetCourse, setTargetCourse] = useState<'all' | 'c' | 'cpp'>('all');
  const [isImportant, setIsImportant] = useState(false);

  const refreshAnnouncements = () => {
    setAnnouncements(db.getAnnouncements());
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title,
      content,
      category,
      author: 'Academy Faculty',
      targetCourse,
      isImportant,
      createdAt: new Date().toISOString()
    };
    db.saveAnnouncement(newAnn);
    setIsModalOpen(false);
    setTitle('');
    setContent('');
    refreshAnnouncements();
    db.logActivity('admin', 'Admin', 'Announcement Published', `Broadcast announcement: "${title}"`);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete announcement "${title}"?`)) {
      db.deleteAnnouncement(id);
      refreshAnnouncements();
      db.logActivity('admin', 'Admin', 'Announcement Deleted', `Deleted "${title}"`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-100 dark:border-navy-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400">
              Communication Center
            </span>
            <span className="text-xs text-slate-400">• Student Broadcasts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mt-1">
            Announcements & Bulletins
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Publish semester notices, practical lab reminders, and academic milestones directly to student dashboards.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-navy-950 font-bold text-xs transition-all shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Announcement</span>
        </button>
      </div>

      {/* Announcements List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  ann.category === 'urgent' ? 'bg-rose-100 text-rose-700' :
                  ann.category === 'feature' ? 'bg-purple-100 text-purple-700' :
                  ann.category === 'tip' ? 'bg-amber-100 text-amber-700' : 'bg-teal-100 text-teal-700'
                }`}>
                  {ann.category} • {ann.targetCourse.toUpperCase()}
                </span>

                <button
                  onClick={() => handleDelete(ann.id, ann.title)}
                  className="p-1 text-slate-300 hover:text-rose-500 transition-colors"
                  title="Delete announcement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="font-bold text-base text-navy-900 dark:text-white leading-snug">
                {ann.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {ann.content}
              </p>
            </div>

            <div className="pt-3 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>By {ann.author}</span>
              <span>{new Date(ann.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* New Announcement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-navy-900 rounded-3xl shadow-soft-lg max-w-lg w-full border border-navy-100 dark:border-navy-800 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-navy-100 dark:border-navy-800">
              <h3 className="font-bold text-base text-navy-900 dark:text-white">Publish New Announcement</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Practical Exam Schedule"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 outline-none text-navy-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 outline-none text-navy-900 dark:text-white"
                  >
                    <option value="academic">Academic</option>
                    <option value="feature">Feature</option>
                    <option value="tip">Study Tip</option>
                    <option value="urgent">Urgent Notice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">Target Track</label>
                  <select
                    value={targetCourse}
                    onChange={e => setTargetCourse(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 outline-none text-navy-900 dark:text-white"
                  >
                    <option value="all">All Students</option>
                    <option value="c">C Students</option>
                    <option value="cpp">C++ Students</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">Announcement Message</label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Write message to be shown on student dashboard..."
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 outline-none text-navy-900 dark:text-white leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="importantCheck"
                  checked={isImportant}
                  onChange={e => setIsImportant(e.target.checked)}
                  className="w-4 h-4 accent-teal-500 rounded"
                />
                <label htmlFor="importantCheck" className="text-slate-600 dark:text-slate-300 font-semibold">
                  Highlight as Urgent / Important
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-500 text-navy-950 font-bold"
                >
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
