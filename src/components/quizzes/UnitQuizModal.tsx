import React, { useState } from 'react';
import { Quiz } from '@/types';
import { useProgress } from '@/context/ProgressContext';
import { CheckCircle2, XCircle, Award, RotateCcw, X, ArrowRight, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface UnitQuizModalProps {
  quiz: Quiz;
  isOpen: boolean;
  onClose: () => void;
}

export const UnitQuizModal: React.FC<UnitQuizModalProps> = ({ quiz, isOpen, onClose }) => {
  const { submitQuizAttempt } = useProgress();
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: number }>({});
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submitted) return; // Prevent changing after submission
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    const passed = (score / quiz.questions.length) >= (quiz.passingScorePercent / 100);

    submitQuizAttempt({
      quizId: quiz.id,
      unitId: quiz.unitId,
      courseId: quiz.courseId,
      score,
      totalQuestions: quiz.questions.length,
      passed
    });

    setSubmitted(true);

    if (passed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const percentage = Math.round((score / quiz.questions.length) * 100);
  const passed = percentage >= quiz.passingScorePercent;
  const allAnswered = quiz.questions.every(q => selectedAnswers[q.id] !== undefined);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-navy-900 rounded-2xl shadow-soft-lg max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-navy-100 dark:border-navy-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-navy-100 dark:border-navy-800 bg-ivory-100 dark:bg-navy-950">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400">
                Unit Assessment
              </span>
              <span className="text-xs text-slate-500">{quiz.unitTitle}</span>
            </div>
            <h2 className="text-xl font-bold text-navy-900 dark:text-white mt-1">{quiz.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-navy-900 dark:hover:text-white rounded-lg hover:bg-white dark:hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {/* Result Banner if Submitted */}
          {submitted && (
            <div
              className={`p-5 rounded-xl border flex items-center gap-4 ${
                passed
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-coral-50 dark:bg-coral-950/30 border-coral-200 dark:border-coral-800 text-coral-900 dark:text-coral-200'
              }`}
            >
              <div className="p-3 rounded-xl bg-white dark:bg-navy-900 shadow-soft">
                <Award className={`w-8 h-8 ${passed ? 'text-emerald-500' : 'text-coral-500'}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">
                  {passed ? 'Congratulations! You Passed!' : 'Unit Quiz Attempt Complete'}
                </h3>
                <p className="text-sm mt-0.5 opacity-90">
                  You scored <span className="font-bold">{score} / {quiz.questions.length}</span> ({percentage}%).
                  {passed
                    ? ' This unit has been officially credited toward your certification progress.'
                    : ` Required to pass: ${quiz.passingScorePercent}%. Review explanations below and retry anytime.`}
                </p>
              </div>
            </div>
          )}

          {/* Question List */}
          {quiz.questions.map((question, qIdx) => {
            const userAnswer = selectedAnswers[question.id];
            const isCorrect = userAnswer === question.correctIndex;

            return (
              <div key={question.id} className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-slate-300 font-bold text-xs flex items-center justify-center mt-0.5">
                    {qIdx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-navy-900 dark:text-slate-100 text-base">
                      {question.question}
                    </p>
                    {question.codeSnippet && (
                      <pre className="mt-2 p-3 bg-navy-950 text-slate-200 rounded-lg text-xs font-mono overflow-x-auto border border-navy-800">
                        {question.codeSnippet}
                      </pre>
                    )}
                  </div>
                </div>

                {/* 4 Options */}
                <div className="grid grid-cols-1 gap-2.5 pt-1 pl-8">
                  {question.options.map((option, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    let optionStyle = 'border-slate-200 dark:border-navy-700 hover:border-teal-400 dark:hover:border-teal-500 bg-white dark:bg-navy-800 text-navy-800 dark:text-slate-200';

                    if (submitted) {
                      if (optIdx === question.correctIndex) {
                        optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-medium';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'border-coral-500 bg-coral-50 dark:bg-coral-950/40 text-coral-900 dark:text-coral-200 line-through';
                      } else {
                        optionStyle = 'opacity-60 border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-900';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 font-medium shadow-sm';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={submitted}
                        onClick={() => handleSelectOption(question.id, optIdx)}
                        className={`text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-full border flex items-center justify-center text-xs font-semibold">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{option}</span>
                        </div>

                        {submitted && optIdx === question.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        )}
                        {submitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-coral-600 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Detailed Explanation upon Submission */}
                {submitted && (
                  <div className="ml-8 p-3 rounded-lg bg-navy-50 dark:bg-navy-950/50 border border-navy-100 dark:border-navy-800 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-1.5 font-bold text-navy-900 dark:text-slate-200 mb-1">
                      <HelpCircle className="w-3.5 h-3.5 text-teal-500" />
                      <span>Explanation:</span>
                    </div>
                    <p className="leading-relaxed">{question.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-navy-100 dark:border-navy-800 bg-ivory-100 dark:bg-navy-950 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {!submitted ? (
              <span>
                {Object.keys(selectedAnswers).length} of {quiz.questions.length} answered
              </span>
            ) : (
              <span>Passing Requirement: {quiz.passingScorePercent}%</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {submitted ? (
              <>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-700 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-white dark:hover:bg-navy-800 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retry Quiz</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-navy-950 font-bold text-sm transition-all shadow-sm"
                >
                  Close
                </button>
              </>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 active:scale-95 text-navy-950 font-bold text-sm transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Submit Answers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
