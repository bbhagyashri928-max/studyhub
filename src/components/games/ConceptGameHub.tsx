import React, { useState } from 'react';
import { Stage, CourseId } from '@/types';
import { CodeBlockSorterGame } from './CodeBlockSorterGame';
import { BugHunterGame } from './BugHunterGame';
import { MemoryVisualizerGame } from './MemoryVisualizerGame';
import { FlowchartRunnerGame } from './FlowchartRunnerGame';
import { HandsOnCodeLab } from './HandsOnCodeLab';
import { 
  Puzzle, Bug, Cpu, GitBranch, Terminal, Award, 
  Sparkles, CheckCircle2, Flame, RotateCcw 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ConceptGameHubProps {
  stage: Stage;
  courseId: CourseId;
  onEarnXp?: (xp: number) => void;
}

type GameMode = 'sorter' | 'bughunter' | 'memory' | 'flowchart' | 'handson';

export const ConceptGameHub: React.FC<ConceptGameHubProps> = ({
  stage,
  courseId,
  onEarnXp,
}) => {
  // Intelligently infer default game mode based on stage keywords
  const defaultMode: GameMode = React.useMemo(() => {
    const text = (stage.title + ' ' + (stage.subtitle || '') + ' ' + (stage.content.explanation || '')).toLowerCase();
    if (text.includes('pointer') || text.includes('memory') || text.includes('address') || text.includes('array') || text.includes('variable')) {
      return 'memory';
    }
    if (text.includes('if') || text.includes('else') || text.includes('switch') || text.includes('loop') || text.includes('while') || text.includes('for') || text.includes('flowchart') || text.includes('algorithm')) {
      return 'flowchart';
    }
    if (text.includes('bug') || text.includes('operator') || text.includes('precedence') || text.includes('syntax') || text.includes('error')) {
      return 'bughunter';
    }
    return 'sorter';
  }, [stage]);

  const [activeMode, setActiveMode] = useState<GameMode>(defaultMode);
  const [earnedTotalXp, setEarnedTotalXp] = useState<number>(0);

  const handleGameComplete = (xp: number) => {
    setEarnedTotalXp(prev => prev + xp);
    if (onEarnXp) onEarnXp(xp);
  };

  const gamePills: { id: GameMode; label: string; icon: any; color: string; desc: string }[] = [
    { id: 'memory', label: 'Memory & Pointers', icon: Cpu, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30', desc: 'RAM cells, pointers & address mapping' },
    { id: 'flowchart', label: 'Flowchart & Loops', icon: GitBranch, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30', desc: 'Step-by-step logic & branch tracing' },
    { id: 'sorter', label: 'Syntax Puzzle', icon: Puzzle, color: 'text-teal-400 bg-teal-500/10 border-teal-500/30', desc: 'Arrange code blocks in correct order' },
    { id: 'bughunter', label: 'Bug Hunter', icon: Bug, color: 'text-rose-400 bg-rose-500/10 border-rose-500/30', desc: 'Spot and repair compiler bugs' },
    { id: 'handson', label: 'Hands-On Lab', icon: Terminal, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30', desc: 'Live editable code sandbox' },
  ];

  return (
    <div className="space-y-4">
      {/* Top Game Mode Selector Strip */}
      <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {gamePills.map(pill => {
            const Icon = pill.icon;
            const isSelected = activeMode === pill.id;

            return (
              <button
                key={pill.id}
                onClick={() => setActiveMode(pill.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all flex-shrink-0 ${
                  isSelected
                    ? `${pill.color} ring-2 ring-teal-400/20 font-bold shadow-md`
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>

        {/* XP Status Pill */}
        <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>+{earnedTotalXp} XP Earned</span>
          </div>
        </div>
      </div>

      {/* Render Active Game Mode */}
      <div className="transition-all duration-200">
        {activeMode === 'sorter' && (
          <CodeBlockSorterGame
            initialCodeSnippet={stage.content.codeSnippet}
            conceptTitle={stage.title}
            onGameCompleted={handleGameComplete}
          />
        )}

        {activeMode === 'bughunter' && (
          <BugHunterGame
            conceptTitle={stage.title}
            onGameCompleted={handleGameComplete}
          />
        )}

        {activeMode === 'memory' && (
          <MemoryVisualizerGame
            onGameCompleted={handleGameComplete}
          />
        )}

        {activeMode === 'flowchart' && (
          <FlowchartRunnerGame
            onGameCompleted={handleGameComplete}
          />
        )}

        {activeMode === 'handson' && (
          <HandsOnCodeLab
            initialCodeSnippet={stage.content.codeSnippet}
            expectedOutput={stage.content.expectedOutput}
            conceptTitle={stage.title}
            onPracticeCompleted={handleGameComplete}
          />
        )}
      </div>
    </div>
  );
};
