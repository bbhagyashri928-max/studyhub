import React, { useState } from 'react';
import { Stage, CourseId } from '@/types';
import { CodeBlockSorterGame } from './CodeBlockSorterGame';
import { BugHunterGame } from './BugHunterGame';
import { MemoryVisualizerGame } from './MemoryVisualizerGame';
import { FlowchartRunnerGame } from './FlowchartRunnerGame';
import { HandsOnCodeLab } from './HandsOnCodeLab';
import { OutputPredictorGame } from './OutputPredictorGame';
import { TokenClassifierGame } from './TokenClassifierGame';
import { 
  Puzzle, Bug, Cpu, GitBranch, Terminal, Award, 
  Sparkles, CheckCircle2, Flame, RotateCcw, Tag 
} from 'lucide-react';

interface ConceptGameHubProps {
  stage: Stage;
  courseId: CourseId;
  onEarnXp?: (xp: number) => void;
}

export type GameMode = 'flowchart' | 'sorter' | 'memory' | 'bughunter' | 'predictor' | 'classifier' | 'handson';

export const getStageGameInfo = (stage: Stage): { mode: GameMode; label: string; icon: string; desc: string } => {
  const text = (stage.title + ' ' + (stage.subtitle || '') + ' ' + (stage.content.explanation || '')).toLowerCase();

  // Keyword-based priority
  if (text.includes('token') || text.includes('keyword') || text.includes('identifier') || text.includes('character set')) {
    return { mode: 'classifier', label: 'Token Classifier', icon: '🏷️', desc: 'Sort keywords, identifiers, constants & operators' };
  }
  if (text.includes('pointer') || text.includes('memory') || text.includes('address') || text.includes('array')) {
    return { mode: 'memory', label: 'Memory & Pointer Visualizer', icon: '🧠', desc: 'RAM cells, addresses & pointer dereferencing' };
  }
  if (text.includes('bug') || text.includes('syntax error') || text.includes('common mistake') || text.includes('fix')) {
    return { mode: 'bughunter', label: 'Bug Hunter', icon: '🐛', desc: 'Detect and patch syntax and compilation bugs' };
  }
  if (text.includes('increment') || text.includes('decrement') || text.includes('precedence') || text.includes('predict') || text.includes('output')) {
    return { mode: 'predictor', label: 'Output Predictor', icon: '🎯', desc: 'Act as a mental compiler and predict terminal stdout' };
  }
  if (text.includes('algorithm') || text.includes('flowchart') || text.includes('condition') || text.includes('branch') || text.includes('loop')) {
    return { mode: 'flowchart', label: 'Flowchart & Logic Runner', icon: '⚡', desc: 'Trace decision branches, flowchart nodes & loops' };
  }

  // Fallback distribution by stage number so every numbered stage is unique:
  const stageMod = stage.stageNumber % 6;
  switch (stageMod) {
    case 1:
      return { mode: 'flowchart', label: 'Flowchart Runner', icon: '⚡', desc: 'Interactive step-by-step logic tracing' };
    case 2:
      return { mode: 'sorter', label: 'Code Block Sorter', icon: '🧩', desc: 'Arrange scrambled code lines into correct order' };
    case 3:
      return { mode: 'memory', label: 'Memory Visualizer', icon: '🧠', desc: 'RAM cell mapping and pointer addresses' };
    case 4:
      return { mode: 'bughunter', label: 'Bug Hunter', icon: '🐛', desc: 'Spot and repair compile bugs' };
    case 5:
      return { mode: 'predictor', label: 'Output Predictor', icon: '🎯', desc: 'Mental compiler output challenge' };
    case 0:
    default:
      return { mode: 'classifier', label: 'Token Sorter', icon: '🏷️', desc: 'Classify language elements & tokens' };
  }
};

export const ConceptGameHub: React.FC<ConceptGameHubProps> = ({
  stage,
  courseId,
  onEarnXp,
}) => {
  const stageInfo = React.useMemo(() => getStageGameInfo(stage), [stage]);
  const [activeMode, setActiveMode] = useState<GameMode>(stageInfo.mode);
  const [earnedTotalXp, setEarnedTotalXp] = useState<number>(0);

  // Sync mode if stage changes
  React.useEffect(() => {
    setActiveMode(stageInfo.mode);
  }, [stageInfo]);

  const handleGameComplete = (xp: number) => {
    setEarnedTotalXp(prev => prev + xp);
    if (onEarnXp) onEarnXp(xp);
  };

  const gamePills: { id: GameMode; label: string; icon: any; color: string; desc: string }[] = [
    { id: 'flowchart', label: '⚡ Flowchart Runner', icon: GitBranch, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30', desc: 'Step-by-step logic & branch tracing' },
    { id: 'sorter', label: '🧩 Code Sorter', icon: Puzzle, color: 'text-teal-400 bg-teal-500/10 border-teal-500/30', desc: 'Arrange scrambled code blocks' },
    { id: 'memory', label: '🧠 Memory Visualizer', icon: Cpu, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30', desc: 'RAM cells, pointers & address mapping' },
    { id: 'bughunter', label: '🐛 Bug Hunter', icon: Bug, color: 'text-rose-400 bg-rose-500/10 border-rose-500/30', desc: 'Spot and repair compiler bugs' },
    { id: 'predictor', label: '🎯 Output Predictor', icon: Terminal, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30', desc: 'Predict exact terminal stdout' },
    { id: 'classifier', label: '🏷️ Token Classifier', icon: Tag, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30', desc: 'Sort keywords, identifiers & operators' },
    { id: 'handson', label: '🧪 Code Lab', icon: Terminal, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30', desc: 'Live editable code sandbox' },
  ];

  return (
    <div className="space-y-4">
      {/* Recommended Game Indicator Banner */}
      <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-lg">{stageInfo.icon}</span>
          <div>
            <span className="font-bold text-teal-300">Stage {stage.stageNumber} Challenge: </span>
            <span className="text-slate-300">{stageInfo.label} — {stageInfo.desc}</span>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 font-mono text-[11px] font-bold flex-shrink-0">
          Recommended
        </span>
      </div>

      {/* Top Game Mode Selector Strip */}
      <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
          {gamePills.map(pill => {
            const isSelected = activeMode === pill.id;

            return (
              <button
                key={pill.id}
                onClick={() => setActiveMode(pill.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all flex-shrink-0 ${
                  isSelected
                    ? `${pill.color} ring-2 ring-teal-400/20 font-bold shadow-md`
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
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
        {activeMode === 'flowchart' && (
          <FlowchartRunnerGame
            onGameCompleted={handleGameComplete}
          />
        )}

        {activeMode === 'sorter' && (
          <CodeBlockSorterGame
            initialCodeSnippet={stage.content.codeSnippet}
            conceptTitle={stage.title}
            onGameCompleted={handleGameComplete}
          />
        )}

        {activeMode === 'memory' && (
          <MemoryVisualizerGame
            onGameCompleted={handleGameComplete}
          />
        )}

        {activeMode === 'bughunter' && (
          <BugHunterGame
            conceptTitle={stage.title}
            onGameCompleted={handleGameComplete}
          />
        )}

        {activeMode === 'predictor' && (
          <OutputPredictorGame
            conceptTitle={stage.title}
            initialCodeSnippet={stage.content.codeSnippet}
            expectedOutput={stage.content.expectedOutput}
            onGameCompleted={handleGameComplete}
          />
        )}

        {activeMode === 'classifier' && (
          <TokenClassifierGame
            onGameCompleted={handleGameComplete}
          />
        )}

        {activeMode === 'handson' && (
          <HandsOnCodeLab
            initialCodeSnippet={stage.content.codeSnippet}
            expectedOutput={stage.content.expectedOutput}
            conceptTitle={stage.title}
          />
        )}
      </div>
    </div>
  );
};
