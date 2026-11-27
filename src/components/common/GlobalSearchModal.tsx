import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Terminal, Layers, ArrowRight } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { searchAll } = useProgress();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = searchAll(query);

  const handleSelect = (link: string) => {
    onNavigate(link);
    onClose();
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white dark:bg-navy-900 rounded-2xl shadow-soft-lg max-w-xl w-full border border-navy-100 dark:border-navy-800 overflow-hidden">
        
        {/* Search input field */}
        <div className="flex items-center px-4 py-3.5 border-b border-navy-100 dark:border-navy-800">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search all C & C++ topics, lessons, code practicals..."
            className="w-full bg-transparent text-sm text-navy-900 dark:text-white outline-none placeholder:text-slate-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600 mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] bg-slate-100 dark:bg-navy-800 text-slate-500 font-mono px-1.5 py-0.5 rounded border border-slate-200 dark:border-navy-700">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-[360px] overflow-y-auto p-2">
          {query.trim().length >= 2 ? (
            results.length > 0 ? (
              <div className="space-y-1">
                {results.map(r => (
                  <button
                    key={r.id}
                    onClick={() => handleSelect(r.link)}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-navy-800 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
                        {r.type === 'topic' ? (
                          <BookOpen className="w-4 h-4" />
                        ) : r.type === 'practical' ? (
                          <Terminal className="w-4 h-4" />
                        ) : (
                          <Layers className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-navy-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                          {r.title}
                        </h4>
                        <p className="text-xs text-slate-400">{r.subtitle}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                No matching topics or practical programs found for &ldquo;{query}&rdquo;.
              </div>
            )
          ) : (
            <div className="py-6 px-4 text-xs text-slate-400 space-y-2">
              <p className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                Suggested Searches:
              </p>
              <div className="flex flex-wrap gap-2">
                {['Pointers', 'Bubble Sort', 'Recursion', 'Virtual Functions', 'Templates', 'File Handling', 'STL Vectors'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-teal-50 hover:text-teal-600 transition-colors text-xs"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
