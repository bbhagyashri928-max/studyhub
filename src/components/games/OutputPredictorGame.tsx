import React, { useState } from 'react';
import { Terminal, CheckCircle2, XCircle, RotateCcw, Sparkles, HelpCircle, Flame, ArrowRight, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OutputChallenge {
  title: string;
  codeSnippet: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

const PREDICTOR_CHALLENGES: OutputChallenge[] = [
  {
    title: 'Prefix vs Postfix Increment Mechanics',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 5;
    int b = ++a + a++;
    printf("%d, %d\\n", a, b);
    return 0;
}`,
    options: ['7, 12', '7, 13', '6, 12', '7, 11'],
    correctIndex: 0,
    explanation: 'First, ++a increments a to 6 and evaluates to 6. Then 6 + 6 is computed for b (12), and finally a++ increments a to 7.',
    hint: 'Remember: ++a modifies and returns the new value immediately, while a++ uses the current value and increments after!'
  },
  {
    title: 'Ternary Operator & Short-Circuit Logic',
    codeSnippet: `#include <stdio.h>
int main() {
    int x = 10, y = 20;
    int z = (x > y) ? x : (y > 15 ? 99 : 0);
    printf("Result: %d\\n", z);
    return 0;
}`,
    options: ['Result: 10', 'Result: 20', 'Result: 99', 'Result: 0'],
    correctIndex: 2,
    explanation: 'x > y (10 > 20) evaluates to false (0). The false branch evaluates (y > 15 ? 99 : 0). Since 20 > 15 is true, z is assigned 99.',
    hint: 'Evaluate the outer conditional branch first, then proceed to the inner nested ternary expression.'
  },
  {
    title: 'Loop Counter & Exit Condition',
    codeSnippet: `#include <stdio.h>
int main() {
    int count = 0;
    for (int i = 0; i < 5; i += 2) {
        count += i;
    }
    printf("Final Count: %d\\n", count);
    return 0;
}`,
    options: ['Final Count: 6', 'Final Count: 10', 'Final Count: 4', 'Final Count: 12'],
    correctIndex: 0,
    explanation: 'The loop executes with i = 0 (count += 0 -> 0), then i = 2 (count += 2 -> 2), then i = 4 (count += 4 -> 6). When i becomes 6, 6 < 5 is false, loop terminates.',
    hint: 'Trace the values of i: 0, 2, 4. What is 0 + 2 + 4?'
  },
  {
    title: 'Integer Division & Float Casting',
    codeSnippet: `#include <stdio.h>
int main() {
    int a = 7, b = 2;
    float result = a / b + (float)a / b;
    printf("%.1f\\n", result);
    return 0;
}`,
    options: ['7.0', '6.5', '6.0', '7.5'],
    correctIndex: 1,
    explanation: 'Integer division a / b yields truncated 3 (not 3.5). The second term (float)a / b promotes to float division, yielding 3.5. Total: 3 + 3.5 = 6.5.',
    hint: 'Remember integer division drops decimal fractions before addition!'
  },
  {
    title: 'Array Indexing & Pointer Arithmetic',
    codeSnippet: `#include <stdio.h>
int main() {
    int arr[4] = {10, 20, 30, 40};
    int *p = arr + 1;
    printf("%d, %d\\n", *p, *(p + 2));
    return 0;
}`,
    options: ['20, 40', '10, 30', '20, 30', '10, 40'],
    correctIndex: 0,
    explanation: 'p points to arr[1] (20). Therefore *p is 20. Then p + 2 points to index 1 + 2 = 3, which is arr[3] (40).',
    hint: 'arr is base address arr[0]. What element does arr + 1 point to?'
  }
];

interface OutputPredictorGameProps {
  conceptTitle?: string;
  initialCodeSnippet?: string;
  expectedOutput?: string;
  onGameCompleted?: (score: number) => void;
}

export const OutputPredictorGame: React.FC<OutputPredictorGameProps> = ({
  conceptTitle = 'Output Prediction Challenge',
  initialCodeSnippet,
  expectedOutput,
  onGameCompleted
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const challenge = PREDICTOR_CHALLENGES[currentIndex % PREDICTOR_CHALLENGES.length];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === challenge.correctIndex;
    if (isCorrect) {
      const earned = 30 + streak * 10;
      setScore(prev => prev + earned);
      setStreak(prev => prev + 1);
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
      if (onGameCompleted) onGameCompleted(earned);
    } else {
      setStreak(0);
    }
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setCurrentIndex(prev => prev + 1);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setScore(0);
    setStreak(0);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-7 text-white space-y-6 shadow-soft-lg">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
                Mental Compiler Mode
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300">
                Level {currentIndex + 1} of {PREDICTOR_CHALLENGES.length}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              {challenge.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>{streak}x Streak</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{score} XP</span>
          </div>
        </div>
      </div>

      {/* Code Screen */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Examine the C/C++ source code:</span>
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1 text-[11px] text-teal-400 hover:text-teal-300 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
          </button>
        </div>

        <div className="relative rounded-2xl bg-[#080E1A] border border-slate-800/80 p-4 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto shadow-inner leading-relaxed">
          <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-60">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <pre>{challenge.codeSnippet}</pre>
        </div>

        {showHint && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 animate-in fade-in">
            💡 <strong>Hint:</strong> {challenge.hint}
          </div>
        )}
      </div>

      {/* Question Prompt */}
      <div>
        <p className="text-xs sm:text-sm font-semibold text-slate-300 mb-3">
          What will this program print to the terminal console?
        </p>

        {/* 4 Prediction Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {challenge.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === challenge.correctIndex;

            let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700';

            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold shadow-sm';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300 line-through';
              } else {
                btnStyle = 'bg-slate-900/50 border-slate-850 text-slate-500 opacity-60';
              }
            } else if (isSelected) {
              btnStyle = 'bg-teal-950/60 border-teal-500 text-teal-200 font-bold';
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-mono text-left flex items-center justify-between transition-all ${btnStyle}`}
              >
                <span>{opt}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation Banner when answered */}
      {isAnswered && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            {selectedOption === challenge.correctIndex ? (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Correct! Exact Output Predicted!
              </span>
            ) : (
              <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <XCircle className="w-4 h-4" />
                Incorrect Output
              </span>
            )}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {challenge.explanation}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <button
              onClick={handleRestart}
              className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Game</span>
            </button>

            <button
              onClick={handleNextChallenge}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center gap-1.5 transition-all shadow-sm font-sans"
            >
              <span>Next Prediction Level</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
