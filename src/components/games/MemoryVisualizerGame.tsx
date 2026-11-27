import React, { useState } from 'react';
import { Cpu, ArrowRight, Play, RotateCcw, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MemoryCell {
  address: string;
  varName: string;
  type: string;
  value: string | number;
  isPointer?: boolean;
  pointsToAddress?: string;
}

interface MemoryVisualizerGameProps {
  onGameCompleted?: (score: number) => void;
}

export const MemoryVisualizerGame: React.FC<MemoryVisualizerGameProps> = ({ onGameCompleted }) => {
  // Preset interactive memory state
  const [cells, setCells] = useState<MemoryCell[]>([
    { address: '0x1000', varName: 'score', type: 'int', value: 42 },
    { address: '0x1004', varName: 'bonus', type: 'int', value: 10 },
    { address: '0x1008', varName: 'ptr', type: 'int *', value: '0x1000', isPointer: true, pointsToAddress: '0x1000' },
    { address: '0x100C', varName: 'arr[0]', type: 'int', value: 100 },
    { address: '0x1010', varName: 'arr[1]', type: 'int', value: 200 },
  ]);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [highlightedAddress, setHighlightedAddress] = useState<string | null>('0x1008');
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [selectedQuizChoice, setSelectedQuizChoice] = useState<number | null>(null);

  // Operations student can perform
  const handleMutateScore = () => {
    setCells(prev =>
      prev.map(c => {
        if (c.address === '0x1000') return { ...c, value: (Number(c.value) || 42) + 5 };
        return c;
      })
    );
    setHighlightedAddress('0x1000');
  };

  const handlePointerDereferenceMutate = () => {
    // *ptr = 99
    setCells(prev =>
      prev.map(c => {
        if (c.address === '0x1000') return { ...c, value: 99 };
        return c;
      })
    );
    setHighlightedAddress('0x1000');
  };

  const handlePointerIncrement = () => {
    // ptr++ => points to 0x1004
    setCells(prev =>
      prev.map(c => {
        if (c.varName === 'ptr') {
          const nextTarget = c.pointsToAddress === '0x1000' ? '0x1004' : '0x1000';
          return {
            ...c,
            value: nextTarget,
            pointsToAddress: nextTarget,
          };
        }
        return c;
      })
    );
    setHighlightedAddress('0x1008');
  };

  const handleReset = () => {
    setCells([
      { address: '0x1000', varName: 'score', type: 'int', value: 42 },
      { address: '0x1004', varName: 'bonus', type: 'int', value: 10 },
      { address: '0x1008', varName: 'ptr', type: 'int *', value: '0x1000', isPointer: true, pointsToAddress: '0x1000' },
      { address: '0x100C', varName: 'arr[0]', type: 'int', value: 100 },
      { address: '0x1010', varName: 'arr[1]', type: 'int', value: 200 },
    ]);
    setHighlightedAddress('0x1008');
    setQuizAnswered(false);
    setSelectedQuizChoice(null);
  };

  const handleQuizSubmit = (idx: number) => {
    setSelectedQuizChoice(idx);
    setQuizAnswered(true);
    if (idx === 1) {
      // 0x1000
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
      });
      if (onGameCompleted) onGameCompleted(80);
    }
  };

  const ptrCell = cells.find(c => c.varName === 'ptr');
  const pointedCell = cells.find(c => c.address === ptrCell?.pointsToAddress);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 space-y-5 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Memory & Pointer Visualizer Box</h4>
            <p className="text-xs text-slate-400">
              Watch RAM memory allocation, stack addresses, and pointer dereferencing live in action!
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset RAM</span>
        </button>
      </div>

      {/* Graphical Memory Cells Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-teal-400">RAM Stack Memory Map (4-byte alignment):</span>
          <span className="text-[11px] text-slate-500">Click a cell to inspect</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {cells.map(cell => {
            const isHighlighted = highlightedAddress === cell.address;
            const isTargetOfPointer = ptrCell?.pointsToAddress === cell.address && cell.varName !== 'ptr';

            return (
              <button
                key={cell.address}
                onClick={() => setHighlightedAddress(cell.address)}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all relative ${
                  isHighlighted
                    ? 'bg-slate-800 border-teal-400 ring-2 ring-teal-400/20'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                } ${isTargetOfPointer ? 'ring-2 ring-amber-400/50' : ''}`}
              >
                {/* Memory Address Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-500 font-bold bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                    {cell.address}
                  </span>
                  <span className="text-[10px] font-mono text-teal-400 font-semibold">{cell.type}</span>
                </div>

                {/* Variable Name */}
                <div className="font-mono font-bold text-xs text-slate-200">
                  {cell.varName}
                </div>

                {/* Box Value Display */}
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center font-mono font-bold text-sm">
                  {cell.isPointer ? (
                    <span className="text-amber-400 flex items-center justify-center gap-1">
                      <span>{cell.value}</span>
                      <ArrowRight className="w-3 h-3 text-amber-400 inline" />
                    </span>
                  ) : (
                    <span className="text-emerald-400">{cell.value}</span>
                  )}
                </div>

                {/* Pointer Target Indicator Badge */}
                {isTargetOfPointer && (
                  <span className="text-[9px] font-bold text-amber-300 bg-amber-950/80 px-1.5 py-0.5 rounded text-center border border-amber-800">
                    ← Target of *ptr
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pointer Relationship Explanation Banner */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-mono font-bold">Pointer State:</span>
          <span className="text-slate-300">
            <code>ptr</code> holds address <code className="text-amber-400">{ptrCell?.value}</code>.
            Dereferencing <code>*ptr</code> accesses variable{' '}
            <strong className="text-emerald-400">{pointedCell?.varName}</strong> with value{' '}
            <strong className="text-emerald-400">{pointedCell?.value}</strong>!
          </span>
        </div>

        {/* Live Interactive Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handlePointerDereferenceMutate}
            className="px-2.5 py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-[11px] font-mono font-bold border border-teal-500/30 transition-colors"
          >
            *ptr = 99;
          </button>
          <button
            onClick={handlePointerIncrement}
            className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-mono font-bold border border-amber-500/30 transition-colors"
          >
            ptr = &bonus;
          </button>
          <button
            onClick={handleMutateScore}
            className="px-2.5 py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-[11px] font-mono font-bold border border-indigo-500/30 transition-colors"
          >
            score += 5;
          </button>
        </div>
      </div>

      {/* Interactive Memory Puzzle Challenge */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>Interactive Memory Challenge</span>
        </div>

        <p className="text-xs text-slate-200">
          If you declare <code className="text-teal-300 font-mono">int *p = &amp;score;</code>, what is stored inside the variable <code className="text-teal-300 font-mono">p</code> itself?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { label: 'The integer value 42', isCorrect: false },
            { label: 'The memory address 0x1000', isCorrect: true },
            { label: 'A random undefined number', isCorrect: false },
          ].map((choice, idx) => (
            <button
              key={idx}
              disabled={quizAnswered}
              onClick={() => handleQuizSubmit(idx)}
              className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                quizAnswered
                  ? choice.isCorrect
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                    : selectedQuizChoice === idx
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
              <strong>Explanation:</strong> A pointer variable does NOT store data values (like 42). It stores the hexadecimal memory address (e.g. <code>0x1000</code>) where that data resides in RAM!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
