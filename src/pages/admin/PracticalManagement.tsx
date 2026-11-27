import React, { useState } from 'react';
import { db } from '@/services/db';
import { PracticalProgram, CourseId } from '@/types';
import { 
  Terminal, Plus, Edit, Trash2, CheckCircle2, XCircle, 
  Search, Save, X, Code 
} from 'lucide-react';

export const PracticalManagement: React.FC = () => {
  const [courseFilter, setCourseFilter] = useState<CourseId>('c');
  const [practicals, setPracticals] = useState<PracticalProgram[]>(() => db.getPracticals(courseFilter));
  const [editingProgram, setEditingProgram] = useState<PracticalProgram | null>(null);
  const [search, setSearch] = useState('');

  const refreshPracticals = (course: CourseId = courseFilter) => {
    setPracticals(db.getPracticals(course));
  };

  const handleCourseSwitch = (course: CourseId) => {
    setCourseFilter(course);
    refreshPracticals(course);
  };

  const handleTogglePublish = (p: PracticalProgram) => {
    const updated = { ...p, published: !p.published };
    db.savePractical(updated);
    refreshPracticals();
    db.logActivity('admin', 'Admin', 'Practical Publish Toggled', `${p.title} is now ${updated.published ? 'Published' : 'Unpublished'}`);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete practical program "${title}"?`)) {
      db.deletePractical(id);
      refreshPracticals();
      db.logActivity('admin', 'Admin', 'Practical Program Deleted', `Deleted "${title}"`);
    }
  };

  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProgram) {
      db.savePractical(editingProgram);
      setEditingProgram(null);
      refreshPracticals();
      db.logActivity('admin', 'Admin', 'Practical Saved', `Updated practical program "${editingProgram.title}"`);
    }
  };

  const handleCreateNew = () => {
    const newPr: PracticalProgram = {
      id: `${courseFilter}-pr-${Date.now()}`,
      courseId: courseFilter,
      category: 'Basic Programs',
      title: 'New Program Exercise',
      difficulty: 'Beginner',
      problemStatement: 'Enter student problem description here...',
      sourceCode: `#include <stdio.h>\n\nint main() {\n    printf("Hello from newly added practical!\\n");\n    return 0;\n}`,
      explanation: ['Include standard header.', 'Execute logic in main.'],
      sampleInput: '(None)',
      expectedOutput: 'Hello from newly added practical!',
      keyConcepts: ['Standard I/O', 'Entrypoint'],
      published: true
    };
    setEditingProgram(newPr);
  };

  const filtered = practicals.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-100 dark:border-navy-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400">
              Lab Curriculum
            </span>
            <span className="text-xs text-slate-400">• Practical Programs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mt-1">
            Practical Laboratory Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Add, update, and manage runnable source code, test inputs, expected outputs, and logic breakdowns.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Course Track Switcher */}
          <div className="flex p-1 rounded-xl bg-ivory-100 dark:bg-navy-900 border border-navy-100 dark:border-navy-800 gap-1">
            <button
              onClick={() => handleCourseSwitch('c')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                courseFilter === 'c' ? 'bg-teal-500 text-navy-950 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-navy-900'
              }`}
            >
              C Lab ({db.getPracticals('c').length})
            </button>
            <button
              onClick={() => handleCourseSwitch('cpp')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                courseFilter === 'cpp' ? 'bg-coral-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-navy-900'
              }`}
            >
              C++ Lab ({db.getPracticals('cpp').length})
            </button>
            <button
              onClick={() => handleCourseSwitch('other')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                courseFilter === 'other' ? 'bg-lavender-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-navy-900'
              }`}
            >
              Systems Lab ({db.getPracticals('other').length})
            </button>
          </div>

          <button
            onClick={handleCreateNew}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-navy-950 font-bold text-xs transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Program</span>
          </button>
        </div>
      </div>

      {/* Practical Programs Table */}
      <div className="bg-white dark:bg-navy-900 rounded-2xl border border-navy-100 dark:border-navy-800 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-navy-100 dark:border-navy-800 bg-ivory-100 dark:bg-navy-950 text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-4">Category</th>
                <th className="p-4">Program Title</th>
                <th className="p-4">Difficulty</th>
                <th className="p-4">Publish State</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100 dark:divide-navy-800 text-navy-900 dark:text-slate-300">
              {filtered.map(pr => (
                <tr key={pr.id} className="hover:bg-slate-50 dark:hover:bg-navy-800/40 transition-colors">
                  <td className="p-4 font-semibold text-slate-500 dark:text-slate-400">
                    {pr.category}
                  </td>
                  <td className="p-4 font-bold text-navy-900 dark:text-white">
                    {pr.title}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      pr.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-800' :
                      pr.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {pr.difficulty}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleTogglePublish(pr)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                        pr.published
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {pr.published ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      <span>{pr.published ? 'Published' : 'Draft'}</span>
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-1.5">
                    <button
                      onClick={() => setEditingProgram(pr)}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-navy-800 hover:bg-teal-50 dark:hover:bg-teal-950 text-teal-700 dark:text-teal-300 font-semibold text-xs"
                    >
                      Edit Code & I/O
                    </button>
                    <button
                      onClick={() => handleDelete(pr.id, pr.title)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Practical Program Modal */}
      {editingProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-navy-900 rounded-3xl shadow-soft-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-navy-100 dark:border-navy-800 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-navy-100 dark:border-navy-800">
              <h3 className="font-bold text-base text-navy-900 dark:text-white">Author Practical Program</h3>
              <button onClick={() => setEditingProgram(null)} className="p-1 text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSaveProgram} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editingProgram.title}
                    onChange={e => setEditingProgram({ ...editingProgram, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 outline-none text-navy-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={editingProgram.category}
                    onChange={e => setEditingProgram({ ...editingProgram, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 outline-none text-navy-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">Problem Statement</label>
                <textarea
                  rows={2}
                  required
                  value={editingProgram.problemStatement}
                  onChange={e => setEditingProgram({ ...editingProgram, problemStatement: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 outline-none text-navy-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">Complete Source Code</label>
                <textarea
                  rows={8}
                  required
                  value={editingProgram.sourceCode}
                  onChange={e => setEditingProgram({ ...editingProgram, sourceCode: e.target.value })}
                  className="w-full p-3 rounded-xl bg-navy-950 text-slate-200 font-mono text-xs outline-none border border-navy-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">Sample Input</label>
                  <input
                    type="text"
                    value={editingProgram.sampleInput}
                    onChange={e => setEditingProgram({ ...editingProgram, sampleInput: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 outline-none text-navy-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">Expected Output</label>
                  <input
                    type="text"
                    value={editingProgram.expectedOutput}
                    onChange={e => setEditingProgram({ ...editingProgram, expectedOutput: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 outline-none text-navy-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProgram(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-700 text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-500 text-navy-950 font-bold"
                >
                  Save Practical Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
