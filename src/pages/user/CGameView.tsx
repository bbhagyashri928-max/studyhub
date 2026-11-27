import React, { useState, useEffect } from 'react';
import { C_GAME_STEPS, C_GAME_WORLDS, GameStep } from '@/courses/c/gameData';
import confetti from 'canvas-confetti';
import { 
  Gamepad2, Trophy, Flame, Heart, Star, Sparkles, CheckCircle2, 
  XCircle, ChevronRight, ChevronLeft, ArrowRight, Lightbulb, 
  Lock, RotateCcw, Award, Play, BookOpen, Layers
} from 'lucide-react';

interface CGameViewProps {
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

const STORAGE_KEY = 'codeverse_c_game_state_v1';

export const CGameView: React.FC<CGameViewProps> = ({ onNavigateToCourse, onNavigateToUnit }) => {
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
  const activeStep = C_GAME_STEPS.find(s => s.id === activeStepId);

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
        // Initial empty selection order for sorting
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
      // Confetti celebration!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Update player progress
      setGameState(prev => {
        const isNewCompletion = !prev.completedStepIds.includes(activeStep.id);
        const nextStepId = Math.min(25, activeStep.id + 1);
        return {
          ...prev,
          completedStepIds: isNewCompletion ? [...prev.completedStepIds, activeStep.id] : prev.completedStepIds,
          currentStepId: Math.max(prev.currentStepId, nextStepId),
          totalXp: isNewCompletion ? prev.totalXp + activeStep.xp : prev.totalXp,
          coins: isNewCompletion ? prev.coins + activeStep.coins : prev.coins,
          hearts: 3 // replenish hearts on success
        };
      });
    } else {
      // Deduct heart
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
      const nextStep = C_GAME_STEPS.find(s => s.id === nextId);
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
  const visibleSteps = C_GAME_STEPS.filter(s => selectedWorld === 0 || s.world === selectedWorld);
  const totalCompleted = gameState.completedStepIds.length;
  const progressPercent = Math.round((totalCompleted / 25) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Game Hero & Stats HUD */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-950 rounded-3xl p-6 sm:p-8 text-white border border-teal-800/40 shadow-soft-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <Gamepad2 className="w-3.5 h-3.5" />
                Interactive Game Quest
              </span>
              <span className="text-xs text-slate-400 font-semibold">25 Mastery Steps</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              C Mastery <span className="text-teal-400">Chronicles</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Play through all 25 bite-sized interactive game levels covering every point of the C syllabus. Solve code puzzles, spot bugs, trace state, and become a systems programming master!
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-navy-950/70 p-4 rounded-2xl border border-navy-700/60">
            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1 text-xs text-slate-400 uppercase font-bold">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Level</span>
              </div>
              <p className="text-xl font-black text-white mt-0.5">
                {Math.floor(gameState.totalXp / 500) + 1}
              </p>
            </div>

            <div className="text-center px-2 border-l border-navy-800">
              <div className="flex items-center justify-center gap-1 text-xs text-slate-400 uppercase font-bold">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>XP</span>
              </div>
              <p className="text-xl font-black text-teal-400 mt-0.5">{gameState.totalXp}</p>
            </div>

            <div className="text-center px-2 border-l border-navy-800">
              <div className="flex items-center justify-center gap-1 text-xs text-slate-400 uppercase font-bold">
                <Heart className="w-3.5 h-3.5 text-coral-400 fill-coral-400" />
                <span>Lives</span>
              </div>
              <p className="text-xl font-black text-coral-400 mt-0.5">
                {'❤️'.repeat(gameState.hearts)}
              </p>
            </div>

            <div className="text-center px-2 border-l border-navy-800">
              <div className="flex items-center justify-center gap-1 text-xs text-slate-400 uppercase font-bold">
                <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>Stars</span>
              </div>
              <p className="text-xl font-black text-amber-300 mt-0.5">
                {totalCompleted * 3} <span className="text-xs text-slate-500 font-normal">/ 75</span>
              </p>
            </div>
          </div>

        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-5 border-t border-navy-700/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300 w-full sm:w-auto">
            <span className="font-bold text-white">{totalCompleted} of 25 Steps Mastered</span>
            <span className="text-teal-400 font-extrabold">({progressPercent}%)</span>
          </div>
          <div className="w-full sm:w-72 bg-navy-950 h-2.5 rounded-full overflow-hidden border border-navy-700/50">
            <div 
              className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* World Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedWorld(0)}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedWorld === 0
              ? 'bg-teal-500 text-navy-950 shadow-soft'
              : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-800 hover:border-teal-400'
          }`}
        >
          All 25 Steps
        </button>

        {C_GAME_WORLDS.map(w => {
          const isCurrent = selectedWorld === w.world;
          const worldSteps = C_GAME_STEPS.filter(s => s.world === w.world);
          const worldDone = worldSteps.filter(s => gameState.completedStepIds.includes(s.id)).length;
          return (
            <button
              key={w.world}
              onClick={() => setSelectedWorld(w.world)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                isCurrent
                  ? 'bg-navy-900 text-white dark:bg-teal-500 dark:text-navy-950 shadow-soft'
                  : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-800 hover:border-teal-400'
              }`}
            >
              <span>{w.title.split(':')[0]}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                worldDone === 5 ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold' : 'bg-slate-100 dark:bg-navy-800 text-slate-400'
              }`}>
                {worldDone}/5
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Game Interface: Challenge Arena OR World Level Map */}
      {activeStep ? (
        /* ================= ACTIVE CHALLENGE ARENA ================= */
        <div className="bg-white dark:bg-navy-900 rounded-3xl border border-navy-100 dark:border-navy-800 p-6 sm:p-10 shadow-soft space-y-6">
          
          {/* Header Controls */}
          <div className="flex items-center justify-between pb-4 border-b border-navy-100 dark:border-navy-800">
            <button
              onClick={() => setActiveStepId(null)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-teal-600 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Level Map</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60">
                {activeStep.worldTitle}
              </span>
              <span className="text-xs font-black text-amber-500 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> +{activeStep.xp} XP
              </span>
            </div>
          </div>

          {/* Step Mission Card */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Level {activeStep.id} of 25
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {activeStep.subtitle}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
              {activeStep.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-navy-950 p-4 rounded-2xl border border-slate-200 dark:border-navy-800">
              💡 <span className="font-bold text-navy-900 dark:text-white">Core Insight: </span> 
              {activeStep.conceptSummary}
            </p>
          </div>

          {/* Rule Cheat Pill */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-300">
            <Award className="w-4 h-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
            <span><strong className="font-bold">Golden Rule: </strong>{activeStep.ruleTip}</span>
          </div>

          {/* Interactive Challenge Component */}
          <div className="bg-ivory-50 dark:bg-navy-950/80 rounded-2xl p-6 border border-slate-200 dark:border-navy-800 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-navy-900 dark:text-white flex items-center gap-2">
                <Play className="w-4 h-4 text-teal-500 fill-teal-500" />
                <span>Mission Challenge:</span>
              </h3>
              
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showHint ? 'Hide Hint' : 'Need Hint?'}</span>
              </button>
            </div>

            <p className="text-sm font-semibold text-navy-900 dark:text-slate-200">
              {activeStep.challenge.question}
            </p>

            {/* Optional Hint Box */}
            {showHint && (
              <div className="p-3 bg-amber-100/60 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700/60 rounded-xl text-xs text-amber-900 dark:text-amber-200 animate-in fade-in">
                💡 <strong>Hint:</strong> {activeStep.challenge.hint}
              </div>
            )}

            {/* Optional Code Snippet */}
            {activeStep.challenge.codeSnippet && (
              <pre className="font-mono text-xs p-4 rounded-xl bg-navy-950 text-emerald-300 border border-navy-800 overflow-x-auto leading-relaxed shadow-inner">
                {activeStep.challenge.codeSnippet}
              </pre>
            )}

            {/* CHALLENGE TYPE: Flow Order / Algorithm Sorting */}
            {activeStep.gameType === 'flow-order' && activeStep.challenge.itemsToOrder && (
              <div className="space-y-4">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  Click the items below in the exact chronological execution order (1st to last):
                </div>

                <div className="space-y-2">
                  {activeStep.challenge.itemsToOrder.map((item, idx) => {
                    const orderPosition = userOrder.indexOf(idx);
                    const isSelected = orderPosition !== -1;
                    return (
                      <button
                        key={idx}
                        disabled={isAnswerChecked}
                        onClick={() => handleSelectItemToOrder(idx)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-center justify-between ${
                          isSelected
                            ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 text-teal-950 dark:text-teal-200 font-bold shadow-sm'
                            : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300 hover:border-teal-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                            isSelected
                              ? 'bg-teal-500 text-navy-950'
                              : 'bg-slate-100 dark:bg-navy-800 text-slate-400'
                          }`}>
                            {isSelected ? orderPosition + 1 : idx + 1}
                          </span>
                          <span>{item}</span>
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400">
                            Step #{orderPosition + 1}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {userOrder.length > 0 && !isAnswerChecked && (
                  <button
                    onClick={() => setUserOrder([])}
                    className="text-xs text-slate-400 hover:text-slate-600 underline"
                  >
                    Reset selection order
                  </button>
                )}
              </div>
            )}

            {/* CHALLENGE TYPE: Multiple Choice / Predict Output / Spot Bug */}
            {activeStep.challenge.options && (
              <div className="grid grid-cols-1 gap-2.5">
                {activeStep.challenge.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === activeStep.challenge.correctIndex;
                  
                  let optionClass = 'bg-white dark:bg-navy-900 border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300 hover:border-teal-400';
                  
                  if (isSelected) {
                    optionClass = 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 text-teal-950 dark:text-teal-200 font-bold ring-2 ring-teal-500/30';
                  }

                  if (isAnswerChecked) {
                    if (isCorrect) {
                      optionClass = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optionClass = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-200 line-through';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerChecked}
                      onClick={() => setSelectedOption(idx)}
                      className={`text-left p-3.5 rounded-xl border text-xs flex items-center justify-between transition-all ${optionClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-md text-[10px] font-black bg-slate-100 dark:bg-navy-800 text-slate-500 flex items-center justify-center flex-shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isAnswerChecked && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 ml-2" />
                      )}
                      {isAnswerChecked && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Answer Feedback Alert */}
            {isAnswerChecked && (
              <div className={`p-4 rounded-xl border text-xs animate-in zoom-in-95 space-y-1.5 ${
                isAnswerCorrect 
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200' 
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200'
              }`}>
                <div className="flex items-center gap-2 font-black text-sm">
                  {isAnswerCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span>MISSION SUCCESS! +{activeStep.xp} XP</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-500" />
                      <span>NOT QUITE! (-1 Life ❤️)</span>
                    </>
                  )}
                </div>
                <p className="leading-relaxed">
                  {activeStep.challenge.explanation}
                </p>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-3">
              <button
                onClick={handleResetChallenge}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-navy-900 dark:hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              {!isAnswerChecked ? (
                <button
                  disabled={
                    activeStep.gameType === 'flow-order'
                      ? userOrder.length === 0
                      : selectedOption === null
                  }
                  onClick={handleCheckAnswer}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none text-navy-950 shadow-soft transition-all"
                >
                  Verify Answer 🚀
                </button>
              ) : isAnswerCorrect ? (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-soft transition-all flex items-center gap-1.5"
                >
                  <span>{activeStep.id < 25 ? 'Next Mission' : 'Quest Complete!'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleResetChallenge}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-coral-500 hover:bg-coral-600 text-white shadow-soft transition-all flex items-center gap-1.5"
                >
                  <span>Try Again</span>
                </button>
              )}
            </div>

          </div>

        </div>
      ) : (
        /* ================= LEVEL MAP / 25 STEPS ROADMAP ================= */
        <div className="space-y-6">
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-navy-900 dark:text-white">
                Syllabus Roadmaps & Missions
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Select any unlocked step to start the interactive challenge
              </p>
            </div>

            {onNavigateToCourse && (
              <button
                onClick={onNavigateToCourse}
                className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1"
              >
                <span>Full Textbook View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 25 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleSteps.map((step) => {
              const isCompleted = gameState.completedStepIds.includes(step.id);
              const isUnlocked = step.id <= gameState.currentStepId;
              const isCurrent = step.id === gameState.currentStepId && !isCompleted;

              return (
                <div
                  key={step.id}
                  onClick={() => isUnlocked && handleStartStep(step.id)}
                  className={`group relative p-5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                    isUnlocked
                      ? 'cursor-pointer bg-white dark:bg-navy-900 hover:shadow-soft-lg hover:-translate-y-0.5 border-navy-100 dark:border-navy-800'
                      : 'opacity-50 bg-slate-50 dark:bg-navy-950/50 border-slate-200 dark:border-navy-900 cursor-not-allowed'
                  } ${isCurrent ? 'ring-2 ring-teal-500 border-teal-500' : ''}`}
                >
                  <div className="space-y-2.5">
                    {/* Top Step Pill & Status */}
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        isCompleted
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                          : isCurrent
                          ? 'bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 animate-pulse'
                          : 'bg-slate-100 dark:bg-navy-800 text-slate-500'
                      }`}>
                        Level {step.id}
                      </span>

                      <div className="flex items-center gap-1">
                        {isCompleted ? (
                          <div className="flex items-center text-amber-400">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                          </div>
                        ) : isUnlocked ? (
                          <span className="text-[10px] font-bold text-teal-500 flex items-center gap-1">
                            <Play className="w-3 h-3 fill-teal-500" /> Ready
                          </span>
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {step.subtitle}
                      </span>
                      <h3 className="font-extrabold text-sm sm:text-base text-navy-900 dark:text-white leading-snug mt-0.5 group-hover:text-teal-600 transition-colors">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {step.conceptSummary}
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-navy-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">
                      +{step.xp} XP
                    </span>

                    {isUnlocked ? (
                      <span className="font-bold text-teal-600 dark:text-teal-400 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        <span>{isCompleted ? 'Replay' : 'Play Level'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="text-slate-400">Complete prior levels to unlock</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
