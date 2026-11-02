export type UnitType = 'g' | 'mol';

export type ConversionType = 
  | 'gram-to-gram' 
  | 'gram-to-mole' 
  | 'mole-to-gram' 
  | 'mole-to-mole';

export interface ChemicalCompound {
  formula: string;
  name: string;
  molarMass: number; // in g/mol based on reference periodic table
  state?: string; // (s), (l), (g), (aq)
}

export interface ReactionParticipant {
  coefficient: number;
  compound: ChemicalCompound;
}

export interface ChemicalReaction {
  id: string;
  title: string;
  equationString: string;
  reactants: ReactionParticipant[];
  products: ReactionParticipant[];
  category: 'safety' | 'space' | 'biology' | 'culinary' | 'corrosion' | 'medicine';
  narrative: string;
  realWorldFact: string;
  safetyOrTriviaNote?: string;
}

export interface ExpectedConversionStep {
  stepIndex: number;
  type: 'molar-mass-given' | 'mole-ratio' | 'molar-mass-target';
  title: string;
  explanation: string;
  numerator: {
    value: number;
    unit: string;
    compoundFormula: string;
  };
  denominator: {
    value: number;
    unit: string;
    compoundFormula: string;
  };
}

export interface StoichiometryProblem {
  id: string;
  scenarioTitle: string;
  category: 'safety' | 'space' | 'biology' | 'culinary' | 'corrosion' | 'medicine';
  conversionType: ConversionType;
  reaction: ChemicalReaction;
  promptText: string;
  realWorldContext: string;
  given: {
    amount: number;
    unit: UnitType;
    compound: ChemicalCompound;
  };
  target: {
    unit: UnitType;
    compound: ChemicalCompound;
  };
  expectedSteps: ExpectedConversionStep[];
  finalAnswer: number;
  hintLadder: string[];
}

export interface WorkspaceFraction {
  id: string;
  numeratorValue: string;
  numeratorUnit: string;
  numeratorCompound: string;
  denominatorValue: string;
  denominatorUnit: string;
  denominatorCompound: string;
}

export interface ConversionFactorTile {
  id: string;
  title: string;
  type: 'molar-mass' | 'mole-ratio' | 'distractor';
  numerator: {
    value: number;
    unit: string;
    compoundFormula: string;
  };
  denominator: {
    value: number;
    unit: string;
    compoundFormula: string;
  };
}

export interface PeriodicElement {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  period: number;
  group: number;
  category: 'nonmetal' | 'noble-gas' | 'alkali-metal' | 'alkaline-earth' | 'metalloid' | 'halogen' | 'transition-metal' | 'post-transition';
  state: 'gas' | 'liquid' | 'solid';
}

export interface PolyatomicIonRef {
  name: string;
  formula: string;
  charge: string;
}
