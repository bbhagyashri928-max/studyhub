import React, { useState, useEffect, useRef } from 'react';
import { FccProject, FccStep, FCC_PROJECTS } from '@/courses/fccStepCurriculum';
import { compilerService } from '@/services/compiler';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, XCircle, Play, RotateCcw, HelpCircle, 
  ArrowRight, ArrowLeft, Terminal, Sparkles, BookOpen, 
  Code2, Check, ExternalLink, ChevronRight, CheckSquare
} from 'lucide-react';

interface FccStepWorkspaceProps {
  initialProjectId?: string;
  initialStepNumber?: number;
  onNavigateBack: () => void;
}

export const FccStepWorkspace: React.FC<FccStepWorkspaceProps> = ({
  initialProjectId = 'c-project-grades',
  initialStepNumber = 1,
  onNavigateBack,
}) => {
  // Selected project
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjectId);
  const currentProject = FCC_PROJECTS.find(p => p.id === selectedProjectId) || FCC_PROJECTS[0];

  // Current step within project
  const [currentStepNumber, setCurrentStepNumber] = useState<number>(initialStepNumber);
  const currentStep: FccStep =
    currentProject.steps.find(s => s.stepNumber === currentStepNumber) || currentProject.steps[0];

  // Code editor state
  const [code, setCode] = useState<string>(() => {
    // Try restoring saved code from localStorage or use starter code
    const saved = localStorage.getItem(`fcc_code_${currentProject.id}_step_${currentStep.stepNumber}`);
    return saved || currentStep.starterCode;
  });

  // Test execution & validation state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [terminalOutput, setTerminalOutput] = useState<string>('Terminal console ready. Click "Check Your Code" or press Ctrl+Enter to run.');
  const [testResults, setTestResults] = useState<{ [testId: string]: boolean }>({});
  const [hasRunTests, setHasRunTests] = useState<boolean>(false);
  const [allPassed, setAllPassed] = useState<boolean>(false);
  const [failingHint, setFailingHint] = useState<string | null>(null);
  const [showSolutionHint, setShowSolutionHint] = useState<boolean>(false);

  // Editor ref for auto-focus
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // When step changes, load starter code or stored progress
  useEffect(() => {
    const saved = localStorage.getItem(`fcc_code_${currentProject.id}_step_${currentStep.stepNumber}`);
    setCode(saved || currentStep.starterCode);
    setTestResults({});
    setHasRunTests(false);
    setAllPassed(false);
    setFailingHint(null);
    setShowSolutionHint(false);
    setTerminalOutput('Terminal console ready. Click "Check Your Code" or press Ctrl+Enter.');
  }, [currentStep.stepNumber, currentProject.id]);

  // Persist code in localStorage on edits
  useEffect(() => {
    localStorage.setItem(`fcc_code_${currentProject.id}_step_${currentStep.stepNumber}`, code);
  }, [code, currentProject.id, currentStep.stepNumber]);

  // Keyboard shortcut: Ctrl+Enter / Cmd+Enter runs tests or advances
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (allPassed) {
          handleNextStep();
        } else {
          handleCheckCode();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [allPassed, code, currentStep]);

  // Check code against automated tests & run compiler
  const handleCheckCode = async () => {
    setIsRunning(true);
    setHasRunTests(true);

    try {
      // 1. Run live compiler
      const result = await compilerService.executeCode({
        code,
        language: currentProject.courseId,
      });

      const stdout = result.stdout || '';
      const stderr = result.stderr || '';
      setTerminalOutput(stderr ? `${stderr}\n${stdout}` : stdout || 'Program exited cleanly with 0 output.');

      // 2. Evaluate all test assertions
      const resultsMap: { [testId: string]: boolean } = {};
      let firstFailureHint: string | null = null;
      let passedCount = 0;

      for (const test of currentStep.tests) {
        let passed = false;
        try {
          passed = test.validate(code, stdout);
        } catch {
          passed = false;
        }

        resultsMap[test.id] = passed;
        if (passed) {
          passedCount++;
        } else if (!firstFailureHint) {
          firstFailureHint = test.failureHint;
        }
      }

      setTestResults(resultsMap);
      const isEveryTestPassed = passedCount === currentStep.tests.length;
      setAllPassed(isEveryTestPassed);
      setFailingHint(firstFailureHint);

      if (isEveryTestPassed) {
        confetti({
          particleCount: 85,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch (err: unknown) {
      setTerminalOutput(err instanceof Error ? err.message : 'Execution error');
      setAllPassed(false);
      setFailingHint('Compilation failed. Check your syntax and variable types.');
    } finally {
      setIsRunning(false);
    }
  };

  // Move to next step
  const handleNextStep = () => {
    if (currentStepNumber < currentProject.totalSteps) {
      setCurrentStepNumber(prev => prev + 1);
    } else {
      // Completed entire project!
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
      });
    }
  };

  // Reset current step to starter code
  const handleResetStep = () => {
    setCode(currentStep.starterCode);
    setTestResults({});
    setHasRunTests(false);
    setAllPassed(false);
    setFailingHint(null);
    localStorage.removeItem(`fcc_code_${currentProject.id}_step_${currentStep.stepNumber}`);
  };

  // Line numbers calculation
  const lineCount = Math.max(code.split('\n').length, 14);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  // Tab key indent handler in textarea
  const handleKeyDownInEditor = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const progressPercent = Math.round((currentStepNumber / currentProject.totalSteps) * 100);

  return (
    <div className="min-h-screen bg-[#0A0E17] text-slate-100 flex flex-col font-sans">
      
      {/* =========================================================================
          TOP NAV / PROGRESS HEADER (freeCodeCamp Style)
         ========================================================================= */}
      <header className="h-14 px-4 sm:px-6 bg-[#0E1524] border-b border-[#1A253D] flex items-center justify-between gap-4 flex-shrink-0 z-20">
        
        {/* Left: Back Link & Project Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onNavigateBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Curriculum</span>
          </button>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          {/* Project Selector Dropdown */}
          <select
            value={selectedProjectId}
            onChange={(e) => {
              setSelectedProjectId(e.target.value);
              setCurrentStepNumber(1);
            }}
            className="bg-[#141E33] border border-[#233354] text-xs font-bold text-white rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-400 cursor-pointer"
          >
            {FCC_PROJECTS.map(p => (
              <option key={p.id} value={p.id}>
                {p.courseId.toUpperCase()} • {p.title}
              </option>
            ))}
          </select>
        </div>

        {/* Center: Step Indicator & Progress */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 border border-teal-500/30 px-3 py-1 rounded-full">
            Step {currentStep.stepNumber} of {currentProject.totalSteps}
          </span>

          <div className="w-24 sm:w-36 h-2 rounded-full bg-slate-800 overflow-hidden hidden md:block">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Right Action Tools: Reset & Hint */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetStep}
            title="Reset code to starter template"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowSolutionHint(!showSolutionHint)}
            title="Toggle step hints"
            className={`p-1.5 rounded-lg transition-colors ${
              showSolutionHint ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

      </header>

      {/* Progress strip line */}
      <div className="h-0.5 bg-slate-800 w-full overflow-hidden">
        <div
          className="h-full bg-teal-400 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* =========================================================================
          MAIN INTERACTIVE WORKSPACE (Split Layout)
          - Left: Instructions, Concepts & Automated Test Criteria
          - Right Top: Code Editor with Line Numbers
          - Right Bottom: Live Terminal Console & Test Assertion Outputs
         ========================================================================= */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* =====================================================================
            PANE 1: LEFT INSTRUCTIONS PANEL (~42% Width on Desktop)
           ===================================================================== */}
        <div className="lg:w-[42%] xl:w-[40%] flex flex-col border-b lg:border-b-0 lg:border-r border-[#19243C] bg-[#0B101D] overflow-y-auto">
          
          <div className="p-6 sm:p-7 space-y-6 flex-1">
            
            {/* Step Header */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold tracking-wider text-teal-400 uppercase font-mono">
                {currentProject.title}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
                Step {currentStep.stepNumber}: {currentStep.title}
              </h1>
            </div>

            {/* Step Lesson & Concept Explanation */}
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 font-normal">
              {currentStep.conceptExplanation.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Syntax Tip Box if available */}
            {currentStep.syntaxTip && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>Syntax Reference</span>
                </span>
                <pre className="p-3.5 rounded-xl bg-[#070B14] border border-[#1B2742] font-mono text-xs text-teal-300 overflow-x-auto leading-relaxed shadow-inner">
                  {currentStep.syntaxTip}
                </pre>
              </div>
            )}

            {/* Actionable Task / Objective Callout (freeCodeCamp Signature Box) */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 via-teal-500/5 to-transparent border-l-4 border-teal-400 border border-teal-500/20 text-xs sm:text-sm text-slate-200 space-y-1 shadow-sm">
              <span className="font-bold text-teal-300 uppercase tracking-wider text-[11px] block">
                Your Task:
              </span>
              <p className="leading-relaxed font-medium">
                {currentStep.taskInstruction}
              </p>
            </div>

            {/* Automated Test Cases Checklist */}
            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-teal-400" />
                <span>Test Specifications ({currentStep.tests.length} Criteria)</span>
              </span>

              <div className="space-y-2">
                {currentStep.tests.map((test) => {
                  const hasRun = hasRunTests;
                  const isPassed = testResults[test.id];

                  return (
                    <div
                      key={test.id}
                      className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
                        !hasRun
                          ? 'bg-[#0E1526] border-[#1D2B47] text-slate-300'
                          : isPassed
                          ? 'bg-emerald-950/30 border-emerald-500/60 text-emerald-200 font-medium'
                          : 'bg-rose-950/30 border-rose-500/60 text-rose-200'
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {!hasRun ? (
                          <span className="w-4 h-4 rounded-full border border-slate-600 inline-block" />
                        ) : isPassed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400" />
                        )}
                      </div>
                      <span className="leading-relaxed">{test.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Failure Hint Alert */}
            {hasRunTests && !allPassed && failingHint && (
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-700/60 text-rose-200 text-xs space-y-1.5 animate-in fade-in">
                <div className="font-bold flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Sorry, your code does not pass. Keep trying!</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-normal">
                  💡 <strong>Hint:</strong> {failingHint}
                </p>
              </div>
            )}

            {/* Success Celebration Alert */}
            {hasRunTests && allPassed && (
              <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/70 text-emerald-200 text-xs space-y-1.5 animate-in zoom-in-95 shadow-md">
                <div className="font-bold text-sm text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>🎉 Congratulations! Your code passes all tests!</span>
                </div>
                <p className="text-emerald-100 font-normal">
                  Press <strong>Ctrl + Enter</strong> or click the submit button below to advance to Step {currentStep.stepNumber + 1}.
                </p>
              </div>
            )}

            {/* Solution Hint Drawer */}
            {showSolutionHint && (
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 text-xs text-amber-200 space-y-2 animate-in fade-in">
                <div className="font-bold flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span>Step Guidance</span>
                </div>
                <pre className="p-3 rounded-lg bg-[#070B14] font-mono text-[11px] text-amber-300 overflow-x-auto">
                  {currentStep.solutionCode}
                </pre>
              </div>
            )}

          </div>

          {/* Sticky Bottom Action Bar (freeCodeCamp Button Bar) */}
          <div className="p-4 sm:p-5 border-t border-[#19243C] bg-[#0E1524] flex items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
              Shortcut: <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">Ctrl+Enter</kbd>
            </span>

            {!allPassed ? (
              <button
                disabled={isRunning}
                onClick={handleCheckCode}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-extrabold text-xs sm:text-sm bg-teal-500 hover:bg-teal-400 active:scale-98 disabled:opacity-50 text-slate-950 flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isRunning ? 'Running Tests...' : 'Check Your Code (Ctrl + Enter)'}</span>
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-extrabold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 flex items-center justify-center gap-2 transition-all shadow-lg animate-pulse"
              >
                <span>Submit & Next Step (Ctrl + Enter)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

        {/* =====================================================================
            PANE 2 & 3: RIGHT PANEL (Editor + Console Split) (~58% Width on Desktop)
           ===================================================================== */}
        <div className="lg:w-[58%] xl:w-[60%] flex flex-col bg-[#070B14] overflow-hidden">
          
          {/* Top Bar for Code Editor */}
          <div className="h-10 px-4 bg-[#0B101D] border-b border-[#1A253D] flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
              <span className="text-white font-bold">
                {currentProject.courseId === 'c' ? 'main.c' : 'main.cpp'}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-[11px] text-slate-500">Interactive Code Editor</span>
            </div>
            <span className="text-[11px] text-slate-500">
              {code.length} chars
            </span>
          </div>

          {/* CODE EDITOR CONTAINER (with gutter line numbers) */}
          <div className="flex-1 min-h-[300px] flex overflow-hidden relative font-mono text-xs sm:text-sm bg-[#080C16]">
            
            {/* Line Numbers Gutter */}
            <div className="w-12 py-3 bg-[#080C16] border-r border-[#151E33] select-none text-slate-600 text-right pr-3 font-mono text-xs leading-relaxed overflow-hidden">
              {lineNumbers.map(num => (
                <div key={num}>{num}</div>
              ))}
            </div>

            {/* Editable Textarea */}
            <textarea
              ref={editorRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDownInEditor}
              spellCheck={false}
              className="flex-1 p-3 bg-transparent text-emerald-300 font-mono text-xs sm:text-sm leading-relaxed resize-none focus:outline-none overflow-y-auto selection:bg-teal-500/30"
              style={{ tabSize: 4 }}
            />
          </div>

          {/* ===================================================================
              PANE 3: TERMINAL CONSOLE & TEST RUNNER OUTPUT (~200px Height)
             =================================================================== */}
          <div className="h-48 sm:h-56 border-t border-[#1A253D] bg-[#070A12] flex flex-col">
            
            {/* Console Header Bar */}
            <div className="h-8 px-4 bg-[#0B101D] border-b border-[#151E33] flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-teal-400" />
                <span className="font-bold text-slate-300">Terminal Output & Console</span>
              </div>
              <div className="flex items-center gap-3">
                {hasRunTests && (
                  <span className={`font-bold ${allPassed ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {allPassed ? '✓ All Tests Passing' : '✕ Tests Failing'}
                  </span>
                )}
                <span className="text-slate-600">gcc / clang</span>
              </div>
            </div>

            {/* Console Body */}
            <pre className="flex-1 p-3 font-mono text-xs text-slate-200 overflow-y-auto leading-relaxed whitespace-pre-wrap select-text">
              {terminalOutput}
            </pre>

          </div>

        </div>

      </div>

    </div>
  );
};
