import React, { useState } from 'react';
import { db } from '@/services/db';
import { Unit, Topic, CourseId } from '@/types';
import { 
  BookOpen, Plus, Edit, Trash2, CheckCircle2, XCircle, 
  ChevronRight, Save, X, Eye, FileCode 
} from 'lucide-react';

export const CourseManagement: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<CourseId>('c');
  const [units, setUnits] = useState<Unit[]>(() => db.getUnits(selectedCourse));
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [editingTopic, setEditingTopic] = useState<{ unitId: string; topic: Topic } | null>(null);
  const [isNewUnitModal, setIsNewUnitModal] = useState(false);

  const refreshUnits = (course: CourseId = selectedCourse) => {
    setUnits(db.getUnits(course));
  };

  const handleCourseSwitch = (course: CourseId) => {
    setSelectedCourse(course);
    refreshUnits(course);
  };

  const handleTogglePublish = (unit: Unit) => {
    const updated = { ...unit, published: !unit.published };
    db.saveUnit(updated);
    refreshUnits();
    db.logActivity('admin', 'Admin', 'Unit Publish Toggled', `${unit.title} is now ${updated.published ? 'Published' : 'Draft'}`);
  };

  const handleDeleteUnit = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete unit "${title}"? This action cannot be undone.`)) {
      db.deleteUnit(id);
      refreshUnits();
      db.logActivity('admin', 'Admin', 'Unit Deleted', `Deleted unit "${title}"`);
    }
  };

  const handleSaveUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUnit) {
      db.saveUnit(editingUnit);
      setEditingUnit(null);
      refreshUnits();
      db.logActivity('admin', 'Admin', 'Unit Saved', `Updated unit "${editingUnit.title}"`);
    }
  };

  const handleSaveTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTopic) {
      db.saveTopic(editingTopic.unitId, editingTopic.topic);
      setEditingTopic(null);
      refreshUnits();
      db.logActivity('admin', 'Admin', 'Topic Saved', `Updated topic "${editingTopic.topic.title}"`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-100 dark:border-navy-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400">
              Curriculum Architecture
            </span>
            <span className="text-xs text-slate-400">• Units & Topic Editor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mt-1">
            Course & Curriculum Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Author and publish educational units, adjust topic contents, and customize code examples for students.
          </p>
        </div>

        {/* Course Track Selector */}
        <div className="flex p-1 rounded-xl bg-ivory-100 dark:bg-navy-900 border border-navy-100 dark:border-navy-800 self-start sm:self-auto gap-1">
          <button
            onClick={() => handleCourseSwitch('c')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedCourse === 'c'
                ? 'bg-teal-500 text-navy-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white'
            }`}
          >
            C Programming ({db.getUnits('c').length} Units)
          </button>
          <button
            onClick={() => handleCourseSwitch('cpp')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedCourse === 'cpp'
                ? 'bg-coral-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white'
            }`}
          >
            C++ Programming ({db.getUnits('cpp').length} Units)
          </button>
          <button
            onClick={() => handleCourseSwitch('other')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedCourse === 'other'
                ? 'bg-lavender-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white'
            }`}
          >
            Systems & Tools ({db.getUnits('other').length} Units)
          </button>
        </div>
      </div>

      {/* Units List */}
      <div className="space-y-4">
        {units.map((unit) => (
          <div
            key={unit.id}
            className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-navy-100 dark:border-navy-800">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-navy-100 dark:bg-navy-800 text-navy-900 dark:text-white font-bold text-xs flex items-center justify-center">
                  U{unit.unitNumber}
                </span>
                <div>
                  <h3 className="font-bold text-base text-navy-900 dark:text-white">{unit.title}</h3>
                  <p className="text-xs text-slate-400">{unit.description}</p>
                </div>
              </div>

              {/* Unit Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTogglePublish(unit)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    unit.published
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {unit.published ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  <span>{unit.published ? 'Published' : 'Draft'}</span>
                </button>

                <button
                  onClick={() => setEditingUnit(unit)}
                  className="p-2 text-slate-500 hover:text-teal-600 hover:bg-slate-50 dark:hover:bg-navy-800 rounded-lg transition-colors"
                  title="Edit unit name & metadata"
                >
                  <Edit className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDeleteUnit(unit.id, unit.title)}
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-navy-800 rounded-lg transition-colors"
                  title="Delete unit"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Topics inside unit */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Topics ({unit.topics.length})
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {unit.topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="p-3 rounded-xl bg-ivory-100 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 flex items-center justify-between text-xs group"
                  >
                    <div className="min-w-0 pr-2">
                      <span className="text-[10px] text-slate-400 font-mono block">Topic {topic.order}</span>
                      <h4 className="font-bold text-navy-900 dark:text-white truncate">{topic.title}</h4>
                    </div>

                    <button
                      onClick={() => setEditingTopic({ unitId: unit.id, topic })}
                      className="px-2.5 py-1 rounded bg-white dark:bg-navy-800 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/60 font-semibold text-[11px] border border-slate-200 dark:border-navy-700 transition-colors"
                    >
                      Edit Content
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Unit Modal */}
      {editingUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-navy-900 rounded-3xl shadow-soft-lg max-w-lg w-full border border-navy-100 dark:border-navy-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-navy-100 dark:border-navy-800">
              <h3 className="font-bold text-base text-navy-900 dark:text-white">Edit Unit Metadata</h3>
              <button onClick={() => setEditingUnit(null)} className="p-1 text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSaveUnit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">Unit Title</label>
                <input
                  type="text"
                  required
                  value={editingUnit.title}
                  onChange={e => setEditingUnit({ ...editingUnit, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 outline-none focus:border-teal-500 text-navy-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">Unit Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingUnit.description}
                  onChange={e => setEditingUnit({ ...editingUnit, description: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 outline-none focus:border-teal-500 text-navy-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingUnit(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-700 text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-500 text-navy-950 font-bold"
                >
                  Save Unit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Topic Modal */}
      {editingTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-navy-900 rounded-3xl shadow-soft-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-navy-100 dark:border-navy-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-navy-100 dark:border-navy-800">
              <h3 className="font-bold text-base text-navy-900 dark:text-white">Edit Topic Content</h3>
              <button onClick={() => setEditingTopic(null)} className="p-1 text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSaveTopic} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">Topic Title</label>
                <input
                  type="text"
                  required
                  value={editingTopic.topic.title}
                  onChange={e => setEditingTopic({
                    ...editingTopic,
                    topic: { ...editingTopic.topic, title: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 outline-none text-navy-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">Summary / Concept Overview</label>
                <input
                  type="text"
                  value={editingTopic.topic.summary}
                  onChange={e => setEditingTopic({
                    ...editingTopic,
                    topic: { ...editingTopic.topic, summary: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 outline-none text-navy-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">Detailed Academic Definition</label>
                <textarea
                  rows={3}
                  value={editingTopic.topic.content.definition}
                  onChange={e => setEditingTopic({
                    ...editingTopic,
                    topic: {
                      ...editingTopic.topic,
                      content: { ...editingTopic.topic.content, definition: e.target.value }
                    }
                  })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 outline-none text-navy-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">Code Snippet (C / C++)</label>
                <textarea
                  rows={6}
                  value={editingTopic.topic.content.codeSnippet || ''}
                  onChange={e => setEditingTopic({
                    ...editingTopic,
                    topic: {
                      ...editingTopic.topic,
                      content: { ...editingTopic.topic.content, codeSnippet: e.target.value }
                    }
                  })}
                  className="w-full p-3 rounded-xl bg-navy-950 text-slate-200 font-mono text-xs outline-none border border-navy-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingTopic(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-700 text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-500 text-navy-950 font-bold"
                >
                  Save Topic Content
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
