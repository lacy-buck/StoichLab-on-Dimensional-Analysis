import React, { useState } from 'react';
import { RefreshCw, Layers } from 'lucide-react';
import { ConversionType, StoichiometryProblem } from '../types/chemistry';
import { generateRandomProblem } from '../data/reactions';
import { DimensionalAnalysisWorkspace } from './DimensionalAnalysisWorkspace';
import { ChemicalReactionHeader } from './ChemicalReactionHeader';

interface PracticeSandboxProps {
  onShowReference: () => void;
}

export const PracticeSandbox: React.FC<PracticeSandboxProps> = () => {
  const [selectedType, setSelectedType] = useState<ConversionType | 'all'>('all');
  const [problem, setProblem] = useState<StoichiometryProblem>(() => generateRandomProblem());
  const [solvedCount, setSolvedCount] = useState<number>(0);

  const handleGenerateNew = (type?: ConversionType | 'all') => {
    const filter = type !== undefined ? type : selectedType;
    const chosenType = filter === 'all' ? undefined : filter;
    setProblem(generateRandomProblem(chosenType));
  };

  const handleTypeChange = (type: ConversionType | 'all') => {
    setSelectedType(type);
    handleGenerateNew(type);
  };

  const handleCorrectSolve = () => {
    setSolvedCount(prev => prev + 1);
  };

  const typeTabs: { id: ConversionType | 'all'; label: string; desc: string }[] = [
    { id: 'all', label: 'All Mixed', desc: 'Random' },
    { id: 'gram-to-gram', label: 'Gram → Gram', desc: '3 steps' },
    { id: 'gram-to-mole', label: 'Gram → Mole', desc: '2 steps' },
    { id: 'mole-to-gram', label: 'Mole → Gram', desc: '2 steps' },
    { id: 'mole-to-mole', label: 'Mole → Mole', desc: '1 step' },
  ];

  return (
    <div className="space-y-3">
      {/* Sandbox Controls Bar (Compact) */}
      <div className="bg-white rounded-xl border border-slate-200 px-4 py-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-blue-50 text-blue-600 rounded-md">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-800">
            Practice Generator
          </span>
          <span className="text-[11px] text-slate-400">
            ({solvedCount} solved)
          </span>
        </div>

        {/* Conversion Type Segmented Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto bg-slate-100 p-0.5 rounded-lg">
          {typeTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTypeChange(tab.id)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all whitespace-nowrap ${
                selectedType === tab.id
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => handleGenerateNew()}
          className="px-3 py-1 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
        >
          <RefreshCw className="w-3 h-3" />
          <span>New Problem</span>
        </button>
      </div>

      {/* Reaction Header */}
      <ChemicalReactionHeader problem={problem} />

      {/* Interactive Dimensional Analysis Workspace with Typed Given and Next Button */}
      <DimensionalAnalysisWorkspace
        problem={problem}
        onSolveCorrect={handleCorrectSolve}
        onNextProblem={() => handleGenerateNew()}
        nextButtonLabel="Next Practice Problem →"
        isSandboxOrChallenge={true}
      />
    </div>
  );
};
