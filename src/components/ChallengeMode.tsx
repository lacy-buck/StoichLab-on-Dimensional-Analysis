import React, { useState, useEffect } from 'react';
import { Timer, Flame, Trophy, Play, RotateCcw, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { StoichiometryProblem } from '../types/chemistry';
import { generateRandomProblem } from '../data/reactions';
import { DimensionalAnalysisWorkspace } from './DimensionalAnalysisWorkspace';
import { ChemicalReactionHeader } from './ChemicalReactionHeader';

interface ChallengeModeProps {
  onShowReference: () => void;
  onShowRoadmap: () => void;
  onUpdateGlobalStats: (streak: number, points: number) => void;
}

export const ChallengeMode: React.FC<ChallengeModeProps> = ({
  onShowReference,
  onShowRoadmap,
  onUpdateGlobalStats,
}) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(240); // 4 minute challenge sprint
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
  const [currentProblem, setCurrentProblem] = useState<StoichiometryProblem>(() => generateRandomProblem());

  // Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameover');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleStartGame = () => {
    setGameState('playing');
    setTimeLeft(240);
    setCurrentScore(0);
    setStreak(0);
    setQuestionsAnswered(0);
    setCurrentProblem(generateRandomProblem());
  };

  const handleCorrectSolve = () => {
    const pointsGained = 100 + streak * 25;
    const newStreak = streak + 1;
    const newScore = currentScore + pointsGained;
    setCurrentScore(newScore);
    setStreak(newStreak);
    setQuestionsAnswered(prev => prev + 1);
    onUpdateGlobalStats(newStreak, pointsGained);
  };

  const handleNextProblem = () => {
    setCurrentProblem(generateRandomProblem());
  };

  const handleSkipProblem = () => {
    setStreak(0);
    setCurrentProblem(generateRandomProblem());
  };

  return (
    <div className="space-y-6">
      {gameState === 'idle' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <Flame className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Stoichiometry Speed Challenge
          </h2>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Test your mastery under the clock! Solve mixed dimensional analysis problems across grams and moles in a fast 4-minute sprint. Type the starting amount, decide how many steps you need, and build streaks to multiply your score.
          </p>
          <div className="grid grid-cols-3 gap-3 mb-6 text-xs text-slate-600 font-medium">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="block font-bold text-slate-900 text-sm">240s (4m)</span>
              Challenge Time
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="block font-bold text-slate-900 text-sm">+25 pts</span>
              Streak Multiplier
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="block font-bold text-slate-900 text-sm">All Types</span>
              g→g, g→mol, etc.
            </div>
          </div>
          <button
            onClick={handleStartGame}
            className="w-full py-3.5 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Start 4-Minute Challenge</span>
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="space-y-3">
          {/* Header Stats Bar (Compact) */}
          <div className="bg-slate-900 text-white rounded-xl px-4 py-2.5 flex items-center justify-between shadow-xs border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Timer className="w-4 h-4 text-amber-400" />
                <span className="text-lg font-bold font-mono">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <div className="h-4 w-px bg-slate-800" />
              <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                <span>{streak} Streak</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-sm font-bold font-mono text-emerald-400">
                  {currentScore} pts
                </span>
              </div>
              <button
                onClick={handleSkipProblem}
                className="px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
              >
                Skip
              </button>
            </div>
          </div>

          <ChemicalReactionHeader problem={currentProblem} hideInsights={true} />

          <DimensionalAnalysisWorkspace
            problem={currentProblem}
            onSolveCorrect={handleCorrectSolve}
            onNextProblem={handleNextProblem}
            nextButtonLabel="Next Challenge Problem →"
            isSandboxOrChallenge={true}
          />
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">
            Challenge Completed!
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Great stoichiometry dimensional analysis practice!
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6 text-center">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block uppercase font-semibold">Final Score</span>
              <span className="text-2xl font-bold font-mono text-blue-600">{currentScore} pts</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block uppercase font-semibold">Questions Solved</span>
              <span className="text-2xl font-bold font-mono text-emerald-600">{questionsAnswered}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleStartGame}
              className="flex-1 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
