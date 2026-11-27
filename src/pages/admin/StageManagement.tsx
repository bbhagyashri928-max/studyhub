import React, { useState } from 'react';
import { db } from '@/services/db';
import { Stage, CourseId, Unit, Topic } from '@/types';
import { 
  Layers, Plus, Edit, Trash2, CheckCircle2, XCircle, 
  ChevronUp, ChevronDown, Lock, Unlock, Eye, Save, X, 
  Code2, Sparkles, BookOpen 
} from 'lucide-react';

export const StageManagement: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<CourseId>('c');
  const units = db.getUnits(selectedCourse);
  const [selectedUnitId, setSelectedUnitId] = useState<string>(units[0]?.id || '');
  
  const currentUnit = units.find(u => u.id === selectedUnitId) || units[0];
  const topics = currentUnit ? currentUnit.topics : [];
  const [selectedTopicId, setSelectedTopicId] = useState<string>(topics[0]?.id || '');

  const currentTopic = topics.find(t => t.id === selectedTopicId) || topics[0];

  const [stages, setStages] = useState<Stage[]>(() => {
    return currentTopic ? db.getStages(currentTopic.id) : [];
  });

  const [settings, setSettings] = useState(() => db.getStageSettings());
  const [editingStage, setEditingStage] = useState<Stage | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form local state for creating / editing
  const [formStage, setFormStage] = useState<Partial<Stage>>({});
  const [definitionsText, setDefinitionsText] = useState('');
  const [pointsText, setPointsText] = useState('');

  const refreshStages = (topicId: string = selectedTopicId) => {
    setStages(db.getStages(topicId));
  };

  const handleCourseChange = (course: CourseId) => {
    setSelectedCourse(course);
    const newUnits = db.getUnits(course);
    const firstUnit = newUnits[0];
    const firstTopic = firstUnit?.topics[0];
    setSelectedUnitId(firstUnit?.id || '');
    setSelectedTopicId(firstTopic?.id || '');
    if (firstTopic) {
      setStages(db.getStages(firstTopic.id));
    } else {
      setStages([]);
    }
  };

  const handleUnitChange = (unitId: string) => {
    setSelectedUnitId(unitId);
    const targetUnit = units.find(u => u.id === unitId);
    const firstTopic = targetUnit?.topics[0];
    setSelectedTopicId(firstTopic?.id || '');
    if (firstTopic) {
      setStages(db.getStages(firstTopic.id));
    } else {
      setStages([]);
    }
  };

  const handleTopicChange = (topicId: string) => {
    setSelectedTopicId(topicId);
    refreshStages(topicId);
  };

  const handleToggleSequentialLock = () => {
    const nextVal = !settings.sequentialLockEnabled;
    db.updateStageSettings({ sequentialLockEnabled: nextVal });
    setSettings(prev => ({ ...prev, sequentialLockEnabled: nextVal }));
    db.logActivity('admin', 'Admin', 'Stage Settings Updated', `Sequential unlocking set to ${nextVal ? 'ENABLED' : 'DISABLED'}`);
  };

  const handleTogglePublish = (stage: Stage) => {
    const updated = { ...stage, published: !stage.published };
    db.saveStage(updated);
    refreshStages();
    db.logActivity('admin', 'Admin', 'Stage Status Toggled', `Stage ${stage.stageNumber} is now ${updated.published ? 'Published' : 'Draft'}`);
  };

  const handleDeleteStage = (stageId: string, stageTitle: string) => {
    if (window.confirm(`Are you sure you want to delete stage "${stageTitle}"? This cannot be undone.`)) {
      db.deleteStage(stageId);
      refreshStages();
      db.logActivity('admin', 'Admin', 'Stage Deleted', `Deleted stage "${stageTitle}"`);
    }
  };

  const handleMoveStage = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= stages.length) return;

    const newStages = [...stages];
    const temp = newStages[index];
    newStages[index] = newStages[targetIndex];
    newStages[targetIndex] = temp;

    db.reorderStages(selectedTopicId, newStages.map(s => s.id));
    refreshStages();
  };

  const openCreateModal = () => {
    const nextNum = stages.length + 1;
    const newStage: Stage = {
      id: `${selectedTopicId}-s${Date.now()}`,
      topicId: selectedTopicId,
      unitId: selectedUnitId,
      courseId: selectedCourse,
      stageNumber: nextNum,
      title: `${currentTopic?.title || 'Topic'}: Stage ${nextNum}`,
      subtitle: `Concept Level ${nextNum}`,
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      content: {
        explanation: '',
        definitions: [],
        syntax: '',
        realLifeExample: '',
        codeSnippet: '',
        expectedOutput: '',
        pointsToRemember: []
      },
      quiz: {
        question: 'What is the primary concept verified in this stage?',
        options: ['Valid syntax and memory execution', 'Undefined behavior', 'Random output', 'Compilation failure'],
        correctIndex: 0,
        explanation: 'Syntax correctness and structured execution is fundamental.'
      }
    };
    setFormStage(newStage);
    setDefinitionsText('');
    setPointsText('');
    setIsCreating(true);
  };

  const openEditModal = (stage: Stage) => {
    setFormStage({ ...stage, content: { ...stage.content } });
    setDefinitionsText((stage.content.definitions || []).join('\n'));
    setPointsText((stage.content.pointsToRemember || []).join('\n'));
    setEditingStage(stage);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formStage.title || !currentTopic) return;

    const definitions = definitionsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const pointsToRemember = pointsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const fullStage: Stage = {
      id: formStage.id || `${selectedTopicId}-s${Date.now()}`,
      topicId: selectedTopicId,
      unitId: selectedUnitId,
      courseId: selectedCourse,
      stageNumber: formStage.stageNumber || stages.length + 1,
      title: formStage.title,
      subtitle: formStage.subtitle,
      published: formStage.published !== undefined ? formStage.published : true,
      createdAt: formStage.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      content: {
        explanation: formStage.content?.explanation || '',
        definitions,
        syntax: formStage.content?.syntax,
        realLifeExample: formStage.content?.realLifeExample,
        codeSnippet: formStage.content?.codeSnippet,
        expectedOutput: formStage.content?.expectedOutput,
        pointsToRemember
      },
      quiz: formStage.quiz
    };

    db.saveStage(fullStage);
    refreshStages();
    setIsCreating(false);
    setEditingStage(null);
    db.logActivity('admin', 'Admin', 'Stage Saved', `Saved stage "${fullStage.title}"`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-navy-100 dark:border-navy-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Curriculum Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mt-1">
            Topic-Wise Stage Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Author, edit, reorder, and configure the numbered learning stages for every individual topic across C and C++.
          </p>
        </div>

        {/* Global Settings: Sequential Lock Toggle */}
        <div className="flex items-center gap-3 bg-white dark:bg-navy-900 p-3 rounded-2xl border border-navy-100 dark:border-navy-800 shadow-soft">
          <div className="text-right">
            <span className="text-xs font-bold text-navy-900 dark:text-white block">Sequential Locking</span>
            <span className="text-[10px] text-slate-400 block">
              {settings.sequentialLockEnabled ? 'Enforce Stage 1 -> 2 -> 3' : 'All Stages Open'}
            </span>
          </div>

          <button
            onClick={handleToggleSequentialLock}
            className={`p-2.5 rounded-xl transition-all ${
              settings.sequentialLockEnabled
                ? 'bg-teal-500 text-navy-950 shadow-soft'
                : 'bg-slate-200 dark:bg-navy-800 text-slate-600 dark:text-slate-400'
            }`}
            title="Toggle sequential stage locking for students"
          >
            {settings.sequentialLockEnabled ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Selectors Bar: Course, Unit, Topic */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-navy-900 p-5 rounded-2xl border border-navy-100 dark:border-navy-800 shadow-soft">
        
        {/* 1. Language Course Selector */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            1. Select Language
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleCourseChange('c')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                selectedCourse === 'c'
                  ? 'bg-teal-500 text-navy-950 shadow-soft'
                  : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              C Programming
            </button>
            <button
              onClick={() => handleCourseChange('cpp')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                selectedCourse === 'cpp'
                  ? 'bg-coral-500 text-white shadow-soft'
                  : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              C++ Programming
            </button>
          </div>
        </div>

        {/* 2. Unit Selector */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            2. Select Unit
          </label>
          <select
            value={selectedUnitId}
            onChange={(e) => handleUnitChange(e.target.value)}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-navy-800 text-navy-900 dark:text-slate-200 border border-slate-200 dark:border-navy-700 outline-none focus:border-teal-500"
          >
            {units.map(u => (
              <option key={u.id} value={u.id}>
                Unit {u.unitNumber}: {u.title}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Topic Selector */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            3. Select Topic
          </label>
          <select
            value={selectedTopicId}
            onChange={(e) => handleTopicChange(e.target.value)}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-navy-800 text-navy-900 dark:text-slate-200 border border-slate-200 dark:border-navy-700 outline-none focus:border-teal-500"
          >
            {topics.map((t, idx) => (
              <option key={t.id} value={t.id}>
                Topic {idx + 1}: {t.title}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Stage Grid & Action Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-navy-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-500" />
            <span>Stages for: {currentTopic?.title}</span>
          </h2>
          <span className="text-xs text-slate-400">
            {stages.length} Configured Stage Boxes (Rendered as interactive buttons in student view)
          </span>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-navy-950 font-bold text-xs shadow-soft transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Stage</span>
        </button>
      </div>

      {/* Stage Table List */}
      <div className="bg-white dark:bg-navy-900 rounded-3xl border border-navy-100 dark:border-navy-800 shadow-soft overflow-hidden">
        {stages.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <Layers className="w-10 h-10 mx-auto text-slate-300 dark:text-navy-700" />
            <p className="text-sm font-semibold">No stages found for this topic.</p>
            <button
              onClick={openCreateModal}
              className="px-4 py-2 rounded-xl bg-teal-500 text-navy-950 text-xs font-bold shadow-soft"
            >
              Create Stage 1
            </button>
          </div>
        ) : (
          <div className="divide-y divide-navy-50 dark:divide-navy-800/60">
            {stages.map((stage, index) => (
              <div 
                key={stage.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-navy-800/40 transition-colors"
              >
                {/* Left Stage Info */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl border border-dashed border-teal-500/60 bg-teal-500/10 flex items-center justify-center font-mono font-bold text-teal-600 dark:text-teal-300 flex-shrink-0">
                    {stage.stageNumber}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                        {stage.subtitle || `Stage ${stage.stageNumber}`}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        stage.published 
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' 
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                      }`}>
                        {stage.published ? 'Published' : 'Draft'}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm sm:text-base text-navy-900 dark:text-white">
                      {stage.title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 max-w-xl">
                      {stage.content.explanation}
                    </p>
                  </div>
                </div>

                {/* Right Action Controls */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  
                  {/* Reorder Up */}
                  <button
                    disabled={index === 0}
                    onClick={() => handleMoveStage(index, 'up')}
                    className="p-2 rounded-lg text-slate-400 hover:text-navy-900 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                    title="Move stage up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>

                  {/* Reorder Down */}
                  <button
                    disabled={index === stages.length - 1}
                    onClick={() => handleMoveStage(index, 'down')}
                    className="p-2 rounded-lg text-slate-400 hover:text-navy-900 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                    title="Move stage down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* Toggle Publish */}
                  <button
                    onClick={() => handleTogglePublish(stage)}
                    className="p-2 rounded-lg text-slate-400 hover:text-teal-500 transition-colors"
                    title={stage.published ? 'Unpublish' : 'Publish'}
                  >
                    {stage.published ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Eye className="w-4 h-4" />}
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => openEditModal(stage)}
                    className="p-2 rounded-lg text-slate-400 hover:text-blue-500 transition-colors"
                    title="Edit stage content"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDeleteStage(stage.id, stage.title)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                    title="Delete stage"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE / EDIT STAGE MODAL FORM */}
      {(isCreating || editingStage) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-navy-900 rounded-3xl border border-navy-100 dark:border-navy-800 w-full max-w-3xl max-h-[92vh] flex flex-col shadow-soft-lg overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-navy-100 dark:border-navy-800 flex items-center justify-between bg-slate-50 dark:bg-navy-950">
              <h3 className="font-extrabold text-lg text-navy-900 dark:text-white">
                {isCreating ? 'Create New Stage' : `Edit Stage ${formStage.stageNumber}`}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingStage(null);
                }}
                className="p-1 rounded-xl text-slate-400 hover:text-navy-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveForm} className="flex-1 overflow-y-auto p-6 space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">
                    Stage Number
                  </label>
                  <input
                    type="number"
                    value={formStage.stageNumber || 1}
                    onChange={(e) => setFormStage({ ...formStage, stageNumber: parseInt(e.target.value) || 1 })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-navy-900 dark:text-white font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">
                    Stage Subtitle / Phase Tag
                  </label>
                  <input
                    type="text"
                    value={formStage.subtitle || ''}
                    onChange={(e) => setFormStage({ ...formStage, subtitle: e.target.value })}
                    placeholder="e.g. Concept Level 1"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-navy-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">
                  Stage Title
                </label>
                <input
                  type="text"
                  value={formStage.title || ''}
                  onChange={(e) => setFormStage({ ...formStage, title: e.target.value })}
                  placeholder="e.g. Memory Layout & Allocation"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-navy-900 dark:text-white font-semibold"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">
                  Core Lesson Explanation
                </label>
                <textarea
                  rows={3}
                  value={formStage.content?.explanation || ''}
                  onChange={(e) => setFormStage({
                    ...formStage,
                    content: { ...formStage.content!, explanation: e.target.value }
                  })}
                  placeholder="Explain the specific concept clearly..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-navy-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">
                  Important Definitions (One per line)
                </label>
                <textarea
                  rows={2}
                  value={definitionsText}
                  onChange={(e) => setDefinitionsText(e.target.value)}
                  placeholder="Term: Definition..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-navy-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">
                  Syntax / Grammar Specification
                </label>
                <textarea
                  rows={2}
                  value={formStage.content?.syntax || ''}
                  onChange={(e) => setFormStage({
                    ...formStage,
                    content: { ...formStage.content!, syntax: e.target.value }
                  })}
                  placeholder="void func(int param);"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-teal-400 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">
                  Real-Life Analogy
                </label>
                <input
                  type="text"
                  value={formStage.content?.realLifeExample || ''}
                  onChange={(e) => setFormStage({
                    ...formStage,
                    content: { ...formStage.content!, realLifeExample: e.target.value }
                  })}
                  placeholder="Relatable real-world metaphor..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-navy-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">
                  Code Example
                </label>
                <textarea
                  rows={4}
                  value={formStage.content?.codeSnippet || ''}
                  onChange={(e) => setFormStage({
                    ...formStage,
                    content: { ...formStage.content!, codeSnippet: e.target.value }
                  })}
                  placeholder="#include <stdio.h>..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-emerald-400 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">
                  Expected Terminal Output
                </label>
                <input
                  type="text"
                  value={formStage.content?.expectedOutput || ''}
                  onChange={(e) => setFormStage({
                    ...formStage,
                    content: { ...formStage.content!, expectedOutput: e.target.value }
                  })}
                  placeholder="Output printed to console..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-navy-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">
                  Points to Remember (One per line)
                </label>
                <textarea
                  rows={2}
                  value={pointsText}
                  onChange={(e) => setPointsText(e.target.value)}
                  placeholder="Key takeaway 1..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-navy-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedCheck"
                  checked={formStage.published ?? true}
                  onChange={(e) => setFormStage({ ...formStage, published: e.target.checked })}
                  className="w-4 h-4 text-teal-500 rounded"
                />
                <label htmlFor="publishedCheck" className="text-xs font-bold text-navy-900 dark:text-white">
                  Publish immediately (Visible to students)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-navy-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingStage(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-navy-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-600 text-navy-950 shadow-soft"
                >
                  Save Stage
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
