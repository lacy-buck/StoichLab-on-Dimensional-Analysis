import React from 'react';
import { Atom, BookOpen, Flame, HelpCircle, Layers, Sparkles } from 'lucide-react';

interface TopNavbarProps {
  activeTab: 'scenarios' | 'sandbox' | 'challenge';
  onSelectTab: (tab: 'scenarios' | 'sandbox' | 'challenge') => void;
  onOpenReference: () => void;
  score: number;
  streak: number;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenReference,
  score,
  streak,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
            <Atom className="w-6 h-6 animate-[spin_12s_linear_infinite]" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
              Stoichio<span className="text-blue-600">Lab</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-medium text-slate-400">
              Dimensional Analysis Tutor
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onSelectTab('scenarios')}
            className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
              activeTab === 'scenarios'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Story Scenarios</span>
          </button>

          <button
            onClick={() => onSelectTab('sandbox')}
            className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
              activeTab === 'sandbox'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Practice Sandbox</span>
          </button>

          <button
            onClick={() => onSelectTab('challenge')}
            className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
              activeTab === 'challenge'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Timed Challenge</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Reference Button */}
        <div className="flex items-center gap-3 shrink-0">
          {streak > 0 && (
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200/80 rounded-lg text-xs font-semibold text-amber-800">
              <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>{streak} Streak ({score} pts)</span>
            </div>
          )}

          <button
            onClick={onOpenReference}
            className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Reference Sheet (PDF)</span>
          </button>
        </div>
      </div>

      {/* Mobile nav links strip */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-slate-100 bg-slate-50/80 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => onSelectTab('scenarios')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'scenarios' ? 'bg-white shadow-xs text-blue-700 font-bold' : 'text-slate-600'
          }`}
        >
          Scenarios
        </button>
        <button
          onClick={() => onSelectTab('sandbox')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'sandbox' ? 'bg-white shadow-xs text-blue-700 font-bold' : 'text-slate-600'
          }`}
        >
          Sandbox
        </button>
        <button
          onClick={() => onSelectTab('challenge')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'challenge' ? 'bg-white shadow-xs text-blue-700 font-bold' : 'text-slate-600'
          }`}
        >
          Challenge
        </button>
      </div>
    </header>
  );
};
