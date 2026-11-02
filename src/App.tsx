import React, { useState } from 'react';
import { CURATED_SCENARIOS } from './data/reactions';
import { StoichiometryProblem } from './types/chemistry';
import { TopNavbar } from './components/TopNavbar';
import { ChemicalReactionHeader } from './components/ChemicalReactionHeader';
import { DimensionalAnalysisWorkspace } from './components/DimensionalAnalysisWorkspace';
import { ScenarioSelector } from './components/ScenarioSelector';
import { PracticeSandbox } from './components/PracticeSandbox';
import { ChallengeMode } from './components/ChallengeMode';
import { ReferenceModal } from './components/ReferenceModal';
import { Trophy } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'scenarios' | 'sandbox' | 'challenge'>('scenarios');
  const [currentProblem, setCurrentProblem] = useState<StoichiometryProblem>(CURATED_SCENARIOS[0]);
  const [completedProblemIds, setCompletedProblemIds] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [isReferenceOpen, setIsReferenceOpen] = useState<boolean>(false);
  const [showCelebrationBanner, setShowCelebrationBanner] = useState<boolean>(false);

  const handleScenarioSolve = () => {
    if (!completedProblemIds.includes(currentProblem.id)) {
      setCompletedProblemIds(prev => [...prev, currentProblem.id]);
    }
    const newStreak = streak + 1;
    const addedPoints = 150;
    setStreak(newStreak);
    setScore(prev => prev + addedPoints);
    setShowCelebrationBanner(true);
    setTimeout(() => {
      setShowCelebrationBanner(false);
    }, 4000);
  };

  const handleSelectProblem = (prob: StoichiometryProblem) => {
    setCurrentProblem(prob);
    setShowCelebrationBanner(false);
  };

  const handleNextScenario = () => {
    const currentIndex = CURATED_SCENARIOS.findIndex(s => s.id === currentProblem.id);
    const nextIndex = (currentIndex + 1) % CURATED_SCENARIOS.length;
    handleSelectProblem(CURATED_SCENARIOS[nextIndex]);
  };

  const handleUpdateGlobalStats = (newStreak: number, points: number) => {
    setStreak(newStreak);
    setScore(prev => prev + points);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Bar */}
      <TopNavbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenReference={() => setIsReferenceOpen(true)}
        score={score}
        streak={streak}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-5 lg:px-6 py-3.5 space-y-3">
        
        {/* Celebration Banner */}
        {showCelebrationBanner && (
          <div className="px-4 py-2.5 bg-emerald-500 text-white rounded-xl shadow-md flex items-center justify-between gap-3 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xs sm:text-sm">
                Scenario Mastered! (+150 Points)
              </span>
            </div>
            <button
              onClick={() => setShowCelebrationBanner(false)}
              className="px-2.5 py-0.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded transition-colors shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* TAB 1: STORY-DRIVEN SCENARIOS */}
        {activeTab === 'scenarios' && (
          <div className="space-y-3">
            {/* Reaction Header with Real-World Context & Quick Dropdown */}
            <ChemicalReactionHeader
              problem={currentProblem}
              onSelectProblem={handleSelectProblem}
              showScenarioDropdown={true}
            />

            {/* Interactive Dimensional Analysis Workspace with Next Button */}
            <DimensionalAnalysisWorkspace
              problem={currentProblem}
              onSolveCorrect={handleScenarioSolve}
              onNextProblem={handleNextScenario}
              nextButtonLabel="Next Scenario →"
              isSandboxOrChallenge={false}
            />

            {/* Collapsible Scenarios Grid */}
            <details className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs group">
              <summary className="text-xs font-bold text-slate-700 cursor-pointer flex items-center justify-between">
                <span>Browse All 6 Real-World Mission Scenarios ({completedProblemIds.length}/6 Solved)</span>
                <span className="text-[11px] text-blue-600 font-semibold group-open:hidden">Show Grid ▾</span>
              </summary>
              <div className="mt-3 pt-3 border-t border-slate-100">
                <ScenarioSelector
                  currentProblemId={currentProblem.id}
                  onSelectProblem={handleSelectProblem}
                  completedProblemIds={completedProblemIds}
                />
              </div>
            </details>
          </div>
        )}

        {/* TAB 2: FREE PRACTICE SANDBOX */}
        {activeTab === 'sandbox' && (
          <PracticeSandbox
            onShowReference={() => setIsReferenceOpen(true)}
          />
        )}

        {/* TAB 3: TIMED CHALLENGE */}
        {activeTab === 'challenge' && (
          <ChallengeMode
            onShowReference={() => setIsReferenceOpen(true)}
            onShowRoadmap={() => {}}
            onUpdateGlobalStats={handleUpdateGlobalStats}
          />
        )}

      </main>

      {/* Reference Modal - Strictly PDF Viewer */}
      <ReferenceModal
        isOpen={isReferenceOpen}
        onClose={() => setIsReferenceOpen(false)}
      />

      {/* Quiet Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-3 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-medium text-slate-600">
            StoichioLab · High School Chemistry Dimensional Analysis
          </span>
          <button
            onClick={() => setIsReferenceOpen(true)}
            className="hover:text-blue-600 transition-colors"
          >
            Periodic Reference (PDF)
          </button>
        </div>
      </footer>
    </div>
  );
}
