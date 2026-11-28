import React, { useState } from 'react';
import { Tag, CheckCircle2, XCircle, RotateCcw, Sparkles, Flame, Trophy, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

type TokenType = 'keyword' | 'identifier' | 'constant' | 'operator';

interface TokenItem {
  token: string;
  type: TokenType;
  explanation: string;
}

const TOKENS_POOL: TokenItem[] = [
  { token: 'while', type: 'keyword', explanation: "'while' is a reserved C/C++ iteration keyword." },
  { token: 'studentCount', type: 'identifier', explanation: "'studentCount' is a user-defined variable identifier." },
  { token: '3.14159', type: 'constant', explanation: "'3.14159' is a floating-point numeric constant literal." },
  { token: '++', type: 'operator', explanation: "'++' is the unary increment operator." },
  { token: 'sizeof', type: 'keyword', explanation: "'sizeof' is a built-in compile-time operator keyword." },
  { token: 'totalScore', type: 'identifier', explanation: "'totalScore' is a camelCase variable identifier." },
  { token: '"CodeViva"', type: 'constant', explanation: 'String literal enclosed in double quotes.' },
  { token: '&&', type: 'operator', explanation: "'&&' is the logical AND boolean operator." },
  { token: 'return', type: 'keyword', explanation: "'return' is a jump statement reserved keyword." },
  { token: 'calculateArea', type: 'identifier', explanation: "'calculateArea' is a user-defined function identifier." },
  { token: "'Z'", type: 'constant', explanation: "'Z' is a single-character character constant literal." },
  { token: '!=', type: 'operator', explanation: "'!=' is a relational comparison operator." },
];

interface TokenClassifierGameProps {
  onGameCompleted?: (score: number) => void;
}

export const TokenClassifierGame: React.FC<TokenClassifierGameProps> = ({ onGameCompleted }) => {
  const [tokens, setTokens] = useState<TokenItem[]>(TOKENS_POOL);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentToken = tokens[currentIndex];

  const handleClassify = (chosenType: TokenType) => {
    if (!currentToken || isGameOver) return;

    const isCorrect = chosenType === currentToken.type;
    if (isCorrect) {
      const earned = 25 + streak * 5;
      setScore(prev => prev + earned);
      setStreak(prev => prev + 1);
      setFeedback({
        isCorrect: true,
        message: `✓ Correct! ${currentToken.explanation}`
      });
      if (onGameCompleted) onGameCompleted(earned);
    } else {
      setStreak(0);
      setFeedback({
        isCorrect: false,
        message: `✗ Incorrect! "${currentToken.token}" is a ${currentToken.type.toUpperCase()}. ${currentToken.explanation}`
      });
    }

    if (currentIndex + 1 >= tokens.length) {
      setIsGameOver(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } else {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setFeedback(null);
      }, 900);
    }
  };

  const handleRestart = () => {
    setTokens([...TOKENS_POOL].sort(() => 0.5 - Math.random()));
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setFeedback(null);
    setIsGameOver(false);
  };

  const categories: { type: TokenType; label: string; icon: string; color: string }[] = [
    { type: 'keyword', label: '1. Keyword', icon: '🔑', color: 'border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300' },
    { type: 'identifier', label: '2. Identifier', icon: '🏷️', color: 'border-teal-500/40 bg-teal-500/10 hover:bg-teal-500/20 text-teal-300' },
    { type: 'constant', label: '3. Literal / Constant', icon: '💎', color: 'border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300' },
    { type: 'operator', label: '4. Operator', icon: '⚙️', color: 'border-rose-500/40 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300' },
  ];

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-7 text-white space-y-6 shadow-soft-lg">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
              Token Sorter Challenge
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              C/C++ Lexical Token Speed Classifier
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

      {!isGameOver ? (
        <>
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Token {currentIndex + 1} of {tokens.length}</span>
            <span>{Math.round(((currentIndex) / tokens.length) * 100)}% Completed</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / tokens.length) * 100}%` }}
            />
          </div>

          {/* Active Token Display Card */}
          <div className="py-8 px-4 rounded-3xl bg-gradient-to-b from-[#0F1B2E] to-[#0A1322] border border-indigo-500/30 text-center space-y-2 shadow-inner">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Classify this C/C++ token:
            </span>
            <div className="text-3xl sm:text-4xl font-mono font-black text-cyan-300 tracking-wider">
              {currentToken?.token}
            </div>
          </div>

          {/* Classification Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories.map(cat => (
              <button
                key={cat.type}
                onClick={() => handleClassify(cat.type)}
                className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-150 active:scale-95 shadow-sm ${cat.color}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-xs sm:text-sm font-bold font-sans">{cat.label}</span>
                </div>
                <span className="text-xs opacity-60 font-mono">Select</span>
              </button>
            ))}
          </div>

          {/* Immediate Feedback Strip */}
          {feedback && (
            <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed animate-in fade-in ${
              feedback.isCorrect 
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' 
                : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
            }`}>
              {feedback.message}
            </div>
          )}
        </>
      ) : (
        /* Game Over Trophy Screen */
        <div className="py-8 px-4 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4 animate-in zoom-in-95">
          <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 mx-auto flex items-center justify-center text-2xl">
            🏆
          </div>
          <div>
            <h4 className="text-xl font-extrabold text-white">Token Mastery Completed!</h4>
            <p className="text-xs text-slate-400 mt-1">
              You classified all {tokens.length} C/C++ lexical tokens with a total score of <span className="text-amber-400 font-bold">{score} XP</span>!
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2 transition-all shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>
        </div>
      )}

    </div>
  );
};
