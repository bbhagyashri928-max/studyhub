import React, { useState } from 'react';
import { useProgress } from '@/context/ProgressContext';
import { Bookmark as BookmarkIcon, BookOpen, Terminal, Trash2, ArrowRight } from 'lucide-react';

interface BookmarksProps {
  onNavigate: (route: string) => void;
}

export const Bookmarks: React.FC<BookmarksProps> = ({ onNavigate }) => {
  const { bookmarks, toggleBookmark } = useProgress();
  const [filterType, setFilterType] = useState<'all' | 'topic' | 'practical'>('all');

  const filteredBookmarks = bookmarks.filter(b => {
    if (filterType === 'all') return true;
    return b.type === filterType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-100 dark:border-navy-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
              Personal Study Vault
            </span>
            <span className="text-xs text-slate-400">• Quick Access</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mt-1">
            Saved Bookmarks ({bookmarks.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Access your pinned lessons, code examples, and practical programs anytime.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex p-1 rounded-xl bg-ivory-100 dark:bg-navy-900 border border-navy-100 dark:border-navy-800 self-start sm:self-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'all'
                ? 'bg-navy-900 dark:bg-teal-500 text-white dark:text-navy-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            All ({bookmarks.length})
          </button>
          <button
            onClick={() => setFilterType('topic')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'topic'
                ? 'bg-navy-900 dark:bg-teal-500 text-white dark:text-navy-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Topics ({bookmarks.filter(b => b.type === 'topic').length})
          </button>
          <button
            onClick={() => setFilterType('practical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'practical'
                ? 'bg-navy-900 dark:bg-teal-500 text-white dark:text-navy-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Practicals ({bookmarks.filter(b => b.type === 'practical').length})
          </button>
        </div>
      </div>

      {/* Bookmarks Grid */}
      {filteredBookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBookmarks.map((bm) => (
            <div
              key={bm.id}
              className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft hover:shadow-soft-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    bm.type === 'topic'
                      ? 'bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400'
                      : 'bg-coral-100 dark:bg-coral-950 text-coral-700 dark:text-coral-400'
                  }`}>
                    {bm.courseId.toUpperCase()} • {bm.type === 'topic' ? 'Lesson Topic' : 'Practical Program'}
                  </span>

                  <button
                    onClick={() => toggleBookmark({
                      type: bm.type,
                      itemId: bm.itemId,
                      itemTitle: bm.itemTitle,
                      courseId: bm.courseId
                    })}
                    className="p-1 text-slate-300 hover:text-rose-500 rounded-lg transition-colors"
                    title="Remove from bookmarks"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-bold text-base text-navy-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                  {bm.itemTitle}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{bm.subtitle || bm.category || 'Curriculum Resource'}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">
                  Saved {new Date(bm.createdAt).toLocaleDateString()}
                </span>

                <button
                  onClick={() => {
                    if (bm.type === 'topic') {
                      onNavigate(`course-${bm.courseId}`);
                    } else {
                      onNavigate(`practical-lab?course=${bm.courseId}`);
                    }
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  <span>Open Item</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-3xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 p-8 shadow-soft">
          <BookmarkIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-navy-900 dark:text-white">No Bookmarks Saved Yet</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            While studying topics or practical lab programs, click the bookmark icon to save lessons here for quick revision.
          </p>
        </div>
      )}

    </div>
  );
};
