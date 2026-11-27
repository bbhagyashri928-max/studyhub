import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Bug, Sparkles, Terminal, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BugHunterGameProps {
  conceptTitle?: string;
  onGameCompleted?: (score: number) => void;
}

interface BugChallenge {
  title: string;
  codeLines: string[];
  buggyLineIndex: number;
  bugDescription: string;
  compilerError: string;
  fixOptions: string[];
  correctFixIndex: number;
  explanation: string;
}

const SAMPLE_BUG_CHALLENGES: BugChallenge[] = [
  {
    title: 'Missing Semicolon & Statement Terminator',
    codeLines: [
      '#include <stdio.h>',
      'int main() {',
      '    int score = 95',
      '    printf("Student Score: %d\\n", score);',
      '    return 0;',
      '}'
    ],
    buggyLineIndex: 2, // line 3 (index 2)
    bugDescription: 'Missing statement terminator at end of variable declaration.',
    compilerError: "error: expected ';' before 'printf'",
    fixOptions: [
      'int score = 95;',
      'int score == 95;',
      'score: 95;',
      'var score = 95;'
    ],
    correctFixIndex: 0,
    explanation: 'In C and C++, every statement declaration MUST terminate with a semicolon (;). Without it, the compiler treats the next statement as part of the previous one!'
  },
  {
    title: 'Assignment vs Equality Operator Trap',
    codeLines: [
      '#include <stdio.h>',
      'int main() {',
      '    int age = 16;',
      '    if (age = 18) {',
      '        printf("Adult Access Granted\\n");',
      '    }',
      '    return 0;',
      '}'
    ],
    buggyLineIndex: 3,
    bugDescription: 'Assignment operator (=) used inside conditional instead of equality operator (==).',
    compilerError: 'warning: suggest parentheses around assignment used as truth value [-Wparentheses]',
    fixOptions: [
      'if (age == 18) {',
      'if (age === 18) {',
      'if (age .eq. 18) {',
      'if (age != 18) {'
    ],
    correctFixIndex: 0,
    explanation: 'A single equals sign (=) assigns the value 18 to age. Since 18 is non-zero (true), the if-condition always executes! In C/C++, use double equals (==) to test equality.'
  },
  {
    title: 'Format Specifier Mismatch',
    codeLines: [
      '#include <stdio.h>',
      'int main() {',
      '    float temperature = 98.6;',
      '    printf("Body Temp: %d\\n", temperature);',
      '    return 0;',
      '}'
    ],
    buggyLineIndex: 3,
    bugDescription: 'Format specifier %d (integer) used for float variable.',
    compilerError: "warning: format '%d' expects argument of type 'int', but argument 2 has type 'double'",
    fixOptions: [
      'printf("Body Temp: %.1f\\n", temperature);',
      'printf("Body Temp: %s\\n", temperature);',
      'printf("Body Temp: %c\\n", temperature);',
      'printf("Body Temp: %ld\\n", temperature);'
    ],
    correctFixIndex: 0,
    explanation: 'Format specifiers must match data types: %d for int, %f for float, %lf for double, %c for char, %s for strings.'
  },
  {
    title: 'Pointer Address & Dereferencing Glitch',
    codeLines: [
      '#include <stdio.h>',
      'int main() {',
      '    int value = 42;',
      '    int *ptr = value;',
      '    printf("Val: %d\\n", *ptr);',
      '    return 0;',
      '}'
    ],
    buggyLineIndex: 3,
    bugDescription: 'Assigning an integer value directly to a pointer variable instead of its memory address (&value).',
    compilerError: "error: initialization of 'int *' from 'int' makes pointer from integer without a cast",
    fixOptions: [
      'int *ptr = &value;',
      'int *ptr = *value;',
      'int ptr = &value;',
      'int &ptr = value;'
    ],
    correctFixIndex: 0,
    explanation: 'A pointer stores the memory address of a variable. Use the address-of operator (&value) to assign it to a pointer!'
  }
];

export const BugHunterGame: React.FC<BugHunterGameProps> = ({
  conceptTitle,
  onGameCompleted,
}) => {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [selectedFix, setSelectedFix] = useState<number | null>(null);
  const [isBugSpotted, setIsBugSpotted] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [score, setScore] = useState(0);

  const currentChallenge = SAMPLE_BUG_CHALLENGES[challengeIndex % SAMPLE_BUG_CHALLENGES.length];

  const handleLineClick = (idx: number) => {
    if (isBugSpotted) return;
    setSelectedLine(idx);
    if (idx === currentChallenge.buggyLineIndex) {
      setIsBugSpotted(true);
    }
  };

  const handleFixSubmit = () => {
    if (selectedFix === null) return;
    if (selectedFix === currentChallenge.correctFixIndex) {
      setIsFixed(true);
      setScore(prev => prev + 100);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
      if (onGameCompleted) {
        onGameCompleted(100);
      }
    }
  };

  const handleNextChallenge = () => {
    setChallengeIndex(prev => prev + 1);
    setSelectedLine(null);
    setSelectedFix(null);
    setIsBugSpotted(false);
    setIsFixed(false);
  };

  const handleReset = () => {
    setSelectedLine(null);
    setSelectedFix(null);
    setIsBugSpotted(false);
    setIsFixed(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 space-y-5 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
            <Bug className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white">Bug Hunter & Code Doctor</h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300">
                Level {challengeIndex + 1}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Locate the syntax or logic bug in the code, inspect the compiler error, and apply the patch.
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

      {/* Target Mission Title */}
      <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
        <span className="font-semibold text-rose-400">Mission: {currentChallenge.title}</span>
        <span className="text-slate-400 font-mono">Bounty: +100 XP</span>
      </div>

      {/* Code Editor View with Interactive Clickable Lines */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="text-teal-400 font-semibold">
            {!isBugSpotted ? '👉 Step 1: Click the line containing the bug:' : '✓ Bug Identified! Step 2: Pick the correct fix below:'}
          </span>
          <span className="text-[11px] text-slate-500">
            {isBugSpotted ? 'Line ' + (currentChallenge.buggyLineIndex + 1) + ' flagged' : 'Click line to scan'}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
          {currentChallenge.codeLines.map((line, idx) => {
            const isTargetBugLine = idx === currentChallenge.buggyLineIndex;
            const isUserSelected = selectedLine === idx;

            let lineStyle = 'hover:bg-slate-800/80 text-slate-300 border-transparent';
            if (isUserSelected && !isBugSpotted) {
              lineStyle = 'bg-rose-950/40 border-rose-500/50 text-rose-300';
            }
            if (isBugSpotted && isTargetBugLine) {
              lineStyle = isFixed
                ? 'bg-emerald-950/50 border-emerald-500/70 text-emerald-300 line-through'
                : 'bg-rose-950/60 border-rose-500 text-rose-200 animate-pulse';
            }

            return (
              <button
                key={idx}
                disabled={isBugSpotted}
                onClick={() => handleLineClick(idx)}
                className={`w-full text-left px-3 py-1.5 rounded-lg border flex items-center gap-3 transition-colors ${lineStyle}`}
              >
                <span className="text-slate-600 select-none w-4 text-right text-[11px]">{idx + 1}</span>
                <span className="flex-1 overflow-x-auto">{line}</span>
                {isBugSpotted && isTargetBugLine && (
                  <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                    Bug Found ⚠️
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Compiler Diagnostic Output */}
      {selectedLine !== null && (
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 uppercase font-mono">
            <Terminal className="w-3.5 h-3.5 text-teal-400" />
            <span>Compiler Diagnostic Terminal</span>
          </div>
          {isBugSpotted ? (
            <div className="font-mono text-xs text-rose-400 bg-rose-950/30 p-2.5 rounded-lg border border-rose-900/50">
              {currentChallenge.compilerError}
            </div>
          ) : (
            <div className="font-mono text-xs text-amber-400 bg-amber-950/20 p-2 rounded-lg">
              ℹ️ Line {selectedLine + 1} appears clean. Try scanning lines around variable assignments or statements!
            </div>
          )}
        </div>
      )}

      {/* Fix Options (Unlocked once bug line is clicked) */}
      {isBugSpotted && !isFixed && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 animate-in fade-in">
          <div className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Select the correct code patch for Line {currentChallenge.buggyLineIndex + 1}:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentChallenge.fixOptions.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedFix(idx)}
                className={`p-3 rounded-xl border text-left font-mono text-xs transition-all ${
                  selectedFix === idx
                    ? 'bg-teal-950/60 border-teal-500 text-teal-200 ring-2 ring-teal-500/20 font-bold'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <code>{opt}</code>
              </button>
            ))}
          </div>

          <button
            disabled={selectedFix === null}
            onClick={handleFixSubmit}
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Apply Patch & Recompile</span>
          </button>
        </div>
      )}

      {/* Victory / Explanation Modal Banner */}
      {isFixed && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-700/60 text-emerald-200 space-y-2 animate-in zoom-in-95">
          <div className="flex items-center justify-between">
            <div className="font-bold text-sm text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Compilation Succeeded! Bug Eradicated (+100 XP)</span>
            </div>
            <button
              onClick={handleNextChallenge}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
            >
              Next Bug Hunt →
            </button>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {currentChallenge.explanation}
          </p>
        </div>
      )}
    </div>
  );
};
