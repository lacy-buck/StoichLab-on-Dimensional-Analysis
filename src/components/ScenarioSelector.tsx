import React from 'react';
import { ArrowRight, CheckCircle2, ShieldAlert, Rocket, Leaf, UtensilsCrossed, Wrench, HeartPulse } from 'lucide-react';
import { CURATED_SCENARIOS } from '../data/reactions';
import { StoichiometryProblem } from '../types/chemistry';

interface ScenarioSelectorProps {
  currentProblemId: string;
  onSelectProblem: (problem: StoichiometryProblem) => void;
  completedProblemIds: string[];
}

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  currentProblemId,
  onSelectProblem,
  completedProblemIds,
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'safety':
        return <ShieldAlert className="w-5 h-5 text-amber-600" />;
      case 'space':
        return <Rocket className="w-5 h-5 text-indigo-600" />;
      case 'biology':
        return <Leaf className="w-5 h-5 text-emerald-600" />;
      case 'culinary':
        return <UtensilsCrossed className="w-5 h-5 text-orange-600" />;
      case 'corrosion':
        return <Wrench className="w-5 h-5 text-slate-700" />;
      case 'medicine':
        return <HeartPulse className="w-5 h-5 text-rose-600" />;
      default:
        return <Rocket className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Real-World Chemical Scenarios
          </h3>
          <p className="text-xs text-slate-500">
            Choose a mission scenario to master that specific conversion type
          </p>
        </div>
        <div className="text-xs font-semibold text-slate-500">
          {completedProblemIds.length} of {CURATED_SCENARIOS.length} Solved
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {CURATED_SCENARIOS.map((scenario) => {
          const isSelected = scenario.id === currentProblemId;
          const isCompleted = completedProblemIds.includes(scenario.id);

          return (
            <div
              key={scenario.id}
              onClick={() => onSelectProblem(scenario)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-blue-50/60 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                {/* Header row: category + completion check */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    {getCategoryIcon(scenario.category)}
                    <span className="capitalize font-medium">{scenario.category}</span>
                  </div>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                      {scenario.conversionType.replace(/-/g, ' ')}
                    </span>
                  )}
                </div>

                {/* Scenario Title */}
                <h4 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {scenario.scenarioTitle}
                </h4>

                {/* Chemical Reaction Equation */}
                <div className="text-xs font-mono font-medium text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200/80 mb-2 truncate">
                  {scenario.reaction.equationString}
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                  {scenario.realWorldContext}
                </p>
              </div>

              {/* Bottom Target details & CTA */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono text-[11px]">
                  Given: {scenario.given.amount} {scenario.given.unit} {scenario.given.compound.formula}
                </span>
                <span className="font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <span>Solve</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
