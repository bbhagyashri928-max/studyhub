import React, { useState } from 'react';
import { db } from '@/services/db';
import { Quiz, QuizQuestion, CourseId } from '@/types';
import { Award, Plus, Edit, Trash2, CheckCircle2, ChevronRight, Save, X, HelpCircle } from 'lucide-react';

export const QuizManagement: React.FC = () => {
  const [courseFilter, setCourseFilter] = useState<CourseId>('c');
  const [quizzes, setQuizzes] = useState<Quiz[]>(() => db.getQuizzes(courseFilter));
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<{ quizId: string; question: QuizQuestion; index: number } | null>(null);

  const refreshQuizzes = (course: CourseId = courseFilter) => {
    setQuizzes(db.getQuizzes(course));
  };

  const handleCourseSwitch = (course: CourseId) => {
    setCourseFilter(course);
    refreshQuizzes(course);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingQuestion && editingQuiz) {
      const updatedQuestions = [...editingQuiz.questions];
      if (editingQuestion.index >= 0) {
        updatedQuestions[editingQuestion.index] = editingQuestion.question;
      } else {
        updatedQuestions.push(editingQuestion.question);
      }
      const updatedQuiz = { ...editingQuiz, questions: updatedQuestions };
      db.saveQuiz(updatedQuiz);
      setEditingQuiz(updatedQuiz);
      setEditingQuestion(null);
      refreshQuizzes();
      db.logActivity('admin', 'Admin', 'Quiz Question Saved', `Saved MCQ for ${updatedQuiz.unitTitle}`);
    }
  };

  const handleDeleteQuestion = (qIndex: number) => {
    if (!editingQuiz) return;
    if (window.confirm('Delete this MCQ from the quiz?')) {
      const updatedQuestions = editingQuiz.questions.filter((_, idx) => idx !== qIndex);
      const updatedQuiz = { ...editingQuiz, questions: updatedQuestions };
      db.saveQuiz(updatedQuiz);
      setEditingQuiz(updatedQuiz);
      refreshQuizzes();
      db.logActivity('admin', 'Admin', 'Quiz Question Deleted', `Deleted question from ${updatedQuiz.unitTitle}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-100 dark:border-navy-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400">
              Assessment Engine
            </span>
            <span className="text-xs text-slate-400">• Unit Certification Quizzes</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mt-1">
            Quiz & Assessment Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure unit quizzes, author multiple choice questions, set answer keys, and write explanations.
          </p>
        </div>

        {/* Course Filter */}
        <div className="flex p-1 rounded-xl bg-ivory-100 dark:bg-navy-900 border border-navy-100 dark:border-navy-800 gap-1">
          <button
            onClick={() => handleCourseSwitch('c')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              courseFilter === 'c' ? 'bg-teal-500 text-navy-950 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-navy-900'
            }`}
          >
            C Quizzes ({db.getQuizzes('c').length})
          </button>
          <button
            onClick={() => handleCourseSwitch('cpp')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              courseFilter === 'cpp' ? 'bg-coral-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-navy-900'
            }`}
          >
            C++ Quizzes ({db.getQuizzes('cpp').length})
          </button>
          <button
            onClick={() => handleCourseSwitch('other')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              courseFilter === 'other' ? 'bg-lavender-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-navy-900'
            }`}
          >
            Systems Quizzes ({db.getQuizzes('other').length})
          </button>
        </div>
      </div>

      {/* Quizzes List */}
      <div className="grid grid-cols-1 gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
                  {quiz.unitTitle}
                </span>
                <h3 className="text-lg font-bold text-navy-900 dark:text-white mt-0.5">{quiz.title}</h3>
                <p className="text-xs text-slate-400">
                  {quiz.questions.length} Multiple Choice Questions • Passing Criteria: {quiz.passingScorePercent}%
                </p>
              </div>
            </div>

            <button
              onClick={() => setEditingQuiz(quiz)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-navy-800 hover:bg-teal-50 dark:hover:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold text-xs transition-colors self-start md:self-auto"
            >
              <Edit className="w-4 h-4" />
              <span>Manage Questions ({quiz.questions.length})</span>
            </button>
          </div>
        ))}
      </div>

      {/* Quiz Detail & Question Editor Modal */}
      {editingQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-navy-900 rounded-3xl shadow-soft-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-navy-100 dark:border-navy-800 p-6 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-navy-100 dark:border-navy-800">
              <div>
                <h3 className="font-bold text-lg text-navy-900 dark:text-white">{editingQuiz.title}</h3>
                <p className="text-xs text-slate-400">{editingQuiz.unitTitle}</p>
              </div>
              <button onClick={() => setEditingQuiz(null)} className="p-1 text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Questions List ({editingQuiz.questions.length})
              </span>
              <button
                onClick={() => setEditingQuestion({
                  quizId: editingQuiz.id,
                  question: {
                    id: `q-${Date.now()}`,
                    question: 'New question statement...',
                    options: ['Option A', 'Option B', 'Option C', 'Option D'],
                    correctIndex: 0,
                    explanation: 'Provide the underlying reason why this answer is correct.'
                  },
                  index: -1
                })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500 text-navy-950 font-bold text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              {editingQuiz.questions.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-xl bg-ivory-100 dark:bg-navy-950 border border-navy-100 dark:border-navy-800 text-xs space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-teal-500 text-navy-950 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="font-bold text-navy-900 dark:text-white">{q.question}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingQuestion({ quizId: editingQuiz.id, question: q, index: idx })}
                        className="p-1 text-teal-600 hover:bg-teal-50 rounded"
                        title="Edit question"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(idx)}
                        className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                        title="Delete question"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pl-7">
                    {q.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-2 rounded-lg border text-[11px] ${
                          optIdx === q.correctIndex
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-800 dark:text-emerald-300 font-bold'
                            : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-navy-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}. {opt} {optIdx === q.correctIndex && '✓'}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setEditingQuiz(null)}
                className="px-5 py-2 rounded-xl bg-navy-900 text-white font-bold text-xs"
              >
                Close Editor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Single MCQ Modal */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-navy-900 rounded-3xl shadow-soft-lg max-w-xl w-full border border-navy-100 dark:border-navy-800 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-navy-100 dark:border-navy-800">
              <h3 className="font-bold text-base text-navy-900 dark:text-white">Author Question</h3>
              <button onClick={() => setEditingQuestion(null)} className="p-1 text-slate-400">✕</button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4">
              <div>
                <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">Question Text</label>
                <textarea
                  rows={2}
                  required
                  value={editingQuestion.question.question}
                  onChange={e => setEditingQuestion({
                    ...editingQuestion,
                    question: { ...editingQuestion.question, question: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 outline-none text-navy-900 dark:text-white"
                />
              </div>

              {/* 4 Options */}
              <div className="space-y-2">
                <label className="block text-slate-500 font-bold uppercase tracking-wider">
                  4 Options (Select radio for correct answer)
                </label>
                {editingQuestion.question.options.map((opt, optIdx) => (
                  <div key={optIdx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={editingQuestion.question.correctIndex === optIdx}
                      onChange={() => setEditingQuestion({
                        ...editingQuestion,
                        question: { ...editingQuestion.question, correctIndex: optIdx }
                      })}
                      className="w-4 h-4 accent-teal-500"
                    />
                    <span className="w-5 font-bold text-slate-500">{String.fromCharCode(65 + optIdx)}:</span>
                    <input
                      type="text"
                      required
                      value={opt}
                      onChange={e => {
                        const newOpts = [...editingQuestion.question.options];
                        newOpts[optIdx] = e.target.value;
                        setEditingQuestion({
                          ...editingQuestion,
                          question: { ...editingQuestion.question, options: newOpts }
                        });
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 outline-none text-navy-900 dark:text-white"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">Detailed Explanation</label>
                <textarea
                  rows={2}
                  required
                  value={editingQuestion.question.explanation}
                  onChange={e => setEditingQuestion({
                    ...editingQuestion,
                    question: { ...editingQuestion.question, explanation: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 outline-none text-navy-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-500 text-navy-950 font-bold"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
