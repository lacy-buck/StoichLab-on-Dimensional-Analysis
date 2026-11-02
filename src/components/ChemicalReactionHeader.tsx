import React, { useState } from 'react';
import { ShieldAlert, Rocket, Leaf, UtensilsCrossed, Wrench, HeartPulse, Sparkles, ChevronDown, Info } from 'lucide-react';
import { StoichiometryProblem } from '../types/chemistry';
import { CURATED_SCENARIOS } from '../data/reactions';

interface ChemicalReactionHeaderProps {
  problem: StoichiometryProblem;
  onSelectProblem?: (problem: StoichiometryProblem) => void;
  showScenarioDropdown?: boolean;
  hideInsights?: boolean;
}

export const ChemicalReactionHeader: React.FC<ChemicalReactionHeaderProps> = ({
  problem,
  onSelectProblem,
  showScenarioDropdown = false,
  hideInsights = false,
}) => {
  const [showDetails, setShowDetails] = useState<boolean>(!hideInsights);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'safety':
        return <ShieldAlert className="w-4 h-4 text-amber-600" />;
      case 'space':
        return <Rocket className="w-4 h-4 text-indigo-600" />;
      case 'biology':
        return <Leaf className="w-4 h-4 text-emerald-600" />;
      case 'culinary':
        return <UtensilsCrossed className="w-4 h-4 text-orange-600" />;
      case 'corrosion':
        return <Wrench className="w-4 h-4 text-slate-700" />;
      case 'medicine':
        return <HeartPulse className="w-4 h-4 text-rose-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 sm:px-5 sm:py-3.5 shadow-2xs space-y-2.5">
      {/* Top Row: Title, Scenario Switcher, Badges, and Details Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {getCategoryIcon(problem.category)}
          <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            {problem.scenarioTitle}
          </h2>
          <span className="text-[11px] font-medium text-slate-500 hidden sm:inline">
            · {problem.conversionType.replace(/-/g, ' ')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Scenario Switcher Dropdown */}
          {showScenarioDropdown && onSelectProblem && (
            <div className="relative">
              <select
                value={problem.id}
                onChange={(e) => {
                  const found = CURATED_SCENARIOS.find(s => s.id === e.target.value);
                  if (found) onSelectProblem(found);
                }}
                className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border-none rounded-lg px-2.5 py-1 outline-none cursor-pointer pr-6 appearance-none"
              >
                {CURATED_SCENARIOS.map(s => (
                  <option key={s.id} value={s.id}>
                    Scenario: {s.scenarioTitle}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          )}

          {!hideInsights && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <Info className="w-3.5 h-3.5" />
              <span>{showDetails ? 'Hide Real-World Context' : 'Real-World Context'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Prompt Text */}
      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
        {problem.promptText}
      </p>

      {/* Balanced Reaction Strip */}
      <div className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-2 text-xs">
        <div className="flex items-center gap-2 flex-wrap font-mono">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-sans mr-1">
            Equation:
          </span>

          {/* Reactants */}
          {problem.reaction.reactants.map((r, i) => (
            <React.Fragment key={`r_${i}`}>
              {i > 0 && <span className="text-slate-400 font-bold">+</span>}
              <span
                className={`px-1.5 py-0.5 rounded font-semibold ${
                  r.compound.formula === problem.given.compound.formula
                    ? 'bg-blue-100 text-blue-900 border border-blue-300'
                    : r.compound.formula === problem.target.compound.formula
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'text-slate-800'
                }`}
              >
                {r.coefficient > 1 ? r.coefficient : ''}{r.compound.formula}
                <span className="text-[10px] text-slate-400 font-normal ml-0.5">{r.compound.state}</span>
              </span>
            </React.Fragment>
          ))}

          <span className="text-slate-400 font-bold px-0.5">→</span>

          {/* Products */}
          {problem.reaction.products.map((p, i) => (
            <React.Fragment key={`p_${i}`}>
              {i > 0 && <span className="text-slate-400 font-bold">+</span>}
              <span
                className={`px-1.5 py-0.5 rounded font-semibold ${
                  p.compound.formula === problem.given.compound.formula
                    ? 'bg-blue-100 text-blue-900 border border-blue-300'
                    : p.compound.formula === problem.target.compound.formula
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'text-slate-800'
                }`}
              >
                {p.coefficient > 1 ? p.coefficient : ''}{p.compound.formula}
                <span className="text-[10px] text-slate-400 font-normal ml-0.5">{p.compound.state}</span>
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Given & Target Quick Reference */}
        <div className="hidden sm:flex items-center gap-2.5 text-[11px] font-medium shrink-0 font-mono">
          <span className="text-blue-700">
            Given: <strong>{problem.given.amount} {problem.given.unit} {problem.given.compound.formula}</strong>
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-emerald-700">
            Find: <strong>{problem.target.unit} {problem.target.compound.formula}</strong>
          </span>
        </div>
      </div>

      {/* Restored Real-World Information Grid */}
      {!hideInsights && showDetails && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs bg-slate-50/70 p-3 rounded-lg border border-slate-100 text-slate-600">
          <div>
            <span className="font-bold text-slate-800 block mb-0.5">
              Real-World Impact:
            </span>
            <p className="leading-normal">
              {problem.realWorldContext}
            </p>
          </div>
          <div>
            <span className="font-bold text-slate-800 block mb-0.5">
              Chemistry Insight:
            </span>
            <p className="leading-normal">
              {problem.reaction.narrative || problem.reaction.realWorldFact}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
