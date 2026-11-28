import React, { useState, useEffect } from 'react';
import { CPP_GAME_STEPS, CPP_GAME_WORLDS, CppGameStep } from '@/courses/cpp/gameData';
import confetti from 'canvas-confetti';
import { 
  Gamepad2, Trophy, Flame, Heart, Star, Sparkles, CheckCircle2, 
  XCircle, ChevronRight, ChevronLeft, ArrowRight, Lightbulb, 
  Lock, RotateCcw, Award, Play, BookOpen, Layers, Shield, GitFork, Cpu
} from 'lucide-react';

interface CppGameViewProps {
  onNavigateToCourse?: () => void;
  onNavigateToUnit?: (unitId: string) => void;
}

interface PlayerGameState {
  completedStepIds: number[];
  currentStepId: number;
  totalXp: number;
  coins: number;
  hearts: number;
  streak: number;
}

const STORAGE_KEY = 'codeviva_cpp_game_state_v1';

export const CppGameView: React.FC<CppGameViewProps> = ({ onNavigateToCourse, onNavigateToUnit }) => {
  // Load saved game progress
  const [gameState, setGameState] = useState<PlayerGameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      completedStepIds: [],
      currentStepId: 1,
      totalXp: 0,
      coins: 50,
      hearts: 3,
      streak: 5
    };
  });

  const [activeStepId, setActiveStepId] = useState<number | null>(null);
  const [selectedWorld, setSelectedWorld] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userOrder, setUserOrder] = useState<number[]>([]);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Active step object
  const activeStep = CPP_GAME_STEPS.find(s => s.id === activeStepId);

  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch {
      // ignore
    }
  }, [gameState]);

  // When step changes, reset interactive challenge state
  useEffect(() => {
    if (activeStep) {
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setIsAnswerCorrect(false);
      setShowHint(false);
      if (activeStep.gameType === 'flow-order' && activeStep.challenge.itemsToOrder) {
        setUserOrder([]);
      }
    }
  }, [activeStepId]);

  const handleStartStep = (stepId: number) => {
    setActiveStepId(stepId);
  };

  const handleSelectItemToOrder = (index: number) => {
    if (isAnswerChecked) return;
    if (userOrder.includes(index)) {
      setUserOrder(userOrder.filter(i => i !== index));
    } else {
      setUserOrder([...userOrder, index]);
    }
  };

  const handleCheckAnswer = () => {
    if (!activeStep) return;
    setIsAnswerChecked(true);

    let correct = false;
    if (activeStep.gameType === 'flow-order') {
      const targetOrder = activeStep.challenge.correctOrder || [];
      if (userOrder.length === targetOrder.length &&
          userOrder.every((val, idx) => val === targetOrder[idx])) {
        correct = true;
      }
    } else {
      if (selectedOption === activeStep.challenge.correctIndex) {
        correct = true;
      }
    }

    setIsAnswerCorrect(correct);

    if (correct) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setGameState(prev => {
        const isNewCompletion = !prev.completedStepIds.includes(activeStep.id);
        const nextStepId = Math.min(25, activeStep.id + 1);
        return {
          ...prev,
          completedStepIds: isNewCompletion ? [...prev.completedStepIds, activeStep.id] : prev.completedStepIds,
          currentStepId: Math.max(prev.currentStepId, nextStepId),
          totalXp: isNewCompletion ? prev.totalXp + activeStep.xp : prev.totalXp,
          coins: isNewCompletion ? prev.coins + activeStep.coins : prev.coins,
          hearts: 3
        };
      });
    } else {
      setGameState(prev => ({
        ...prev,
        hearts: Math.max(1, prev.hearts - 1)
      }));
    }
  };

  const handleNextStep = () => {
    if (!activeStep) return;
    if (activeStep.id < 25) {
      const nextId = activeStep.id + 1;
      setActiveStepId(nextId);
      const nextStep = CPP_GAME_STEPS.find(s => s.id === nextId);
      if (nextStep) setSelectedWorld(nextStep.world);
    } else {
      setActiveStepId(null);
    }
  };

  const handleResetChallenge = () => {
    setSelectedOption(null);
    setUserOrder([]);
    setIsAnswerChecked(false);
    setIsAnswerCorrect(false);
    setShowHint(false);
  };

  // Filter steps by world
  const visibleSteps = CPP_GAME_STEPS.filter(s => selectedWorld === 0 || s.world === selectedWorld);
  const totalCompleted = gameState.completedStepIds.length;
  const progressPercent = Math.round((totalCompleted / 25) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Game Hero & Stats HUD */}
      <div className="bg-gradient-to-r from-navy-900 via-indigo-950 to-purple-950 rounded-3xl p-6 sm:p-8 text-white border border-purple-800/40 shadow-soft-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <Gamepad2 className="w-3.5 h-3.5" />
                C++ OOP Game Quest
              </span>
              <span className="text-xs text-slate-400 font-semibold">25 Mastery Missions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              C++ Object-Oriented Citadel
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Master Classes, Constructors, Dynamic Polymorphism, Smart Pointers, and STL by playing 25 interactive engineering challenges!
            </p>
          </div>

          {/* Stats Bar (XP, Coins, Hearts, Streak) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-navy-950/60 p-3.5 rounded-2xl border border-navy-800">
            <div className="flex items-center gap-2 px-2 py-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">TOTAL XP</span>
                <span className="text-sm font-extrabold text-amber-300">{gameState.totalXp}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-2 py-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">COINS</span>
                <span className="text-sm font-extrabold text-yellow-300">{gameState.coins}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-2 py-1">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">HEARTS</span>
                <span className="text-sm font-extrabold text-rose-400">{gameState.hearts}/3</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-2 py-1">
              <Flame className="w-4 h-4 text-orange-500" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">STREAK</span>
                <span className="text-sm font-extrabold text-orange-400">{gameState.streak} Days</span>
              </div>
            </div>
          </div>

        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-5 border-t border-purple-800/30 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-purple-400" />
              <span>C++ Citadel Progress: {totalCompleted} of 25 Steps Completed</span>
            </span>
            <span className="text-purple-300 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-navy-950/80 overflow-hidden border border-purple-900/50">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-teal-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

      </div>

      {/* World Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedWorld(0)}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
            selectedWorld === 0
              ? 'bg-purple-500 text-slate-950 shadow-md font-extrabold'
              : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-800 hover:border-purple-400'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All 5 Worlds</span>
        </button>

        {CPP_GAME_WORLDS.map(w => {
          const isSelected = selectedWorld === w.world;
          return (
            <button
              key={w.world}
              onClick={() => setSelectedWorld(w.world)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
                isSelected
                  ? 'bg-purple-500 text-slate-950 shadow-md font-extrabold'
                  : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-800 hover:border-purple-400'
              }`}
            >
              <span>{w.title.split(':')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Step Grid / Level Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleSteps.map((step) => {
          const isCompleted = gameState.completedStepIds.includes(step.id);
          const isUnlocked = step.id <= gameState.currentStepId;
          const isCurrent = step.id === gameState.currentStepId;

          return (
            <div
              key={step.id}
              className={`rounded-2xl p-5 border transition-all relative overflow-hidden flex flex-col justify-between ${
                isCurrent
                  ? 'bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:bg-navy-900 border-purple-500 ring-2 ring-purple-500/20 shadow-md'
                  : isCompleted
                  ? 'bg-white dark:bg-navy-900 border-emerald-500/40'
                  : isUnlocked
                  ? 'bg-white dark:bg-navy-900 border-slate-200 dark:border-navy-800'
                  : 'bg-slate-50 dark:bg-navy-950/60 border-slate-200 dark:border-navy-800/60 opacity-60'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                    Step {step.id}
                  </span>
                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  ) : !isUnlocked ? (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                      <Lock className="w-3.5 h-3.5" />
                      Locked
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-amber-500 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      +{step.xp} XP
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-navy-900 dark:text-white leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                    {step.subtitle}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 pt-1">
                    {step.conceptSummary}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-navy-800 mt-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                  {step.gameType.replace('-', ' ')}
                </span>

                <button
                  disabled={!isUnlocked}
                  onClick={() => handleStartStep(step.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isCompleted
                      ? 'bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:bg-purple-500 hover:text-slate-950'
                      : isUnlocked
                      ? 'bg-purple-500 hover:bg-purple-400 text-slate-950 shadow-sm'
                      : 'bg-slate-200 dark:bg-navy-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isCompleted ? 'Replay' : 'Play Quest'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ACTIVE STEP MODAL CHALLENGE */}
      {activeStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-soft-lg overflow-hidden animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-navy-100 dark:border-navy-800 flex items-center justify-between bg-slate-50/50 dark:bg-navy-950/60">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                  Step {activeStep.id} of 25
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  {activeStep.worldTitle}
                </span>
              </div>

              <button
                onClick={() => setActiveStepId(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-5">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-navy-900 dark:text-white">
                  {activeStep.title}
                </h2>
                <p className="text-xs text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider">
                  {activeStep.subtitle}
                </p>
              </div>

              {/* Concept Recap Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-xs space-y-1.5">
                <div className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-purple-500" />
                  <span>Concept Rulebook</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeStep.conceptSummary}
                </p>
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-[11px] text-amber-800 dark:text-amber-300 font-medium">
                  💡 <strong>Pro-Tip:</strong> {activeStep.ruleTip}
                </div>
              </div>

              {/* CHALLENGE INTERACTION */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Gamepad2 className="w-4 h-4 text-purple-500" />
                    <span>Interactive Engineering Challenge</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                    +{activeStep.xp} XP / +{activeStep.coins} Coins
                  </span>
                </div>

                <p className="text-sm font-semibold text-navy-900 dark:text-white">
                  {activeStep.challenge.question}
                </p>

                {/* Code snippet if present */}
                {activeStep.challenge.codeSnippet && (
                  <pre className="p-4 rounded-2xl font-mono text-xs bg-navy-950 text-emerald-300 border border-navy-800 overflow-x-auto leading-relaxed">
                    {activeStep.challenge.codeSnippet}
                  </pre>
                )}

                {/* FLOW-ORDER GAME TYPE */}
                {activeStep.gameType === 'flow-order' && activeStep.challenge.itemsToOrder && (
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-xs font-semibold text-slate-400">
                        Selected Sequence ({userOrder.length}/{activeStep.challenge.itemsToOrder.length}):
                      </span>
                      <div className="min-h-[100px] p-3 rounded-2xl bg-slate-950 border-2 border-dashed border-slate-800 flex flex-col gap-1.5 font-mono text-xs">
                        {userOrder.length === 0 ? (
                          <div className="text-slate-600 text-center py-4">
                            Tap the code blocks below to order them correctly
                          </div>
                        ) : (
                          userOrder.map((itemIdx, seqIdx) => (
                            <button
                              key={itemIdx}
                              disabled={isAnswerChecked}
                              onClick={() => handleSelectItemToOrder(itemIdx)}
                              className="w-full text-left p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500 text-purple-300 flex items-center justify-between transition-colors"
                            >
                              <span>{seqIdx + 1}. {activeStep.challenge.itemsToOrder![itemIdx]}</span>
                              <span className="text-[10px] text-slate-500">✕</span>
                            </button>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-xs font-semibold text-slate-400">Available Blocks:</span>
                      <div className="flex flex-wrap gap-2">
                        {activeStep.challenge.itemsToOrder.map((item, idx) => {
                          const isPicked = userOrder.includes(idx);
                          if (isPicked) return null;
                          return (
                            <button
                              key={idx}
                              disabled={isAnswerChecked}
                              onClick={() => handleSelectItemToOrder(idx)}
                              className="px-3 py-2 rounded-xl bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-xs text-slate-700 dark:text-slate-200 hover:border-purple-500 font-mono transition-all"
                            >
                              + {item}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* MULTIPLE CHOICE / SPOT BUG / PREDICT OUTPUT */}
                {activeStep.challenge.options && (
                  <div className="space-y-2">
                    {activeStep.challenge.options.map((opt, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === activeStep.challenge.correctIndex;

                      let style = 'bg-white dark:bg-navy-800 border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300';
                      if (isSelected) {
                        style = 'border-purple-500 ring-2 ring-purple-500/20 text-purple-900 dark:text-purple-200 font-bold';
                      }
                      if (isAnswerChecked) {
                        if (isCorrect) {
                          style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                        } else if (isSelected && !isCorrect) {
                          style = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200 line-through';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswerChecked}
                          onClick={() => setSelectedOption(idx)}
                          className={`w-full text-left p-3.5 rounded-2xl border text-xs transition-all flex items-center justify-between ${style}`}
                        >
                          <span>{opt}</span>
                          {isAnswerChecked && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Hint Bar */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-xs text-amber-500 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{showHint ? 'Hide Hint' : 'Need a hint?'}</span>
                  </button>

                  <button
                    onClick={handleResetChallenge}
                    className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>

                {showHint && (
                  <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-300">
                    💡 <strong>Hint:</strong> {activeStep.challenge.hint}
                  </div>
                )}

                {/* Result Feedback Banner */}
                {isAnswerChecked && (
                  <div className={`p-4 rounded-2xl border space-y-2 animate-in zoom-in-95 ${
                    isAnswerCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/60 text-emerald-900 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500/60 text-rose-900 dark:text-rose-200'
                  }`}>
                    <div className="flex items-center justify-between font-bold text-sm">
                      <span className="flex items-center gap-2">
                        {isAnswerCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-rose-500" />}
                        <span>{isAnswerCorrect ? 'Mission Accomplished! (+XP Awarded)' : 'Incorrect Solution! Try reviewing the rules.'}</span>
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed opacity-90">
                      {activeStep.challenge.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between bg-slate-50/50 dark:bg-navy-950/60">
              <button
                onClick={() => setActiveStepId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-200 dark:hover:bg-navy-800 transition-colors"
              >
                Close Quest
              </button>

              {!isAnswerChecked ? (
                <button
                  disabled={activeStep.gameType === 'flow-order' ? userOrder.length < (activeStep.challenge.itemsToOrder?.length || 0) : selectedOption === null}
                  onClick={handleCheckAnswer}
                  className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-purple-500 hover:bg-purple-400 disabled:opacity-40 text-slate-950 flex items-center gap-2 transition-all shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Verify Answer</span>
                </button>
              ) : (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-2 transition-all shadow-md"
                >
                  <span>{activeStep.id < 25 ? 'Next Step →' : 'Complete Citadel 🎉'}</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
