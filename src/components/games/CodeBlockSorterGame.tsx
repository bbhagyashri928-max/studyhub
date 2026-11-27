import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, Sparkles, ArrowDown, HelpCircle, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CodeBlockSorterGameProps {
  initialCodeSnippet?: string;
  conceptTitle?: string;
  onGameCompleted?: (score: number) => void;
}

interface PuzzleItem {
  id: number;
  text: string;
  hint: string;
}

export const CodeBlockSorterGame: React.FC<CodeBlockSorterGameProps> = ({
  initialCodeSnippet,
  conceptTitle = 'Program Construction Puzzle',
  onGameCompleted,
}) => {
  // Extract or generate meaningful code lines from snippet or provide robust default
  const defaultPuzzle: { items: PuzzleItem[]; correctOrder: number[]; explanation: string } = React.useMemo(() => {
    if (initialCodeSnippet && initialCodeSnippet.trim().split('\n').filter(l => l.trim().length > 0).length >= 4) {
      const rawLines = initialCodeSnippet
        .split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 0 && !l.startsWith('//'))
        .slice(0, 6);

      if (rawLines.length >= 4) {
        const items = rawLines.map((line, idx) => ({
          id: idx,
          text: line,
          hint: `Step ${idx + 1} in typical execution order`,
        }));
        // Scramble the order for the player
        return {
          items: [...items].sort(() => 0.5 - Math.random()),
          correctOrder: items.map(i => i.id),
          explanation: 'Code in C/C++ must follow strict sequential logic: declarations before usage, and return at the end!',
        };
      }
    }

    // Default rich puzzle
    return {
      items: [
        { id: 0, text: '#include <stdio.h>', hint: 'Header inclusion must appear at the top' },
        { id: 1, text: 'int main() {', hint: 'Entry function opening' },
        { id: 2, text: '    int count = 10;', hint: 'Variable declaration and initialization' },
        { id: 3, text: '    printf("Count is: %d\\n", count);', hint: 'Print statement using the variable' },
        { id: 4, text: '    return 0;', hint: 'Return statement to OS' },
        { id: 5, text: '}', hint: 'Closing block brace' },
      ].sort(() => 0.5 - Math.random()),
      correctOrder: [0, 1, 2, 3, 4, 5],
      explanation: 'In C/C++, programs follow a strict compilation order: Preprocessor headers (#include) -> main() signature -> variable declarations -> processing/I-O statements -> return 0 exit code.',
    };
  }, [initialCodeSnippet]);

  const [availableItems, setAvailableItems] = useState<PuzzleItem[]>(defaultPuzzle.items);
  const [selectedOrder, setSelectedOrder] = useState<PuzzleItem[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSelectBlock = (item: PuzzleItem) => {
    if (isChecked) return;
    setAvailableItems(prev => prev.filter(i => i.id !== item.id));
    setSelectedOrder(prev => [...prev, item]);
  };

  const handleRemoveBlock = (item: PuzzleItem) => {
    if (isChecked) return;
    setSelectedOrder(prev => prev.filter(i => i.id !== item.id));
    setAvailableItems(prev => [...prev, item]);
  };

  const handleReset = () => {
    setAvailableItems(defaultPuzzle.items);
    setSelectedOrder([]);
    setIsChecked(false);
    setIsCorrect(false);
    setShowHint(false);
  };

  const handleVerify = () => {
    setIsChecked(true);
    const userOrderIds = selectedOrder.map(i => i.id);
    const targetOrder = defaultPuzzle.correctOrder;

    const correct =
      userOrderIds.length === targetOrder.length &&
      userOrderIds.every((id, idx) => id === targetOrder[idx]);

    setIsCorrect(correct);

    if (correct) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      if (onGameCompleted) {
        onGameCompleted(50);
      }
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 space-y-5 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
            🧩
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Syntax & Logic Sorter</h4>
            <p className="text-xs text-slate-400">
              Click or tap blocks to arrange the code in the correct execution sequence.
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Target Construction Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-teal-400 flex items-center gap-1.5">
            <ArrowDown className="w-3.5 h-3.5" />
            <span>Assembled Program ({selectedOrder.length}/{defaultPuzzle.correctOrder.length} lines placed)</span>
          </span>
          <span className="text-[11px] text-slate-500">Tap a line to remove</span>
        </div>

        <div className="min-h-[140px] p-3 rounded-xl bg-slate-950 border-2 border-dashed border-slate-800 flex flex-col gap-2 font-mono text-xs">
          {selectedOrder.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-600 py-6">
              <span className="text-2xl mb-1">👆</span>
              <span>Tap code blocks below to build the program line by line</span>
            </div>
          ) : (
            selectedOrder.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleRemoveBlock(item)}
                className={`w-full text-left px-3 py-2 rounded-lg border transition-all flex items-center justify-between ${
                  isChecked
                    ? defaultPuzzle.correctOrder[idx] === item.id
                      ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                      : 'bg-rose-950/40 border-rose-500/60 text-rose-300'
                    : 'bg-slate-900 border-slate-700 hover:border-teal-500 text-teal-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 text-[10px] select-none">{idx + 1}</span>
                  <code>{item.text}</code>
                </div>
                <span className="text-[10px] text-slate-500 hover:text-rose-400">✕</span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Available Scrambled Blocks */}
      {availableItems.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-400">Available Code Blocks:</span>
          <div className="flex flex-wrap gap-2">
            {availableItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleSelectBlock(item)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 hover:border-teal-400/50 border border-slate-700 font-mono text-xs text-slate-200 transition-all shadow-sm active:scale-95"
              >
                + {item.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action / Result */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 self-start sm:self-center"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{showHint ? 'Hide Hint' : 'Need a hint?'}</span>
        </button>

        <button
          disabled={selectedOrder.length < defaultPuzzle.correctOrder.length}
          onClick={handleVerify}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <Sparkles className="w-4 h-4" />
          <span>Verify & Run Construction</span>
        </button>
      </div>

      {/* Hint Alert */}
      {showHint && (
        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/50 text-xs text-amber-200">
          💡 <strong>Hint:</strong> Remember the program lifecycle. The compiler starts at <code>main()</code>, executes variable declarations first, evaluates statements sequentially, and exits at <code>return 0;</code>.
        </div>
      )}

      {/* Verification Feedback */}
      {isChecked && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 animate-in fade-in ${
            isCorrect
              ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
              : 'bg-rose-950/30 border-rose-800/60 text-rose-300'
          }`}
        >
          {isCorrect ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          ) : (
            <Trophy className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
          )}
          <div className="text-xs space-y-1">
            <div className="font-bold">
              {isCorrect ? '🎉 Spectacular! Perfect Code Architecture!' : '⚠️ Logic Sequence Error!'}
            </div>
            <p className="text-slate-300">{defaultPuzzle.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};
