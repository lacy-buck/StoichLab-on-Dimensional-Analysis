import React, { useState, useEffect } from 'react';
import {
  ArrowUpDown,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  RotateCcw,
  Plus,
  Trash2,
  Check,
  ArrowRight
} from 'lucide-react';
import {
  StoichiometryProblem,
  WorkspaceFraction,
  ConversionFactorTile
} from '../types/chemistry';
import { generateCandidateTiles } from '../data/reactions';

interface DimensionalAnalysisWorkspaceProps {
  problem: StoichiometryProblem;
  onSolveCorrect: () => void;
  onNextProblem?: () => void;
  nextButtonLabel?: string;
  isSandboxOrChallenge?: boolean;
  onStepProgressUpdate?: (completedIndices: number[]) => void;
}

export interface SlotValidation {
  isFilled: boolean;
  isCorrect: boolean;
  isInverted: boolean;
  isError: boolean;
  message: string;
}

export const DimensionalAnalysisWorkspace: React.FC<DimensionalAnalysisWorkspaceProps> = ({
  problem,
  onSolveCorrect,
  onNextProblem,
  nextButtonLabel = 'Next Problem →',
  isSandboxOrChallenge = false,
  onStepProgressUpdate,
}) => {
  const [inputMode, setInputMode] = useState<'tiles' | 'direct'>('tiles');
  // Always start with 0 steps so we don't give away how many steps are needed!
  const [fractions, setFractions] = useState<WorkspaceFraction[]>([]);
  const [availableTiles, setAvailableTiles] = useState<ConversionFactorTile[]>([]);
  const [activeHintIndex, setActiveHintIndex] = useState<number>(-1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // In sandbox/challenge, students must type the starting given amount and compound
  const [typedGivenAmount, setTypedGivenAmount] = useState<string>('');
  const [typedGivenUnit, setTypedGivenUnit] = useState<'g' | 'mol' | ''>('');
  const [typedGivenCompound, setTypedGivenCompound] = useState<string>('');

  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);

  const normalize = (str: string) => str.trim().toLowerCase();

  // Clean and normalize chemical formulas and subscripts for robust matching
  const cleanFormula = (str: string) =>
    str
      .trim()
      .toLowerCase()
      .replace(/[\s\(\)\[\]]/g, '')
      .replace(/₀/g, '0')
      .replace(/₁/g, '1')
      .replace(/₂/g, '2')
      .replace(/₃/g, '3')
      .replace(/₄/g, '4')
      .replace(/₅/g, '5')
      .replace(/₆/g, '6')
      .replace(/₇/g, '7')
      .replace(/₈/g, '8')
      .replace(/₉/g, '9');

  // Reset workspace when problem changes
  useEffect(() => {
    // Start with 0 steps to NOT give away the required step count!
    setFractions([]);
    setAvailableTiles(generateCandidateTiles(problem));
    setActiveHintIndex(-1);
    setIsCompleted(false);
    setSelectedSlotIndex(null);

    if (isSandboxOrChallenge) {
      setTypedGivenAmount('');
      setTypedGivenUnit('');
      setTypedGivenCompound('');
    } else {
      setTypedGivenAmount(String(problem.given.amount));
      setTypedGivenUnit(problem.given.unit);
      setTypedGivenCompound(problem.given.compound.formula);
    }
  }, [problem.id, isSandboxOrChallenge]);

  // Check if typed starting given is valid
  const effectiveGivenAmount = isSandboxOrChallenge
    ? parseFloat(typedGivenAmount)
    : problem.given.amount;

  const effectiveGivenUnit = isSandboxOrChallenge
    ? typedGivenUnit
    : problem.given.unit;

  const effectiveGivenCompound = isSandboxOrChallenge
    ? typedGivenCompound
    : problem.given.compound.formula;

  const isGivenValid =
    !isNaN(effectiveGivenAmount) &&
    effectiveGivenAmount > 0 &&
    Boolean(effectiveGivenUnit) &&
    Boolean(effectiveGivenCompound) &&
    (!isSandboxOrChallenge ||
      (Math.abs(effectiveGivenAmount - problem.given.amount) < 0.01 &&
        normalize(effectiveGivenUnit) === normalize(problem.given.unit) &&
        cleanFormula(effectiveGivenCompound) === cleanFormula(problem.given.compound.formula)));

  // Evaluate instant real-time validation per slot for the FASTEST path
  const evaluateSlots = (): SlotValidation[] => {
    const validations: SlotValidation[] = [];

    for (let i = 0; i < fractions.length; i++) {
      const f = fractions[i];
      const isFilled = Boolean(f.numeratorValue && f.denominatorValue && f.numeratorUnit && f.denominatorUnit);

      if (!isFilled) {
        validations.push({
          isFilled: false,
          isCorrect: false,
          isInverted: false,
          isError: false,
          message: 'Empty slot — place a conversion factor tile here',
        });
        continue;
      }

      // Check if student added an unnecessary extra step beyond the fastest path
      if (i >= problem.expectedSteps.length) {
        validations.push({
          isFilled: true,
          isCorrect: false,
          isInverted: false,
          isError: true,
          message: `Extra step! The fastest path to ${problem.target.unit} ${problem.target.compound.formula} only requires ${problem.expectedSteps.length} step${problem.expectedSteps.length > 1 ? 's' : ''}.`,
        });
        continue;
      }

      const expectedStep = problem.expectedSteps[i];

      const numVal = parseFloat(String(f.numeratorValue));
      const denVal = parseFloat(String(f.denominatorValue));
      const expNumVal = expectedStep.numerator.value;
      const expDenVal = expectedStep.denominator.value;

      const fNumUnit = normalize(f.numeratorUnit);
      const fNumComp = cleanFormula(f.numeratorCompound);
      const fDenUnit = normalize(f.denominatorUnit);
      const fDenComp = cleanFormula(f.denominatorCompound);

      const expNumUnit = normalize(expectedStep.numerator.unit);
      const expNumComp = cleanFormula(expectedStep.numerator.compoundFormula);
      const expDenUnit = normalize(expectedStep.denominator.unit);
      const expDenComp = cleanFormula(expectedStep.denominator.compoundFormula);

      // Check values match (float tolerance or proportional ratio)
      const valuesMatch =
        !isNaN(numVal) &&
        !isNaN(denVal) &&
        denVal !== 0 &&
        expDenVal !== 0 &&
        ((Math.abs(numVal - expNumVal) < 0.25 && Math.abs(denVal - expDenVal) < 0.25) ||
          Math.abs((numVal / denVal) - (expNumVal / expDenVal)) < 0.01);

      // Check direct match with the expected fastest step
      const directMatch =
        valuesMatch &&
        fNumUnit === expNumUnit &&
        fNumComp === expNumComp &&
        fDenUnit === expDenUnit &&
        fDenComp === expDenComp;

      if (directMatch) {
        validations.push({
          isFilled: true,
          isCorrect: true,
          isInverted: false,
          isError: false,
          message: `✓ Correct! Step ${i + 1} follows the fastest path to ${problem.target.unit} ${problem.target.compound.formula}.`,
        });
        continue;
      }

      // Check if inverted version of this expected step
      const invertedValuesMatch =
        !isNaN(numVal) &&
        !isNaN(denVal) &&
        numVal !== 0 &&
        expNumVal !== 0 &&
        ((Math.abs(numVal - expDenVal) < 0.25 && Math.abs(denVal - expNumVal) < 0.25) ||
          Math.abs((numVal / denVal) - (expDenVal / expNumVal)) < 0.01);

      const isInvertedExpected =
        invertedValuesMatch &&
        fNumUnit === expDenUnit &&
        fNumComp === expDenComp &&
        fDenUnit === expNumUnit &&
        fDenComp === expNumComp;

      if (isInvertedExpected) {
        validations.push({
          isFilled: true,
          isCorrect: false,
          isInverted: true,
          isError: true,
          message: `Inverted factor! Click ⇅ to flip so ${expectedStep.denominator.unit} ${expectedStep.denominator.compoundFormula} is on the bottom to cancel.`,
        });
        continue;
      }

      // Check if the denominator cancels the previous unit, but numerator is a detour (not fastest path)
      const neededUnit = i === 0 ? effectiveGivenUnit : fractions[i - 1].numeratorUnit;
      const neededCompound = i === 0 ? effectiveGivenCompound : fractions[i - 1].numeratorCompound;

      const denomCancelsPrevious =
        isGivenValid &&
        normalize(f.denominatorUnit) === normalize(neededUnit) &&
        cleanFormula(f.denominatorCompound) === cleanFormula(neededCompound);

      if (denomCancelsPrevious) {
        validations.push({
          isFilled: true,
          isCorrect: false,
          isInverted: false,
          isError: true,
          message: `Cancels ${f.denominatorCompound}, but detours to ${f.numeratorCompound}! The fastest path directly bridges to ${expectedStep.numerator.compoundFormula}.`,
        });
      } else {
        validations.push({
          isFilled: true,
          isCorrect: false,
          isInverted: false,
          isError: true,
          message: `Wrong factor for Step ${i + 1}! The fastest path needs ${expectedStep.denominator.unit} ${expectedStep.denominator.compoundFormula} on bottom to cancel.`,
        });
      }
    }

    return validations;
  };

  const slotValidations = evaluateSlots();

  // Check which steps are completed
  const completedIndices: number[] = [];
  slotValidations.forEach((v, idx) => {
    if (v.isCorrect) completedIndices.push(idx);
  });

  useEffect(() => {
    if (onStepProgressUpdate) {
      onStepProgressUpdate(completedIndices);
    }
  }, [completedIndices.length]);

  // Compute live mathematical value
  const computeLiveResult = () => {
    if (!isGivenValid || isNaN(effectiveGivenAmount)) return null;

    let result = effectiveGivenAmount;
    let hasAllNumbers = true;

    for (const f of fractions) {
      const num = parseFloat(String(f.numeratorValue));
      const den = parseFloat(String(f.denominatorValue));
      if (isNaN(num) || isNaN(den) || den === 0) {
        hasAllNumbers = false;
        break;
      }
      result = (result * num) / den;
    }

    if (!hasAllNumbers || fractions.length === 0) return null;
    return Number(result.toFixed(2));
  };

  const liveResult = computeLiveResult();

  // Check if ALL steps are filled, correct, and matched the fastest path
  useEffect(() => {
    if (fractions.length === 0 || isCompleted || !isGivenValid) return;

    // Must match the exact number of steps for the fastest path
    if (fractions.length !== problem.expectedSteps.length) return;

    const allSlotsFilled = fractions.every(f => f.numeratorValue && f.denominatorValue);
    const allSlotsCorrect = slotValidations.length === fractions.length && slotValidations.every(v => v.isCorrect);

    if (allSlotsFilled && allSlotsCorrect) {
      const lastFraction = fractions[fractions.length - 1];
      const finalUnit = normalize(lastFraction.numeratorUnit);
      const finalCompound = cleanFormula(lastFraction.numeratorCompound);
      const targetUnit = normalize(problem.target.unit);
      const targetCompound = cleanFormula(problem.target.compound.formula);

      if (finalUnit === targetUnit && finalCompound === targetCompound) {
        setIsCompleted(true);
        onSolveCorrect();
      }
    }
  }, [fractions, slotValidations, isCompleted, isGivenValid]);

  // Flip fraction helper
  const handleFlipFraction = (slotIndex: number) => {
    const updated = [...fractions];
    const current = updated[slotIndex];
    updated[slotIndex] = {
      ...current,
      numeratorValue: current.denominatorValue,
      numeratorUnit: current.denominatorUnit,
      numeratorCompound: current.denominatorCompound,
      denominatorValue: current.numeratorValue,
      denominatorUnit: current.numeratorUnit,
      denominatorCompound: current.numeratorCompound,
    };
    setFractions(updated);
  };

  // Place a tile into a slot (fills selected slot, first empty slot, or appends)
  const handlePlaceTile = (tile: ConversionFactorTile, targetSlotIndex?: number) => {
    const updated = [...fractions];
    let slotIdx = targetSlotIndex !== undefined ? targetSlotIndex : selectedSlotIndex;

    if (slotIdx === null || slotIdx === undefined) {
      // Find first empty slot
      slotIdx = updated.findIndex(f => !f.numeratorValue && !f.denominatorValue);
      if (slotIdx === -1) {
        // Automatically append a new fraction step when student clicks a tile!
        updated.push({
          id: `slot_${updated.length}_${Date.now()}`,
          numeratorValue: String(tile.numerator.value),
          numeratorUnit: tile.numerator.unit,
          numeratorCompound: tile.numerator.compoundFormula,
          denominatorValue: String(tile.denominator.value),
          denominatorUnit: tile.denominator.unit,
          denominatorCompound: tile.denominator.compoundFormula,
        });
        setFractions(updated);
        setSelectedSlotIndex(null);
        return;
      }
    }

    if (slotIdx >= 0 && slotIdx < updated.length) {
      updated[slotIdx] = {
        ...updated[slotIdx],
        numeratorValue: String(tile.numerator.value),
        numeratorUnit: tile.numerator.unit,
        numeratorCompound: tile.numerator.compoundFormula,
        denominatorValue: String(tile.denominator.value),
        denominatorUnit: tile.denominator.unit,
        denominatorCompound: tile.denominator.compoundFormula,
      };
      setFractions(updated);
      setSelectedSlotIndex(null);
    }
  };

  const handleClearSlot = (slotIndex: number) => {
    const updated = [...fractions];
    updated[slotIndex] = {
      ...updated[slotIndex],
      numeratorValue: '',
      numeratorUnit: '',
      numeratorCompound: '',
      denominatorValue: '',
      denominatorUnit: '',
      denominatorCompound: '',
    };
    setFractions(updated);
  };

  const handleAddSlot = () => {
    setFractions([
      ...fractions,
      {
        id: `slot_${fractions.length}_${Date.now()}`,
        numeratorValue: '',
        numeratorUnit: '',
        numeratorCompound: '',
        denominatorValue: '',
        denominatorUnit: '',
        denominatorCompound: '',
      },
    ]);
  };

  const handleRemoveSlot = () => {
    if (fractions.length > 0) {
      setFractions(fractions.slice(0, -1));
      if (selectedSlotIndex === fractions.length - 1) {
        setSelectedSlotIndex(null);
      }
    }
  };

  const handleResetWorkspace = () => {
    setFractions([]);
    setIsCompleted(false);
    setSelectedSlotIndex(null);
  };

  const availableCompounds = [
    ...problem.reaction.reactants.map(r => r.compound.formula),
    ...problem.reaction.products.map(p => p.compound.formula),
  ];

  const givenCancels = isGivenValid && slotValidations[0]?.isCorrect;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3">
      
      {/* Workspace Control Bar */}
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Dimensional Analysis Workspace
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            · Add steps and place conversion factor tiles
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddSlot}
            className="px-2.5 py-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center gap-1 shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Step</span>
          </button>

          {fractions.length > 0 && (
            <button
              onClick={handleRemoveSlot}
              className="px-2 py-1 text-xs text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors flex items-center gap-1"
              title="Remove last step"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => setInputMode(inputMode === 'tiles' ? 'direct' : 'tiles')}
            className="text-[11px] font-semibold text-slate-600 hover:text-blue-600 bg-slate-100 px-2 py-1 rounded-md transition-colors"
          >
            {inputMode === 'tiles' ? 'Tiles' : 'Keypad'}
          </button>

          <button
            onClick={handleResetWorkspace}
            className="text-[11px] text-slate-400 hover:text-slate-700 p-1 rounded transition-colors"
            title="Reset workspace"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Multiplier Track */}
      <div className="overflow-x-auto py-1">
        <div className="flex items-center gap-2.5 min-w-max">
          
          {/* Starting Given Box */}
          <div
            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all min-w-[145px] shadow-2xs ${
              isGivenValid
                ? 'bg-blue-50/90 border-blue-300'
                : 'bg-amber-50/80 border-amber-300'
            }`}
          >
            <span className="text-[9px] font-bold uppercase tracking-wider text-blue-700 leading-none mb-1">
              Starting Given
            </span>

            {isSandboxOrChallenge ? (
              /* User must type the starting amount in sandbox & challenge! */
              <div className="flex flex-col items-center gap-1 w-full">
                <input
                  type="number"
                  step="any"
                  placeholder="Amount"
                  value={typedGivenAmount}
                  onChange={(e) => setTypedGivenAmount(e.target.value)}
                  className="w-20 px-1.5 py-0.5 text-xs font-mono font-bold bg-white border border-slate-300 rounded text-center outline-none focus:border-blue-500"
                />
                <div className="flex items-center gap-1">
                  <select
                    value={typedGivenUnit}
                    onChange={(e) => setTypedGivenUnit(e.target.value as 'g' | 'mol')}
                    className="text-[10px] bg-white border border-slate-300 rounded px-1 py-0.5"
                  >
                    <option value="">Unit</option>
                    <option value="g">g</option>
                    <option value="mol">mol</option>
                  </select>
                  <select
                    value={typedGivenCompound}
                    onChange={(e) => setTypedGivenCompound(e.target.value)}
                    className="text-[10px] bg-white border border-slate-300 rounded px-1 py-0.5 font-mono"
                  >
                    <option value="">Substance</option>
                    {availableCompounds.map(c => (
                      <option key={`given_${c}`} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                {!isGivenValid && (
                  <span className="text-[9px] text-amber-700 font-semibold text-center">
                    Type given from problem
                  </span>
                )}
              </div>
            ) : (
              /* Scenarios Mode: Pre-filled Given on ONE line */
              <div className="flex items-center justify-center gap-1.5 font-mono text-sm leading-tight py-1">
                <span className="font-bold text-blue-950 text-base">{problem.given.amount}</span>
                <div className="relative inline-block font-semibold text-blue-800 text-xs">
                  <span>{problem.given.unit} {problem.given.compound.formula}</span>
                  {givenCancels && (
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <line
                        x1="5"
                        y1="95"
                        x2="95"
                        y2="5"
                        stroke="#059669"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className="cancellation-slash"
                      />
                    </svg>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Fractions Chain */}
          {fractions.length === 0 ? (
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-xs text-slate-500">
              <span>No fraction steps added yet.</span>
              <button
                onClick={handleAddSlot}
                className="text-blue-600 font-bold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Click "Add Step" or pick a tile below to begin</span>
              </button>
            </div>
          ) : (
            fractions.map((fraction, slotIndex) => {
              const validation = slotValidations[slotIndex] || {
                isFilled: false,
                isCorrect: false,
                isInverted: false,
                isError: false,
                message: '',
              };

              const denomCancels = validation.isCorrect;
              const nextSlotCorrect = slotValidations[slotIndex + 1]?.isCorrect;
              const numCancels = validation.isCorrect && nextSlotCorrect;

              const isSelected = selectedSlotIndex === slotIndex;

              const borderBgStyle = isSelected
                ? 'bg-blue-50/95 border-blue-500 ring-2 ring-blue-500/50'
                : !validation.isFilled
                ? 'bg-slate-50/80 border-slate-300'
                : validation.isCorrect
                ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-400/20'
                : validation.isInverted
                ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/20'
                : 'bg-rose-50/80 border-rose-400 ring-2 ring-rose-400/20';

              return (
                <React.Fragment key={fraction.id}>
                  {/* Multiplier × */}
                  <div className="text-xl font-bold text-slate-400 font-mono select-none">
                    ×
                  </div>

                  {/* Fraction Bracket */}
                  <div
                    onClick={() => setSelectedSlotIndex(slotIndex === selectedSlotIndex ? null : slotIndex)}
                    className={`flex flex-col items-center px-3 py-2 rounded-xl border transition-all duration-150 min-w-[160px] max-w-[210px] shadow-2xs cursor-pointer ${borderBgStyle}`}
                    title="Click slot to select for tile placement or replacement"
                  >
                    <div className="w-full flex items-center justify-between text-[10px] font-semibold text-slate-500 mb-1">
                      <span className="flex items-center gap-1">
                        <span>Step {slotIndex + 1}</span>
                        {isSelected && (
                          <span className="text-[9px] font-bold text-blue-700 bg-blue-100 px-1 rounded">
                            Target
                          </span>
                        )}
                        {validation.isCorrect && (
                          <Check className="w-3 h-3 text-emerald-600" />
                        )}
                        {validation.isError && (
                          <span className="text-[9px] font-bold text-rose-600">
                            {validation.isInverted ? 'INVERTED' : 'DETOUR'}
                          </span>
                        )}
                      </span>
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleFlipFraction(slotIndex)}
                          title="Flip / Invert Fraction"
                          className="p-1 text-slate-500 hover:text-blue-600 hover:bg-slate-200/60 rounded transition-colors"
                        >
                          <ArrowUpDown className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleClearSlot(slotIndex)}
                          title="Clear Slot"
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-slate-200/60 rounded transition-colors"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* NUMERATOR */}
                    <div className="w-full flex items-center justify-center px-2 py-1.5 bg-white rounded-md border border-slate-200 min-h-[38px] shadow-2xs">
                      {inputMode === 'tiles' ? (
                        fraction.numeratorValue ? (
                          <div className="flex items-center justify-center gap-1.5 font-mono text-xs whitespace-nowrap">
                            <span className="font-bold text-slate-900 text-sm">
                              {fraction.numeratorValue}
                            </span>
                            <div className="relative inline-block font-semibold text-slate-700">
                              <span>{fraction.numeratorUnit} {fraction.numeratorCompound}</span>
                              {numCancels && (
                                <svg
                                  className="absolute inset-0 w-full h-full pointer-events-none"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                >
                                  <line
                                    x1="5"
                                    y1="95"
                                    x2="95"
                                    y2="5"
                                    stroke="#059669"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    className="cancellation-slash"
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">
                            Numerator
                          </span>
                        )
                      ) : (
                        <div className="flex items-center gap-1 w-full">
                          <input
                            type="number"
                            step="any"
                            placeholder="Val"
                            value={fraction.numeratorValue}
                            onChange={(e) => {
                              const updated = [...fractions];
                              updated[slotIndex].numeratorValue = e.target.value;
                              setFractions(updated);
                            }}
                            className="w-14 px-1 py-0.5 text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded text-center outline-none"
                          />
                          <select
                            value={fraction.numeratorUnit}
                            onChange={(e) => {
                              const updated = [...fractions];
                              updated[slotIndex].numeratorUnit = e.target.value;
                              setFractions(updated);
                            }}
                            className="text-[10px] bg-slate-50 border border-slate-300 rounded px-1 py-0.5"
                          >
                            <option value="">Unit</option>
                            <option value="g">g</option>
                            <option value="mol">mol</option>
                          </select>
                          <select
                            value={fraction.numeratorCompound}
                            onChange={(e) => {
                              const updated = [...fractions];
                              updated[slotIndex].numeratorCompound = e.target.value;
                              setFractions(updated);
                            }}
                            className="text-[10px] bg-slate-50 border border-slate-300 rounded px-1 py-0.5 font-mono"
                          >
                            <option value="">Substance</option>
                            {availableCompounds.map(c => (
                              <option key={`num_${c}`} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="w-full h-0.5 bg-slate-700 my-1 rounded-full" />

                    {/* DENOMINATOR */}
                    <div className="w-full flex items-center justify-center px-2 py-1.5 bg-white rounded-md border border-slate-200 min-h-[38px] shadow-2xs">
                      {inputMode === 'tiles' ? (
                        fraction.denominatorValue ? (
                          <div className="flex items-center justify-center gap-1.5 font-mono text-xs whitespace-nowrap">
                            <span className="font-bold text-slate-900 text-sm">
                              {fraction.denominatorValue}
                            </span>
                            <div className="relative inline-block font-semibold text-slate-700">
                              <span>{fraction.denominatorUnit} {fraction.denominatorCompound}</span>
                              {denomCancels && (
                                <svg
                                  className="absolute inset-0 w-full h-full pointer-events-none"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                >
                                  <line
                                    x1="5"
                                    y1="95"
                                    x2="95"
                                    y2="5"
                                    stroke="#059669"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    className="cancellation-slash"
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">
                            Denominator
                          </span>
                        )
                      ) : (
                        <div className="flex items-center gap-1 w-full">
                          <input
                            type="number"
                            step="any"
                            placeholder="Val"
                            value={fraction.denominatorValue}
                            onChange={(e) => {
                              const updated = [...fractions];
                              updated[slotIndex].denominatorValue = e.target.value;
                              setFractions(updated);
                            }}
                            className="w-14 px-1 py-0.5 text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded text-center outline-none"
                          />
                          <select
                            value={fraction.denominatorUnit}
                            onChange={(e) => {
                              const updated = [...fractions];
                              updated[slotIndex].denominatorUnit = e.target.value;
                              setFractions(updated);
                            }}
                            className="text-[10px] bg-slate-50 border border-slate-300 rounded px-1 py-0.5"
                          >
                            <option value="">Unit</option>
                            <option value="g">g</option>
                            <option value="mol">mol</option>
                          </select>
                          <select
                            value={fraction.denominatorCompound}
                            onChange={(e) => {
                              const updated = [...fractions];
                              updated[slotIndex].denominatorCompound = e.target.value;
                              setFractions(updated);
                            }}
                            className="text-[10px] bg-slate-50 border border-slate-300 rounded px-1 py-0.5 font-mono"
                          >
                            <option value="">Substance</option>
                            {availableCompounds.map(c => (
                              <option key={`den_${c}`} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Immediate Feedback */}
                    {validation.isError && (
                      <div className="mt-1.5 w-full px-1.5 py-1 rounded bg-rose-100/90 border border-rose-300 text-[9.5px] font-medium text-rose-900 text-center leading-snug">
                        {validation.isInverted ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFlipFraction(slotIndex);
                            }}
                            className="inline-flex items-center justify-center gap-1 font-bold text-rose-900 hover:text-rose-950 underline cursor-pointer"
                          >
                            <ArrowUpDown className="w-2.5 h-2.5 shrink-0" />
                            <span>Click ⇅ to flip</span>
                          </button>
                        ) : (
                          <span>{validation.message}</span>
                        )}
                      </div>
                    )}

                    {validation.isCorrect && (
                      <div className="mt-1 text-[9.5px] font-bold text-emerald-700 text-center leading-tight">
                        <span>Fastest path ✓</span>
                      </div>
                    )}

                  </div>
                </React.Fragment>
              );
            })
          )}

          {/* Equal Sign */}
          <div className="text-xl font-bold text-slate-400 font-mono select-none">
            =
          </div>

          {/* Target Result Box */}
          <div
            className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl border min-w-[140px] shadow-2xs transition-all ${
              isCompleted
                ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/30'
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
              {isCompleted ? 'Target Yield' : 'Yield Goal'}
            </span>
            <div className="flex items-center justify-center gap-1.5 font-mono text-base font-bold whitespace-nowrap">
              <span>{liveResult !== null ? liveResult : '?'}</span>
              <span className="text-xs font-semibold text-slate-700">
                {problem.target.unit} {problem.target.compound.formula}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Prominent Next Problem / Next Scenario Button when Solved! */}
      {isCompleted && (
        <div className="p-3.5 bg-emerald-50 border-2 border-emerald-400 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-950 animate-in fade-in shadow-xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold text-sm block text-emerald-900">
                Solved! All units cancelled out cleanly.
              </span>
              <span className="text-xs text-emerald-700">
                Calculated product: <strong>{liveResult} {problem.target.unit} {problem.target.compound.formula}</strong>
              </span>
            </div>
          </div>

          {onNextProblem && (
            <button
              onClick={onNextProblem}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-md transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <span>{nextButtonLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Available Tiles Dock */}
      {inputMode === 'tiles' && !isCompleted && (
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                Factor Tiles (Click tile to place · Molar masses start with g on top; flip when needed):
              </span>
              {selectedSlotIndex !== null && (
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                  Targeting Step {selectedSlotIndex + 1}
                  <button
                    onClick={() => setSelectedSlotIndex(null)}
                    className="text-blue-500 hover:text-blue-900 ml-0.5"
                    title="Deselect"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
            <button
              onClick={() => {
                if (activeHintIndex < problem.hintLadder.length - 1) {
                  setActiveHintIndex(prev => prev + 1);
                }
              }}
              className="text-[11px] font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Hint ({activeHintIndex + 1}/{problem.hintLadder.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {availableTiles.map((tile) => (
              <div
                key={tile.id}
                className="group p-2 bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-400 rounded-lg shadow-2xs transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                onClick={() => handlePlaceTile(tile)}
                title="Click to place in workspace"
              >
                <div className="text-center font-mono text-xs">
                  <div className="font-bold text-slate-900 leading-tight">
                    {tile.numerator.value} {tile.numerator.unit} {tile.numerator.compoundFormula}
                  </div>
                  <div className="w-full h-px bg-slate-400 my-0.5" />
                  <div className="font-bold text-slate-900 leading-tight">
                    {tile.denominator.value} {tile.denominator.unit} {tile.denominator.compoundFormula}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAvailableTiles(prev =>
                      prev.map(t =>
                        t.id === tile.id
                          ? {
                              ...t,
                              numerator: { ...t.denominator },
                              denominator: { ...t.numerator },
                            }
                          : t
                      )
                    );
                  }}
                  title="Flip Numerator and Denominator"
                  className="p-1 text-slate-400 hover:text-blue-600 hover:bg-white rounded transition-colors"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hints */}
      {activeHintIndex >= 0 && (
        <div className="p-2.5 bg-purple-50/80 border border-purple-200 rounded-lg text-xs text-purple-900">
          <span className="font-bold text-purple-700 block mb-0.5">
            Hint {activeHintIndex + 1}:
          </span>
          <p>{problem.hintLadder[activeHintIndex]}</p>
        </div>
      )}

    </div>
  );
};
