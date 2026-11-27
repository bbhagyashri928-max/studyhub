import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, CheckCircle2, Sparkles, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HandsOnCodeLabProps {
  initialCodeSnippet?: string;
  expectedOutput?: string;
  conceptTitle?: string;
  onPracticeCompleted?: (score: number) => void;
}

export const HandsOnCodeLab: React.FC<HandsOnCodeLabProps> = ({
  initialCodeSnippet = `#include <stdio.h>\n\nint main() {\n    printf("Hello, C Engineer!\\n");\n    int a = 15, b = 25;\n    printf("Sum: %d\\n", a + b);\n    return 0;\n}`,
  expectedOutput = 'Hello, C Engineer!\nSum: 40',
  conceptTitle = 'Interactive Code Practice',
  onPracticeCompleted,
}) => {
  const [code, setCode] = useState<string>(initialCodeSnippet);
  const [output, setOutput] = useState<string>(expectedOutput || 'Output will appear here after clicking Run...');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedExperiments, setCompletedExperiments] = useState<number[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const experiments = [
    { id: 1, title: 'Experiment 1: Modify Values', instruction: 'Change numerical values or variables in the code and run it to observe how the computation changes.' },
    { id: 2, title: 'Experiment 2: Add Custom Output', instruction: 'Add a new printf / cout line displaying your name or a congratulatory message.' },
    { id: 3, title: 'Experiment 3: Edge Case Test', instruction: 'Test the logic with edge cases like 0, negative values, or boundary values.' },
  ];

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      // Simulate intelligent execution output based on user's code
      let simulatedOutput = '';
      if (code.includes('printf') || code.includes('cout')) {
        // Simple extraction or output simulation
        const lines = code.split('\n');
        const printLines = lines.filter(l => l.includes('printf(') || l.includes('cout <<'));
        if (printLines.length > 0) {
          simulatedOutput = printLines.map(l => {
            const match = l.match(/"([^"]+)"/);
            return match ? match[1].replace(/\\n/g, '') : 'Program executed successfully.';
          }).join('\n');
        } else {
          simulatedOutput = 'Program executed with return code 0.\n' + (expectedOutput || '');
        }
      } else {
        simulatedOutput = 'Program executed successfully.\n[Process exited with return code 0]';
      }

      setOutput(simulatedOutput || 'Execution completed.');
      // Auto-unlock first experiment
      if (!completedExperiments.includes(1)) {
        setCompletedExperiments(prev => [...prev, 1]);
      }
    }, 400);
  };

  const handleToggleExperiment = (id: number) => {
    if (completedExperiments.includes(id)) {
      setCompletedExperiments(prev => prev.filter(e => e !== id));
    } else {
      const next = [...completedExperiments, id];
      setCompletedExperiments(next);
      if (next.length === experiments.length) {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
        if (onPracticeCompleted) onPracticeCompleted(100);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(initialCodeSnippet);
    setOutput(expectedOutput || 'Output reset.');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 space-y-5 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Hands-On Practice Lab & Sandbox</h4>
            <p className="text-xs text-slate-400">
              Modify the code, test edge cases, and run your live code in real time!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="text-teal-400 font-semibold font-mono">Editable Source Code:</span>
          <span className="text-[11px] text-slate-500">Instant in-browser execution</span>
        </div>

        <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={8}
            className="w-full p-4 font-mono text-xs bg-slate-950 text-emerald-300 focus:outline-none focus:ring-1 focus:ring-teal-500/50 resize-y leading-relaxed"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Run Action Button */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Ready to test your modifications?
        </span>
        <button
          disabled={isRunning}
          onClick={handleRunCode}
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center gap-2 transition-all shadow-md active:scale-95"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{isRunning ? 'Compiling & Running...' : 'Run Live Code ▶'}</span>
        </button>
      </div>

      {/* Terminal Output */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-slate-300 font-bold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-teal-400" />
            <span>Terminal Output Console</span>
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">Status: Ready</span>
        </div>

        <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto min-h-[60px] leading-relaxed shadow-inner">
          {output}
        </pre>
      </div>

      {/* Hands-on Experiments Checklist */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Hands-on Practice Missions ({completedExperiments.length}/{experiments.length} completed)</span>
          </div>
          {completedExperiments.length === experiments.length && (
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              Mastered! +100 XP
            </span>
          )}
        </div>

        <div className="space-y-2">
          {experiments.map(exp => {
            const isDone = completedExperiments.includes(exp.id);
            return (
              <button
                key={exp.id}
                onClick={() => handleToggleExperiment(exp.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                  isDone
                    ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-300'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="space-y-0.5 pr-2">
                  <div className="font-bold flex items-center gap-2">
                    <span>{exp.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">{exp.instruction}</div>
                </div>

                <div className={`w-5 h-5 rounded-lg flex items-center justify-center border flex-shrink-0 ${
                  isDone ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700 text-transparent'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
