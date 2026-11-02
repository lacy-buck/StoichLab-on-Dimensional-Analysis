import { PERIODIC_ELEMENTS, getElementBySymbol } from '../data/periodicTable';

export interface ElementCount {
  symbol: string;
  name: string;
  count: number;
  atomicMass: number;
  totalMass: number;
}

export interface MolarMassBreakdown {
  formula: string;
  elements: ElementCount[];
  totalMolarMass: number;
  error?: string;
}

/**
 * Parses chemical formulas including parentheses like Mg(OH)2, Ca(NO3)2, (NH4)2SO4
 */
export function calculateMolarMass(formulaStr: string): MolarMassBreakdown {
  const cleaned = formulaStr.trim().replace(/\s+/g, '');
  if (!cleaned) {
    return { formula: formulaStr, elements: [], totalMolarMass: 0 };
  }

  try {
    const counts: { [symbol: string]: number } = {};

    // Helper function to parse a segment with an optional multiplier
    const parseSegment = (segment: string, multiplier: number = 1) => {
      // Regular expression matching Element followed by optional digits OR parentheses
      const regex = /([A-Z][a-z]*)(\d*)/g;
      let match;
      while ((match = regex.exec(segment)) !== null) {
        const symbol = match[1];
        const count = match[2] ? parseInt(match[2], 10) : 1;
        counts[symbol] = (counts[symbol] || 0) + count * multiplier;
      }
    };

    // Handle parentheses: e.g. Mg(OH)2 or (NH4)2SO4
    let remaining = cleaned;
    const parenRegex = /\(([^)]+)\)(\d*)/g;
    let pMatch;
    
    // First, process and remove all parenthesized groups
    while ((pMatch = parenRegex.exec(cleaned)) !== null) {
      const innerFormula = pMatch[1];
      const parenMultiplier = pMatch[2] ? parseInt(pMatch[2], 10) : 1;
      parseSegment(innerFormula, parenMultiplier);
    }

    // Now remove the parenthesized groups from the string and parse whatever is left outside
    const outside = cleaned.replace(/\(([^)]+)\)(\d*)/g, '');
    parseSegment(outside, 1);

    // Sum up the molar masses
    const elements: ElementCount[] = [];
    let totalMolarMass = 0;

    for (const [symbol, count] of Object.entries(counts)) {
      const el = getElementBySymbol(symbol);
      if (!el) {
        return {
          formula: formulaStr,
          elements: [],
          totalMolarMass: 0,
          error: `Unknown chemical element symbol '${symbol}' in formula '${formulaStr}'.`,
        };
      }
      const mass = el.atomicMass;
      const subtotal = Number((mass * count).toFixed(3));
      elements.push({
        symbol: el.symbol,
        name: el.name,
        count,
        atomicMass: mass,
        totalMass: subtotal,
      });
      totalMolarMass += subtotal;
    }

    return {
      formula: formulaStr,
      elements,
      totalMolarMass: Number(totalMolarMass.toFixed(2)),
    };
  } catch {
    return {
      formula: formulaStr,
      elements: [],
      totalMolarMass: 0,
      error: `Could not parse formula '${formulaStr}'. Please check formatting (e.g. H2O, Ca(NO3)2).`,
    };
  }
}
