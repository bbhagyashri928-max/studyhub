import React, { useState } from 'react';
import { GitBranch, Play, SkipForward, RotateCcw, CheckCircle2, Terminal, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FlowchartRunnerGameProps {
  onGameCompleted?: (score: number) => void;
}

export const FlowchartRunnerGame: React.FC<FlowchartRunnerGameProps> = ({ onGameCompleted }) => {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [variables, setVariables] = useState<{ i: number; sum: number }>({ i: 1, sum: 0 });
  const [consoleLogs, setConsoleLogs] = useState<string[]>(['[System] Flowchart Simulator initialized.']);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // 1: Start -> 2: Init -> 3: Cond -> 4: Body -> 5: Loop back or End
  const stepsTimeline = [
    {
      id: 0,
      node: 'start',
      label: 'Start Program',
      shape: 'oval',
      action: () => {
        setVariables({ i: 1, sum: 0 });
        setConsoleLogs(['[System] Execution started.']);
      },
      explanation: 'Execution enters the entry point.',
    },
    {
      id: 1,
      node: 'init',
      label: 'Initialize: i = 1, sum = 0',
      shape: 'rect',
      action: () => {
        setVariables({ i: 1, sum: 0 });
        setConsoleLogs(prev => [...prev, 'Allocated: i = 1, sum = 0']);
      },
      explanation: 'Loop counter i starts at 1, accumulator sum starts at 0.',
    },
    {
      id: 2,
      node: 'cond_1',
      label: 'Condition Check: Is i <= 3? (1 <= 3 -> TRUE)',
      shape: 'diamond',
      action: () => {
        setConsoleLogs(prev => [...prev, 'Condition check: (1 <= 3) is TRUE -> Branching to Body']);
      },
      explanation: 'Evaluating condition: 1 is less than or equal to 3, so condition is TRUE.',
    },
    {
      id: 3,
      node: 'body_1',
      label: 'Body: sum = sum + 1 (1), i = i + 1 (2)',
      shape: 'rect',
      action: () => {
        setVariables({ i: 2, sum: 1 });
        setConsoleLogs(prev => [...prev, 'Output: Step 1 -> sum: 1, i becomes 2']);
      },
      explanation: 'Accumulate sum (0 + 1 = 1) and increment loop counter i to 2.',
    },
    {
      id: 4,
      node: 'cond_2',
      label: 'Condition Check: Is i <= 3? (2 <= 3 -> TRUE)',
      shape: 'diamond',
      action: () => {
        setConsoleLogs(prev => [...prev, 'Condition check: (2 <= 3) is TRUE -> Branching to Body']);
      },
      explanation: 'Evaluating condition: 2 <= 3 is TRUE.',
    },
    {
      id: 5,
      node: 'body_2',
      label: 'Body: sum = sum + 2 (3), i = i + 1 (3)',
      shape: 'rect',
      action: () => {
        setVariables({ i: 3, sum: 3 });
        setConsoleLogs(prev => [...prev, 'Output: Step 2 -> sum: 3, i becomes 3']);
      },
      explanation: 'Accumulate sum (1 + 2 = 3) and increment i to 3.',
    },
    {
      id: 6,
      node: 'cond_3',
      label: 'Condition Check: Is i <= 3? (3 <= 3 -> TRUE)',
      shape: 'diamond',
      action: () => {
        setConsoleLogs(prev => [...prev, 'Condition check: (3 <= 3) is TRUE -> Branching to Body']);
      },
      explanation: 'Evaluating condition: 3 <= 3 is TRUE.',
    },
    {
      id: 7,
      node: 'body_3',
      label: 'Body: sum = sum + 3 (6), i = i + 1 (4)',
      shape: 'rect',
      action: () => {
        setVariables({ i: 4, sum: 6 });
        setConsoleLogs(prev => [...prev, 'Output: Step 3 -> sum: 6, i becomes 4']);
      },
      explanation: 'Accumulate sum (3 + 3 = 6) and increment i to 4.',
    },
    {
      id: 8,
      node: 'cond_false',
      label: 'Condition Check: Is i <= 3? (4 <= 3 -> FALSE!)',
      shape: 'diamond',
      action: () => {
        setConsoleLogs(prev => [...prev, 'Condition check: (4 <= 3) is FALSE! Exiting loop.']);
      },
      explanation: 'Loop breaks because 4 is greater than 3.',
    },
    {
      id: 9,
      node: 'end',
      label: 'Stop: Print Final sum = 6',
      shape: 'oval',
      action: () => {
        setConsoleLogs(prev => [...prev, 'Program Terminated with exit code 0. Total Sum = 6.']);
      },
      explanation: 'Program finishes execution.',
    },
  ];

  const currentStep = stepsTimeline[stepIndex];

  const handleStepForward = () => {
    if (stepIndex < stepsTimeline.length - 1) {
      const nextIdx = stepIndex + 1;
      setStepIndex(nextIdx);
      stepsTimeline[nextIdx].action();
    }
  };

  const handleReset = () => {
    setStepIndex(0);
    setVariables({ i: 1, sum: 0 });
    setConsoleLogs(['[System] Simulator reset. Ready to step forward.']);
    setQuizAnswered(false);
    setSelectedAnswer(null);
  };

  const handleQuizSubmit = (idx: number) => {
    setSelectedAnswer(idx);
    setQuizAnswered(true);
    if (idx === 1) {
      // 6
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
      });
      if (onGameCompleted) onGameCompleted(75);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 space-y-5 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Flowchart & Loop Step-Simulator</h4>
            <p className="text-xs text-slate-400">
              Step through conditionals, branches, and loop iterations to see variables update live!
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

      {/* Visual Flowchart Canvas */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-teal-400">
            Interactive Flowchart (Step {stepIndex + 1} of {stepsTimeline.length}):
          </span>
          <span className="text-slate-400 font-mono">
            Active Node: <span className="text-amber-400">{currentStep.node}</span>
          </span>
        </div>

        {/* Nodes Progression Track */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 overflow-x-auto py-2">
          {[
            { id: 'start', label: 'Start (Oval)', type: 'start' },
            { id: 'init', label: 'i=1, sum=0', type: 'rect' },
            { id: 'cond', label: 'i <= 3 ?', type: 'diamond' },
            { id: 'body', label: 'sum += i, i++', type: 'rect' },
            { id: 'end', label: 'End (Oval)', type: 'end' },
          ].map(node => {
            const isActive = currentStep.node.includes(node.id);
            return (
              <div
                key={node.id}
                className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold transition-all text-center flex-1 min-w-[110px] ${
                  isActive
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/30 scale-105'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                {node.label}
              </div>
            );
          })}
        </div>

        {/* Active Step Details */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div>
            <div className="font-bold text-teal-300">{currentStep.label}</div>
            <div className="text-slate-400 text-[11px] mt-0.5">{currentStep.explanation}</div>
          </div>
          <button
            disabled={stepIndex >= stepsTimeline.length - 1}
            onClick={handleStepForward}
            className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md flex-shrink-0"
          >
            <SkipForward className="w-4 h-4" />
            <span>Step Forward</span>
          </button>
        </div>
      </div>

      {/* Live Variable Inspector & Terminal Output */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Variable Watcher */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider font-mono">
            🔍 Variable Watcher (CPU Registers)
          </span>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-mono block">Loop Counter (i)</span>
              <span className="text-xl font-bold font-mono text-amber-400">{variables.i}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-mono block">Accumulator (sum)</span>
              <span className="text-xl font-bold font-mono text-emerald-400">{variables.sum}</span>
            </div>
          </div>
        </div>

        {/* Live Terminal Console */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-teal-400 uppercase tracking-wider font-mono">
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal Output</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-emerald-300 h-20 overflow-y-auto space-y-1">
            {consoleLogs.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Predictor Challenge */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>Branch & Loop Challenge: What is the final value of sum when the loop stops?</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { label: 'sum = 3', isCorrect: false },
            { label: 'sum = 6 (1 + 2 + 3)', isCorrect: true },
            { label: 'sum = 10', isCorrect: false },
          ].map((choice, idx) => (
            <button
              key={idx}
              disabled={quizAnswered}
              onClick={() => handleQuizSubmit(idx)}
              className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                quizAnswered
                  ? choice.isCorrect
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                    : selectedAnswer === idx
                    ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                    : 'bg-slate-900 border-slate-800 text-slate-500'
                  : 'bg-slate-900 border-slate-800 hover:border-teal-500 text-slate-300'
              }`}
            >
              {choice.label}
            </button>
          ))}
        </div>

        {quizAnswered && (
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Correct!</strong> For iterations i = 1, 2, and 3, sum accumulates: 0 + 1 + 2 + 3 = 6. On i = 4, the condition (4 &lt;= 3) evaluates to false, gracefully terminating the loop!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
