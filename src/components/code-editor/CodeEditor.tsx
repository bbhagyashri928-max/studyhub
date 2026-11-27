import React, { useState } from 'react';
import { Play, Copy, Check, Terminal, RotateCcw, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { compilerService } from '@/services/compiler';
import { ExecutionResult, CourseId } from '@/types';

interface CodeEditorProps {
  initialCode: string;
  language: CourseId;
  title?: string;
  defaultStdin?: string;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  language,
  title = 'Interactive Code Sandbox',
  defaultStdin = '',
  readOnly = false,
}) => {
  const [code, setCode] = useState(initialCode);
  const [stdin, setStdin] = useState(defaultStdin);
  const [showStdin, setShowStdin] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(initialCode);
    setExecutionResult(null);
  };

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const result = await compilerService.executeCode({
        code,
        language,
        stdin,
      });
      setExecutionResult(result);
    } catch (err: unknown) {
      setExecutionResult({
        stdout: '',
        stderr: err instanceof Error ? err.message : 'Execution error occurred',
        exitCode: 1,
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-navy-200 dark:border-navy-700 bg-navy-950 shadow-soft text-slate-100 font-mono text-sm">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-navy-900 border-b border-navy-800">
        <div className="flex items-center gap-2">
          <div className="flex space-x-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="font-semibold text-xs tracking-wider text-teal-400 uppercase">
            {language === 'c' ? 'C Source' : language === 'cpp' ? 'C++ 20' : 'Systems C/C++'}
          </span>
          <span className="text-slate-500 text-xs hidden sm:inline">|</span>
          <span className="text-xs text-slate-300 font-sans truncate max-w-[200px] sm:max-w-xs">{title}</span>
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button
            onClick={() => setShowStdin(!showStdin)}
            className={`px-2.5 py-1 text-xs rounded transition-colors ${
              showStdin ? 'bg-navy-700 text-teal-300' : 'text-slate-400 hover:text-white hover:bg-navy-800'
            }`}
            title="Toggle Custom Input (stdin)"
          >
            Custom Input {showStdin && '✓'}
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded bg-navy-800 text-slate-300 hover:text-white hover:bg-navy-700 transition-colors"
            title="Copy source code to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {!readOnly && (
            <button
              onClick={handleReset}
              className="p-1 text-slate-400 hover:text-white hover:bg-navy-800 rounded transition-colors"
              title="Reset code to original"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-teal-500 hover:bg-teal-600 active:scale-95 text-navy-950 font-bold text-xs transition-all shadow-sm disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-pulse' : ''}`} />
            <span>{isRunning ? 'Compiling...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      {/* Code Input Area with line numbers */}
      <div className="relative flex min-h-[220px] max-h-[460px] overflow-auto bg-navy-950 text-slate-100">
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          readOnly={readOnly}
          spellCheck={false}
          className="w-full p-4 font-mono text-sm leading-relaxed bg-transparent resize-y outline-none focus:ring-0 border-none text-slate-200 selection:bg-teal-700 selection:text-white"
          rows={Math.max(8, code.split('\n').length)}
        />
      </div>

      {/* Optional stdin area */}
      {showStdin && (
        <div className="border-t border-navy-800 bg-navy-900/90 p-3">
          <label className="block text-xs font-sans text-slate-400 mb-1 font-medium">
            Program Standard Input (stdin):
          </label>
          <input
            type="text"
            value={stdin}
            onChange={e => setStdin(e.target.value)}
            placeholder="e.g. 25 17 or input arguments"
            className="w-full px-3 py-1.5 text-xs bg-navy-950 border border-navy-700 rounded text-slate-200 outline-none focus:border-teal-400"
          />
        </div>
      )}

      {/* Console Output Terminal */}
      {executionResult && (
        <div className="border-t border-navy-800 bg-[#0c1522] p-4 text-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-navy-800 text-slate-400 font-sans">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-teal-400" />
              <span className="font-semibold text-slate-200">Terminal Output</span>
              {executionResult.exitCode === 0 ? (
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Exited with code 0
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[11px] text-rose-400 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> Exited with error ({executionResult.exitCode})
                </span>
              )}
            </div>

            {executionResult.executionTimeMs !== undefined && (
              <span className="flex items-center gap-1 text-[11px] text-slate-400">
                <Clock className="w-3 h-3 text-slate-500" />
                {executionResult.executionTimeMs} ms
              </span>
            )}
          </div>

          {executionResult.stdout && (
            <pre className="text-emerald-300 font-mono text-xs whitespace-pre-wrap leading-relaxed">
              {executionResult.stdout}
            </pre>
          )}

          {executionResult.stderr && (
            <pre className="text-rose-400 font-mono text-xs whitespace-pre-wrap leading-relaxed mt-2 p-2 bg-rose-950/30 rounded border border-rose-900/50">
              {executionResult.stderr}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};
