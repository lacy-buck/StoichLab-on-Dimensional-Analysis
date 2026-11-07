import { ChemicalReaction, StoichiometryProblem, ConversionFactorTile, ExpectedConversionStep, ConversionType } from '../types/chemistry';

export const SCENARIO_REACTIONS: ChemicalReaction[] = [
  {
    id: 'airbag',
    title: 'Automotive Airbag Inflation',
    equationString: '2 NaN₃(s) → 2 Na(s) + 3 N₂(g)',
    category: 'safety',
    narrative: 'In a car collision, sensors send an electrical pulse that ignites sodium azide (NaN₃). In less than 40 milliseconds, it decomposes rapidly to produce harmless nitrogen gas (N₂) that fills the nylon airbag before the occupant hits the steering wheel.',
    realWorldFact: 'Airbags must inflate at over 200 mph (320 km/h) to protect drivers before their momentum carries them forward.',
    safetyOrTriviaNote: 'The metallic sodium (Na) produced is instantly scavenged by potassium nitrate and silica into harmless glass.',
    reactants: [
      { coefficient: 2, compound: { formula: 'NaN₃', name: 'Sodium Azide', molarMass: 65.02, state: '(s)' } },
    ],
    products: [
      { coefficient: 2, compound: { formula: 'Na', name: 'Sodium', molarMass: 22.99, state: '(s)' } },
      { coefficient: 3, compound: { formula: 'N₂', name: 'Nitrogen Gas', molarMass: 28.02, state: '(g)' } },
    ],
  },
  {
    id: 'rocket',
    title: 'Spaceflight Rocket Propellant',
    equationString: '2 H₂(l) + O₂(l) → 2 H₂O(g)',
    category: 'space',
    narrative: 'Liquid hydrogen (H₂) and liquid oxygen (LOX) in rocket engines like the Space Shuttle or SLS burn with extreme efficiency. Flight dynamics engineers must calculate the exact stoichiometric mass of oxygen required so no unburned fuel adds dead weight.',
    realWorldFact: 'Combustion of hydrogen and oxygen produces the highest exhaust velocity of any common chemical rocket propellant.',
    safetyOrTriviaNote: 'The massive white clouds rising from rocket launchpads are pure water vapor and steam condensing in ambient air.',
    reactants: [
      { coefficient: 2, compound: { formula: 'H₂', name: 'Hydrogen Gas', molarMass: 2.02, state: '(l)' } },
      { coefficient: 1, compound: { formula: 'O₂', name: 'Oxygen Gas', molarMass: 32.00, state: '(l)' } },
    ],
    products: [
      { coefficient: 2, compound: { formula: 'H₂O', name: 'Water / Steam', molarMass: 18.02, state: '(g)' } },
    ],
  },
  {
    id: 'photosynthesis',
    title: 'Plant Photosynthesis & Sugar Harvest',
    equationString: '6 CO₂(g) + 6 H₂O(l) → C₆H₁₂O₆(s) + 6 O₂(g)',
    category: 'biology',
    narrative: 'Inside chloroplasts, solar photons power the Calvin cycle where chlorophyll enzymes fix carbon dioxide gas into energy-dense glucose (C₆H₁₂O₆), while releasing oxygen for all aerobic life on Earth.',
    realWorldFact: 'Earth\'s biosphere converts approximately 100 billion metric tons of atmospheric carbon into biomass each year through photosynthesis.',
    safetyOrTriviaNote: 'Glucose synthesized during daytime sunlight is stored as insoluble starch grains to fuel plant metabolism at night.',
    reactants: [
      { coefficient: 6, compound: { formula: 'CO₂', name: 'Carbon Dioxide', molarMass: 44.01, state: '(g)' } },
      { coefficient: 6, compound: { formula: 'H₂O', name: 'Water', molarMass: 18.02, state: '(l)' } },
    ],
    products: [
      { coefficient: 1, compound: { formula: 'C₆H₁₂O₆', name: 'Glucose', molarMass: 180.18, state: '(s)' } },
      { coefficient: 6, compound: { formula: 'O₂', name: 'Oxygen Gas', molarMass: 32.00, state: '(g)' } },
    ],
  },
  {
    id: 'baking',
    title: 'Thermal Leavening in Bread Baking',
    equationString: '2 NaHCO₃(s) → Na₂CO₃(s) + H₂O(g) + CO₂(g)',
    category: 'culinary',
    narrative: 'When baking soda (sodium bicarbonate) warms in the oven beyond 80°C, it decomposes without needing acid, trapping millions of microscopic carbon dioxide gas bubbles inside batter to create light, fluffy cakes and cookies.',
    realWorldFact: 'Too much baking soda can leave residual basic sodium carbonate (Na₂CO₃), giving baked goods an undesirable soapy taste.',
    safetyOrTriviaNote: 'Baking powder differs from baking soda because it already contains dry acid crystals (cream of tartar) that react when moisture is added.',
    reactants: [
      { coefficient: 2, compound: { formula: 'NaHCO₃', name: 'Baking Soda', molarMass: 84.01, state: '(s)' } },
    ],
    products: [
      { coefficient: 1, compound: { formula: 'Na₂CO₃', name: 'Sodium Carbonate', molarMass: 105.99, state: '(s)' } },
      { coefficient: 1, compound: { formula: 'H₂O', name: 'Water Vapor', molarMass: 18.02, state: '(g)' } },
      { coefficient: 1, compound: { formula: 'CO₂', name: 'Carbon Dioxide', molarMass: 44.01, state: '(g)' } },
    ],
  },
  {
    id: 'bridge_rust',
    title: 'Suspension Bridge Steel Rusting',
    equationString: '4 Fe(s) + 3 O₂(g) → 2 Fe₂O₃(s)',
    category: 'corrosion',
    narrative: 'Civil engineers inspecting suspension bridges must calculate how much iron is consumed by atmospheric oxidation. Rust expands up to six times the volume of the original iron, creating "rust jacking" forces that can crack concrete piers.',
    realWorldFact: 'Corrosion maintenance and prevention costs the global economy over $2.5 trillion dollars annually (about 3.4% of global GDP).',
    safetyOrTriviaNote: 'Unlike aluminum which forms a protective passive oxide film, iron oxide flakes off, continually exposing fresh metal to oxygen.',
    reactants: [
      { coefficient: 4, compound: { formula: 'Fe', name: 'Iron', molarMass: 55.85, state: '(s)' } },
      { coefficient: 3, compound: { formula: 'O₂', name: 'Oxygen Gas', molarMass: 32.00, state: '(g)' } },
    ],
    products: [
      { coefficient: 2, compound: { formula: 'Fe₂O₃', name: 'Iron(III) Oxide (Rust)', molarMass: 159.70, state: '(s)' } },
    ],
  },
  {
    id: 'antacid',
    title: 'Stomach Acid Neutralization',
    equationString: 'Mg(OH)₂(s) + 2 HCl(aq) → MgCl₂(aq) + 2 H₂O(l)',
    category: 'medicine',
    narrative: 'When gastric glands overproduce hydrochloric acid (HCl, pH ~1.5) causing heartburn, an oral suspension of magnesium hydroxide ("Milk of Magnesia") neutralizes excess hydronium ions into harmless water and magnesium chloride.',
    realWorldFact: 'Magnesium hydroxide has very low water solubility, allowing it to act as a gentle long-lasting buffer without causing alkaline spikes.',
    safetyOrTriviaNote: 'Calcium carbonate (CaCO₃, Tums) is another common antacid, but it generates CO₂ gas which can cause stomach bloating.',
    reactants: [
      { coefficient: 1, compound: { formula: 'Mg(OH)₂', name: 'Magnesium Hydroxide', molarMass: 58.33, state: '(s)' } },
      { coefficient: 2, compound: { formula: 'HCl', name: 'Hydrochloric Acid', molarMass: 36.46, state: '(aq)' } },
    ],
    products: [
      { coefficient: 1, compound: { formula: 'MgCl₂', name: 'Magnesium Chloride', molarMass: 95.21, state: '(aq)' } },
      { coefficient: 2, compound: { formula: 'H₂O', name: 'Water', molarMass: 18.02, state: '(l)' } },
    ],
  },
];

export const CURATED_SCENARIOS: StoichiometryProblem[] = [
  {
    id: 'prob_airbag_gg',
    scenarioTitle: 'Airbag Deployment Mass Calculation',
    category: 'safety',
    conversionType: 'gram-to-gram',
    reaction: SCENARIO_REACTIONS[0], // 2NaN3 -> 2Na + 3N2
    promptText: 'An automotive safety crash engineer designs a driver-side airbag requiring exactly 56.0 g of Nitrogen gas (N₂) to fully cushion an impact. What mass in grams of sodium azide (NaN₃) must be loaded into the inflator canister?',
    realWorldContext: 'Vehicle safety regulations mandate the airbag deploys and inflates in 35–45 milliseconds. Too little gas fails to protect the head; too much ruptures the nylon bag.',
    given: {
      amount: 56.0,
      unit: 'g',
      compound: { formula: 'N₂', name: 'Nitrogen Gas', molarMass: 28.02 },
    },
    target: {
      unit: 'g',
      compound: { formula: 'NaN₃', name: 'Sodium Azide', molarMass: 65.02 },
    },
    expectedSteps: [
      {
        stepIndex: 1,
        type: 'molar-mass-given',
        title: 'Grams N₂ → Moles N₂',
        explanation: 'Divide by the molar mass of N₂ (28.02 g/mol) so grams of N₂ cancel out.',
        numerator: { value: 1, unit: 'mol', compoundFormula: 'N₂' },
        denominator: { value: 28.02, unit: 'g', compoundFormula: 'N₂' },
      },
      {
        stepIndex: 2,
        type: 'mole-ratio',
        title: 'Moles N₂ → Moles NaN₃ (Mole Ratio)',
        explanation: 'Use the balanced coefficients from 2 NaN₃ → 2 Na + 3 N₂. There are 2 mol NaN₃ for every 3 mol N₂.',
        numerator: { value: 2, unit: 'mol', compoundFormula: 'NaN₃' },
        denominator: { value: 3, unit: 'mol', compoundFormula: 'N₂' },
      },
      {
        stepIndex: 3,
        type: 'molar-mass-target',
        title: 'Moles NaN₃ → Grams NaN₃',
        explanation: 'Multiply by the molar mass of NaN₃ (65.02 g/mol) so moles of NaN₃ cancel, leaving grams of NaN₃.',
        numerator: { value: 65.02, unit: 'g', compoundFormula: 'NaN₃' },
        denominator: { value: 1, unit: 'mol', compoundFormula: 'NaN₃' },
      },
    ],
    // 56.0 / 28.02 * (2 / 3) * 65.02 = 86.63 g
    finalAnswer: 86.63,
    hintLadder: [
      'Start with the given: 56.0 g of N₂.',
      'Step 1: Convert grams of N₂ to moles of N₂ using its molar mass (28.02 g/mol). Grams N₂ must be in the denominator to cancel!',
      'Step 2: Use the balanced chemical equation coefficients (2 NaN₃ : 3 N₂) to transition from N₂ to NaN₃.',
      'Step 3: Convert moles of NaN₃ into grams of NaN₃ using its molar mass (65.02 g/mol).',
    ],
  },
  {
    id: 'prob_rocket_gmol',
    scenarioTitle: 'Rocket Launch Oxidizer Ratio',
    category: 'space',
    conversionType: 'gram-to-mole',
    reaction: SCENARIO_REACTIONS[1], // 2H2 + O2 -> 2H2O
    promptText: 'A launch technician loads 400.0 g of liquid hydrogen fuel (H₂) into an orbital booster test stand. How many moles of liquid oxygen (O₂) are required for complete stoichiometric combustion with zero wasted fuel?',
    realWorldContext: 'Rockets operate at extreme mass limits. Every kilogram of surplus unburned oxidizer or propellant reduces scientific payload capacity.',
    given: {
      amount: 400.0,
      unit: 'g',
      compound: { formula: 'H₂', name: 'Hydrogen Gas', molarMass: 2.02 },
    },
    target: {
      unit: 'mol',
      compound: { formula: 'O₂', name: 'Oxygen Gas', molarMass: 32.00 },
    },
    expectedSteps: [
      {
        stepIndex: 1,
        type: 'molar-mass-given',
        title: 'Grams H₂ → Moles H₂',
        explanation: 'Divide by the molar mass of H₂ (2.02 g/mol) so grams of H₂ cancel.',
        numerator: { value: 1, unit: 'mol', compoundFormula: 'H₂' },
        denominator: { value: 2.02, unit: 'g', compoundFormula: 'H₂' },
      },
      {
        stepIndex: 2,
        type: 'mole-ratio',
        title: 'Moles H₂ → Moles O₂ (Mole Ratio)',
        explanation: 'From the balanced equation 2 H₂ + 1 O₂ → 2 H₂O, the ratio is 1 mol O₂ per 2 mol H₂.',
        numerator: { value: 1, unit: 'mol', compoundFormula: 'O₂' },
        denominator: { value: 2, unit: 'mol', compoundFormula: 'H₂' },
      },
    ],
    // 400.0 / 2.02 * (1 / 2) = 99.01 mol
    finalAnswer: 99.01,
    hintLadder: [
      'You are converting from Grams of H₂ to Moles of O₂.',
      'Check the Mole Roadmap: Grams A → Moles A → Moles B. This only takes 2 conversion steps!',
      'First step: use molar mass of H₂ (2.02 g/mol) in the denominator to reach moles of H₂.',
      'Second step: use the coefficient mole ratio (1 mol O₂ / 2 mol H₂) to finish in moles of O₂.',
    ],
  },
  {
    id: 'prob_photosynthesis_molg',
    scenarioTitle: 'Greenhouse Glucose Yield',
    category: 'biology',
    conversionType: 'mole-to-gram',
    reaction: SCENARIO_REACTIONS[2], // 6 CO2 + 6 H2O -> C6H12O6 + 6 O2
    promptText: 'A high-efficiency vertical hydroponic farm monitors tomato plants that absorb 2.50 moles of carbon dioxide (CO₂) from the climate chamber. How many grams of glucose (C₆H₁₂O₆) will the plants synthesize?',
    realWorldContext: 'Controlled environment agriculture uses enriched CO₂ atmospheres to accelerate carbohydrate synthesis and shorten crop harvest cycles.',
    given: {
      amount: 2.50,
      unit: 'mol',
      compound: { formula: 'CO₂', name: 'Carbon Dioxide', molarMass: 44.01 },
    },
    target: {
      unit: 'g',
      compound: { formula: 'C₆H₁₂O₆', name: 'Glucose', molarMass: 180.18 },
    },
    expectedSteps: [
      {
        stepIndex: 1,
        type: 'mole-ratio',
        title: 'Moles CO₂ → Moles C₆H₁₂O₆ (Mole Ratio)',
        explanation: 'According to 6 CO₂ + 6 H₂O → 1 C₆H₁₂O₆ + 6 O₂, 6 moles of CO₂ produce 1 mole of glucose.',
        numerator: { value: 1, unit: 'mol', compoundFormula: 'C₆H₁₂O₆' },
        denominator: { value: 6, unit: 'mol', compoundFormula: 'CO₂' },
      },
      {
        stepIndex: 2,
        type: 'molar-mass-target',
        title: 'Moles C₆H₁₂O₆ → Grams C₆H₁₂O₆',
        explanation: 'Multiply by the molar mass of glucose (180.18 g/mol) so moles cancel, yielding grams.',
        numerator: { value: 180.18, unit: 'g', compoundFormula: 'C₆H₁₂O₆' },
        denominator: { value: 1, unit: 'mol', compoundFormula: 'C₆H₁₂O₆' },
      },
    ],
    // 2.50 * (1 / 6) * 180.18 = 75.08 g
    finalAnswer: 75.08,
    hintLadder: [
      'Notice you are starting in MOLES of CO₂, not grams. You do not need to convert grams of given!',
      'Follow the Mole Roadmap: Moles A → Moles B → Grams B (2 steps total).',
      'Step 1: The mole ratio is 1 mol C₆H₁₂O₆ over 6 mol CO₂.',
      'Step 2: Multiply by molar mass of glucose (180.18 g/mol) to get grams.',
    ],
  },
  {
    id: 'prob_baking_molmol',
    scenarioTitle: 'Artisan Sourdough Oven Rise',
    category: 'culinary',
    conversionType: 'mole-to-mole',
    reaction: SCENARIO_REACTIONS[3], // 2 NaHCO3 -> Na2CO3 + H2O + CO2
    promptText: 'A master baker measures 0.750 moles of baking soda (NaHCO₃) into a specialized quick-bread batter recipe. How many moles of gaseous CO₂ will be generated in the oven to inflate the crumb structure?',
    realWorldContext: 'In baking, mole-to-mole conversions determine the volume of gas bubbles released, which directly dictates crumb porosity and loaf height.',
    given: {
      amount: 0.750,
      unit: 'mol',
      compound: { formula: 'NaHCO₃', name: 'Baking Soda', molarMass: 84.01 },
    },
    target: {
      unit: 'mol',
      compound: { formula: 'CO₂', name: 'Carbon Dioxide', molarMass: 44.01 },
    },
    expectedSteps: [
      {
        stepIndex: 1,
        type: 'mole-ratio',
        title: 'Moles NaHCO₃ → Moles CO₂ (Mole Ratio)',
        explanation: 'Use the coefficients: 2 mol NaHCO₃ produces 1 mol CO₂.',
        numerator: { value: 1, unit: 'mol', compoundFormula: 'CO₂' },
        denominator: { value: 2, unit: 'mol', compoundFormula: 'NaHCO₃' },
      },
    ],
    // 0.750 * (1 / 2) = 0.375 mol
    finalAnswer: 0.375,
    hintLadder: [
      'This is a direct Mole-to-Mole conversion! It requires just ONE single conversion factor.',
      'Check the Mole Roadmap: Moles A → Moles B. Only the balanced equation coefficients are used.',
      'From 2 NaHCO₃ → 1 CO₂, place 1 mol CO₂ on top and 2 mol NaHCO₃ on bottom so NaHCO₃ cancels.',
    ],
  },
  {
    id: 'prob_bridge_rust_gg',
    scenarioTitle: 'Suspension Bridge Cable Corrosion',
    category: 'corrosion',
    conversionType: 'gram-to-gram',
    reaction: SCENARIO_REACTIONS[4], // 4 Fe + 3 O2 -> 2 Fe2O3
    promptText: 'Maintenance inspectors scrape 112.0 g of oxidized iron (Fe) off a coastal suspension bridge hanger cable. What mass in grams of atmospheric oxygen gas (O₂) reacted to form this rust?',
    realWorldContext: 'Coastal salt spray accelerates the electrochemical corrosion of steel bridges. Calculating the consumed reactants helps predict the loss of tensile cable strength.',
    given: {
      amount: 112.0,
      unit: 'g',
      compound: { formula: 'Fe', name: 'Iron', molarMass: 55.85 },
    },
    target: {
      unit: 'g',
      compound: { formula: 'O₂', name: 'Oxygen Gas', molarMass: 32.00 },
    },
    expectedSteps: [
      {
        stepIndex: 1,
        type: 'molar-mass-given',
        title: 'Grams Fe → Moles Fe',
        explanation: 'Divide by the atomic molar mass of Fe (55.85 g/mol).',
        numerator: { value: 1, unit: 'mol', compoundFormula: 'Fe' },
        denominator: { value: 55.85, unit: 'g', compoundFormula: 'Fe' },
      },
      {
        stepIndex: 2,
        type: 'mole-ratio',
        title: 'Moles Fe → Moles O₂ (Mole Ratio)',
        explanation: 'From the balanced reaction 4 Fe + 3 O₂ → 2 Fe₂O₃, the ratio is 3 mol O₂ per 4 mol Fe.',
        numerator: { value: 3, unit: 'mol', compoundFormula: 'O₂' },
        denominator: { value: 4, unit: 'mol', compoundFormula: 'Fe' },
      },
      {
        stepIndex: 3,
        type: 'molar-mass-target',
        title: 'Moles O₂ → Grams O₂',
        explanation: 'Multiply by the molar mass of diatomic O₂ (32.00 g/mol).',
        numerator: { value: 32.00, unit: 'g', compoundFormula: 'O₂' },
        denominator: { value: 1, unit: 'mol', compoundFormula: 'O₂' },
      },
    ],
    // 112.0 / 55.85 * (3 / 4) * 32.00 = 48.13 g
    finalAnswer: 48.13,
    hintLadder: [
      'Grams of Fe → Moles of Fe → Moles of O₂ → Grams of O₂ (classic 3-step gram-to-gram problem).',
      'Step 1: 1 mol Fe / 55.85 g Fe.',
      'Step 2: 3 mol O₂ / 4 mol Fe.',
      'Step 3: 32.00 g O₂ / 1 mol O₂.',
    ],
  },
  {
    id: 'prob_antacid_gmol',
    scenarioTitle: 'Stomach Acid Tablet Neutralization',
    category: 'medicine',
    conversionType: 'gram-to-mole',
    reaction: SCENARIO_REACTIONS[5], // Mg(OH)2 + 2 HCl -> MgCl2 + 2 H2O
    promptText: 'A patient with severe acid reflux swallows a chewable antacid containing 1.50 g of magnesium hydroxide, Mg(OH)₂. How many moles of stomach hydrochloric acid (HCl) will this single tablet neutralize?',
    realWorldContext: 'Gastroenterologists use stoichiometric titration to calculate appropriate antacid dosages that neutralize excess acid without completely abolishing stomach acidity needed to kill pathogens.',
    given: {
      amount: 1.50,
      unit: 'g',
      compound: { formula: 'Mg(OH)₂', name: 'Magnesium Hydroxide', molarMass: 58.33 },
    },
    target: {
      unit: 'mol',
      compound: { formula: 'HCl', name: 'Hydrochloric Acid', molarMass: 36.46 },
    },
    expectedSteps: [
      {
        stepIndex: 1,
        type: 'molar-mass-given',
        title: 'Grams Mg(OH)₂ → Moles Mg(OH)₂',
        explanation: 'Divide by the molar mass of Mg(OH)₂ (58.33 g/mol).',
        numerator: { value: 1, unit: 'mol', compoundFormula: 'Mg(OH)₂' },
        denominator: { value: 58.33, unit: 'g', compoundFormula: 'Mg(OH)₂' },
      },
      {
        stepIndex: 2,
        type: 'mole-ratio',
        title: 'Moles Mg(OH)₂ → Moles HCl (Mole Ratio)',
        explanation: 'From 1 Mg(OH)₂ + 2 HCl → MgCl₂ + 2 H₂O, the ratio is 2 mol HCl per 1 mol Mg(OH)₂.',
        numerator: { value: 2, unit: 'mol', compoundFormula: 'HCl' },
        denominator: { value: 1, unit: 'mol', compoundFormula: 'Mg(OH)₂' },
      },
    ],
    // 1.50 / 58.33 * 2 = 0.0514 mol
    finalAnswer: 0.0514,
    hintLadder: [
      'Grams given → Moles given → Moles target (2 steps).',
      'Step 1: Cancel grams of Mg(OH)₂ by placing 58.33 g in the denominator.',
      'Step 2: Use the coefficient ratio: 2 mol HCl on top, 1 mol Mg(OH)₂ on bottom.',
    ],
  },
];

/**
 * Generate a randomized problem for practice sandbox or challenge mode
 */
export function generateRandomProblem(chosenType?: ConversionType): StoichiometryProblem {
  const reaction = SCENARIO_REACTIONS[Math.floor(Math.random() * SCENARIO_REACTIONS.length)];
  
  // Pick a reactant as given and a product as target (or vice-versa)
  const isGivenReactant = Math.random() > 0.3;
  const givenPool = isGivenReactant ? reaction.reactants : reaction.products;
  const targetPool = isGivenReactant ? reaction.products : reaction.reactants;

  const givenParticipant = givenPool[Math.floor(Math.random() * givenPool.length)];
  const targetParticipant = targetPool[Math.floor(Math.random() * targetPool.length)];

  const types: ConversionType[] = ['gram-to-gram', 'gram-to-mole', 'mole-to-gram', 'mole-to-mole'];
  const conversionType = chosenType || types[Math.floor(Math.random() * types.length)];

  let givenUnit: 'g' | 'mol' = 'g';
  let targetUnit: 'g' | 'mol' = 'g';

  if (conversionType === 'gram-to-gram') {
    givenUnit = 'g';
    targetUnit = 'g';
  } else if (conversionType === 'gram-to-mole') {
    givenUnit = 'g';
    targetUnit = 'mol';
  } else if (conversionType === 'mole-to-gram') {
    givenUnit = 'mol';
    targetUnit = 'g';
  } else {
    givenUnit = 'mol';
    targetUnit = 'mol';
  }

  // Realistic randomized starting amount
  const rawAmount = givenUnit === 'g' 
    ? (Math.floor(Math.random() * 80) + 10) * 2.5 
    : Number((Math.random() * 4 + 0.5).toFixed(2));
  const amount = Number(rawAmount.toFixed(1));

  // Compute expected steps
  const steps: ExpectedConversionStep[] = [];
  let currentMol = 0;

  if (givenUnit === 'g') {
    steps.push({
      stepIndex: steps.length + 1,
      type: 'molar-mass-given',
      title: `Grams ${givenParticipant.compound.formula} → Moles ${givenParticipant.compound.formula}`,
      explanation: `Divide by molar mass of ${givenParticipant.compound.formula} (${givenParticipant.compound.molarMass} g/mol).`,
      numerator: { value: 1, unit: 'mol', compoundFormula: givenParticipant.compound.formula },
      denominator: { value: givenParticipant.compound.molarMass, unit: 'g', compoundFormula: givenParticipant.compound.formula },
    });
    currentMol = amount / givenParticipant.compound.molarMass;
  } else {
    currentMol = amount;
  }

  // Mole ratio step
  steps.push({
    stepIndex: steps.length + 1,
    type: 'mole-ratio',
    title: `Moles ${givenParticipant.compound.formula} → Moles ${targetParticipant.compound.formula}`,
    explanation: `Use reaction ratio: ${targetParticipant.coefficient} mol ${targetParticipant.compound.formula} per ${givenParticipant.coefficient} mol ${givenParticipant.compound.formula}.`,
    numerator: { value: targetParticipant.coefficient, unit: 'mol', compoundFormula: targetParticipant.compound.formula },
    denominator: { value: givenParticipant.coefficient, unit: 'mol', compoundFormula: givenParticipant.compound.formula },
  });
  currentMol = currentMol * (targetParticipant.coefficient / givenParticipant.coefficient);

  let finalAnswer = currentMol;

  if (targetUnit === 'g') {
    steps.push({
      stepIndex: steps.length + 1,
      type: 'molar-mass-target',
      title: `Moles ${targetParticipant.compound.formula} → Grams ${targetParticipant.compound.formula}`,
      explanation: `Multiply by molar mass of ${targetParticipant.compound.formula} (${targetParticipant.compound.molarMass} g/mol).`,
      numerator: { value: targetParticipant.compound.molarMass, unit: 'g', compoundFormula: targetParticipant.compound.formula },
      denominator: { value: 1, unit: 'mol', compoundFormula: targetParticipant.compound.formula },
    });
    finalAnswer = currentMol * targetParticipant.compound.molarMass;
  }

  return {
    id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    scenarioTitle: `Custom Lab: ${reaction.title}`,
    category: reaction.category,
    conversionType,
    reaction,
    promptText: `Given ${amount} ${givenUnit} of ${givenParticipant.compound.name} (${givenParticipant.compound.formula}), calculate the expected yield in ${targetUnit} of ${targetParticipant.compound.name} (${targetParticipant.compound.formula}) in the reaction below.`,
    realWorldContext: reaction.narrative,
    given: {
      amount,
      unit: givenUnit,
      compound: givenParticipant.compound,
    },
    target: {
      unit: targetUnit,
      compound: targetParticipant.compound,
    },
    expectedSteps: steps,
    finalAnswer: Number(finalAnswer.toFixed(2)),
    hintLadder: [
      `Identify your starting unit: ${amount} ${givenUnit} of ${givenParticipant.compound.formula}.`,
      givenUnit === 'g' ? `First convert grams to moles using molar mass: ${givenParticipant.compound.molarMass} g/mol.` : 'You already start with moles, so proceed to the mole ratio.',
      `Use the balanced reaction ratio: ${targetParticipant.coefficient} mol ${targetParticipant.compound.formula} : ${givenParticipant.coefficient} mol ${givenParticipant.compound.formula}.`,
      targetUnit === 'g' ? `Finally, convert to grams using molar mass of ${targetParticipant.compound.formula}: ${targetParticipant.compound.molarMass} g/mol.` : 'Your answer finishes directly in moles.',
    ],
  };
}

/**
 * Generate candidate tiles for a problem:
 * 1. Molar Mass tiles: ALWAYS grams on top, 1 mol on bottom (student must flip when converting g -> mol).
 * 2. Mole-to-Mole ratio tiles: The substance that appears first in the reaction is placed on the bottom.
 * 3. Include extra distractor mole-mole ratios from the reaction that aren't needed.
 */
export function generateCandidateTiles(problem: StoichiometryProblem): ConversionFactorTile[] {
  const tiles: ConversionFactorTile[] = [];

  // Molar mass of given compound (ALWAYS grams on top, 1 mol on bottom)
  tiles.push({
    id: `tile_mm_given_${problem.given.compound.formula}`,
    title: `Molar Mass (${problem.given.compound.formula})`,
    type: 'molar-mass',
    numerator: { value: problem.given.compound.molarMass, unit: 'g', compoundFormula: problem.given.compound.formula },
    denominator: { value: 1, unit: 'mol', compoundFormula: problem.given.compound.formula },
  });

  // Molar mass of target compound (if different) (ALWAYS grams on top, 1 mol on bottom)
  if (problem.target.compound.formula.toLowerCase() !== problem.given.compound.formula.toLowerCase()) {
    tiles.push({
      id: `tile_mm_target_${problem.target.compound.formula}`,
      title: `Molar Mass (${problem.target.compound.formula})`,
      type: 'molar-mass',
      numerator: { value: problem.target.compound.molarMass, unit: 'g', compoundFormula: problem.target.compound.formula },
      denominator: { value: 1, unit: 'mol', compoundFormula: problem.target.compound.formula },
    });
  }

  const allParticipants = [...problem.reaction.reactants, ...problem.reaction.products];
  const getReactionOrderIndex = (formula: string) => {
    const idx = allParticipants.findIndex(
      p => p.compound.formula.trim().toLowerCase() === formula.trim().toLowerCase()
    );
    return idx >= 0 ? idx : 999;
  };

  // Mole ratio for the problem:
  // User rule: The substance that appears first in the reaction MUST be on the bottom (denominator).
  const expectedMoleStep = problem.expectedSteps.find(s => s.type === 'mole-ratio');
  if (expectedMoleStep) {
    const s1 = expectedMoleStep.numerator;
    const s2 = expectedMoleStep.denominator;
    const idx1 = getReactionOrderIndex(s1.compoundFormula);
    const idx2 = getReactionOrderIndex(s2.compoundFormula);

    // Whichever appears first in the reaction goes on the bottom (denominator)
    const firstInReaction = idx1 < idx2 ? s1 : s2;
    const secondInReaction = idx1 < idx2 ? s2 : s1;

    tiles.push({
      id: `tile_mole_ratio_main`,
      title: `Mole Ratio (${secondInReaction.compoundFormula} / ${firstInReaction.compoundFormula})`,
      type: 'mole-ratio',
      numerator: { ...secondInReaction },
      denominator: { ...firstInReaction },
    });
  }

  // Distractor mole-mole ratios from the balanced equation!
  // Same rule: The participant appearing first in the reaction is placed on the bottom.
  const givenFormula = problem.given.compound.formula.toLowerCase();
  const targetFormula = problem.target.compound.formula.toLowerCase();

  for (let i = 0; i < allParticipants.length; i++) {
    for (let j = i + 1; j < allParticipants.length; j++) {
      const p1 = allParticipants[i]; // appears first in reaction (i < j)
      const p2 = allParticipants[j]; // appears second in reaction
      const f1 = p1.compound.formula.toLowerCase();
      const f2 = p2.compound.formula.toLowerCase();

      // If this pair is NOT the exact given-target pair, add it as a distractor mole ratio
      const isExpectedPair = (f1 === givenFormula && f2 === targetFormula) || (f1 === targetFormula && f2 === givenFormula);
      if (!isExpectedPair && tiles.filter(t => t.type === 'distractor').length < 2) {
        tiles.push({
          id: `tile_distractor_ratio_${p2.compound.formula}_${p1.compound.formula}`,
          title: `Unneeded Mole Ratio (${p2.compound.formula} / ${p1.compound.formula})`,
          type: 'distractor',
          numerator: { value: p2.coefficient, unit: 'mol', compoundFormula: p2.compound.formula },
          denominator: { value: p1.coefficient, unit: 'mol', compoundFormula: p1.compound.formula }, // p1 is on the bottom
        });
      }
    }
  }

  // If there's a 3rd reagent, also add its molar mass with grams on top
  const unusedParticipant = allParticipants.find(
    p => p.compound.formula.toLowerCase() !== givenFormula && p.compound.formula.toLowerCase() !== targetFormula
  );
  if (unusedParticipant && tiles.length < 5) {
    tiles.push({
      id: `tile_mm_unused_${unusedParticipant.compound.formula}`,
      title: `Molar Mass (${unusedParticipant.compound.formula})`,
      type: 'distractor',
      numerator: { value: unusedParticipant.compound.molarMass, unit: 'g', compoundFormula: unusedParticipant.compound.formula },
      denominator: { value: 1, unit: 'mol', compoundFormula: unusedParticipant.compound.formula },
    });
  }

  // Shuffle candidate tiles so students pick the right ones
  return tiles.sort(() => 0.5 - Math.random());
}
