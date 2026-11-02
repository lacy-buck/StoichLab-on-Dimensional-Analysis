# StoichioLab: Interactive Chemistry Stoichiometry & Dimensional Analysis Explorer

StoichioLab is an interactive high school chemistry learning application designed to demystify stoichiometry and dimensional analysis. Through story-driven real-world scenarios, a visual Mole Roadmap, and a tactile fraction-tile builder with live unit cancellation, students master gram-to-gram, gram-to-mole, mole-to-gram, and mole-to-mole conversions.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed during clarification and will govern the application architecture:
> - **Dimensional Analysis Construction**: **Hybrid Mode** supporting both draggable fraction tiles (with flip/invert actions) and direct numeric keypad entry for maximum flexibility.
> - **Mode Structure**: Three integrated learning modes:
>   1. **Story-Driven Scenarios**: Mission-based real-world cases (airbag deployment, rocket launch, photosynthesis, bread leavening, ocean iron rust, antacid neutralization).
>   2. **Free Practice Sandbox**: Step-by-step custom problem generator covering all 4 conversion categories (g→g, g→mol, mol→g, mol→mol) with customizable reaction parameters.
>   3. **Timed Challenge Mode**: Fast-paced stoichiometry mastery sprint with streak multipliers and instant error analysis.
> - **Primary Learning Helper**: **Interactive Visual Mole Roadmap** that dynamically highlights the active conversion path and shows required conversion factors (molar mass A, mole ratio B/A, molar mass B).

---

## 1. Overview & Core Concept

### What It Does
StoichioLab breaks down the intimidating multi-step process of chemical stoichiometry into intuitive, modular dimensional analysis steps. Students connect starting quantities to target quantities by stringing together conversion fractions:
$$\text{Starting Given} \times \left[\frac{\text{Numerator}}{\text{Denominator}}\right] \times \left[\frac{\text{Numerator}}{\text{Denominator}}\right] = \text{Target Product}$$
When matching units meet across the diagonal numerator and denominator, animated cancellation strike-throughs visually prove that the student's dimensional setup is correct before computing the final arithmetic.

### Target Audience & Persona
High school chemistry students (grades 9–12) encountering stoichiometry for the first time, AP Chemistry beginners reviewing foundation concepts, and science educators seeking an interactive whiteboard/individualized practice tool.

### Key Value Delivered
- Eliminates "number grabbing" confusion by enforcing unit-first thinking.
- Bridges abstract math with real-world chemistry context (e.g. "How many grams of sodium azide $NaN_3$ must detonate in 40 milliseconds to fill an automobile airbag with 67 liters of nitrogen gas?").
- Provides instant diagnostic feedback when inverted fractions (e.g., placing grams over moles instead of moles over grams) break unit cancellation.

---

## 2. User Experience & Visual Design

### Key User Flows

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. Home / Mode Selection (Story Scenarios | Practice Sandbox | Challenge)   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 2. Problem Setup & Reaction Deck                                            │
│    - Balanced chemical equation with interactive stoichiometric coefficients│
│    - Given quantity & desired target compound                               │
│    - Visual Mole Roadmap highlighting the conversion journey                │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 3. Interactive Dimensional Analysis Stage                                   │
│    - Step 1: Place starting given quantity and unit                         │
│    - Step 2..N: Drag conversion tiles OR enter values into fraction brackets│
│    - Unit Cancellation: Visual strike-through triggers when units align     │
│    - Live arithmetic preview with significant figures and decimal checks    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 4. Outcome & Reaction Verification                                          │
│    - Particle count or physical simulation visual feedback                  │
│    - Concept summary explaining the "Why" behind the reaction               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Visual Identity & Theme
- **Aesthetic Direction**: Crisp, modern scientific laboratory workbench meeting high-legibility educational design. Clean, airy, and inviting without childish cartoons or generic dark cyberpunk tropes.
- **Color Palette & Discipline (60-30-10)**:
  - **60% Dominant Canvas**: Clean lab off-white (`#F8FAFC` slate-50 canvas, `#FFFFFF` card surfaces).
  - **30% Structural Panels**: Hairline borders (`#E2E8F0` slate-200), slate typography (`#0F172A` headers, `#475569` body), and muted roadmap pathways (`#CBD5E1`).
  - **10% Semantic Focal Accents**:
    - **Azure / Royal Blue (`#2563EB`)**: Active stage steps, interactive coefficients, and primary CTAs.
    - **Teal / Emerald (`#059669`)**: Successful unit cancellations, balanced reactions, and verified answers.
    - **Amber / Coral (`#D97706` / `#DC2626`)**: Unit mismatch warnings and inverted fraction alerts.
    - **Purple / Indigo (`#7C3AED`)**: Mole-to-mole bridge ratio highlights.
- **Typography & Hierarchy**:
  - **Display / Section Titles**: `Plus Jakarta Sans` (or system geometric sans), font-semibold, tracking-tight.
  - **Chemical Formulas & Math**: Clean monospace / tabular numerals (`font-mono tabular-nums`) for coefficients, subscripts, and molar masses.
- **Top Bar Contract**:
  - **Zone 1 (Brand)**: `StoichioLab` (clean single-line wordmark with molecular subscript badge).
  - **Zone 2 (Nav Links)**: `Scenarios` · `Practice Sandbox` · `Timed Challenge` · `Mole Roadmap` · `Periodic Masses`.
  - **Zone 3 (Action)**: `New Problem` or `Reset Workspace` primary button.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Hybrid Fraction Tile + Direct Input System
- **Chosen Approach**: Students can either drag pre-built conversion factor tiles (with a 1-click "Flip / Invert $\frac{A}{B} \leftrightarrow \frac{B}{A}$" button) into fraction slots, OR toggle "Direct Input" to type numbers and select compound units from dropdowns.
- **Why**: Draggable tiles build muscle memory and spatial reasoning for beginners who struggle with fraction layout; direct entry allows faster solving for advancing students.
- **Alternatives Considered**: Direct typing only (frustrating on mobile/touch, high syntax error rate); fixed drag-and-drop only (can feel overly constrained once students understand the concept).

### Decision 2: The Live "Mole Roadmap" Anchor
- **Chosen Approach**: A sticky or collapsible top visual diagram depicting the classic Chemistry Mole Map:
  $$\text{Grams of A} \xrightarrow{\div \text{Molar Mass A}} \text{Moles of A} \xrightarrow{\times \frac{\text{Coeff B}}{\text{Coeff A}}} \text{Moles of B} \xrightarrow{\times \text{Molar Mass B}} \text{Grams of B}$$
  The roadmap illuminates the exact node and transition edge active in the current problem step.
- **Why**: Stoichiometry errors usually stem from students getting lost in the sequence. Visualizing the map grounds the dimensional analysis in a physical journey.

### Decision 3: Curated Real-World Reaction Mission Library
- **Chosen Approach**: Pre-bundle rich, scientifically accurate real-world scenarios:
  1. *Automotive Safety*: Sodium Azide decomposition in vehicle airbags ($2NaN_3 \to 2Na + 3N_2$)
  2. *Spaceflight Propulsion*: Liquid Hydrogen & Oxygen rocket ignition ($2H_2 + O_2 \to 2H_2O$)
  3. *Cellular Biology*: Plant photosynthesis and glucose synthesis ($6CO_2 + 6H_2O \to C_6H_{12}O_6 + 6O_2$)
  4. *Culinary Science*: Thermal decomposition of baking soda in bread ($2NaHCO_3 \to Na_2CO_3 + H_2O + CO_2$)
  5. *Infrastructure Corrosion*: Rusting of suspension bridge steel ($4Fe + 3O_2 \to 2Fe_2O_3$)
  6. *Medicine & Physiology*: Stomach acid neutralization by Milk of Magnesia ($Mg(OH)_2 + 2HCl \to MgCl_2 + 2H_2O$)
- **Why**: Real applications answer "Why do I need to learn this?" and demonstrate how chemical calculations prevent airbag over-inflation or rocket fuel waste.

---

## 4. Technical Architecture & Component Structure

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                 App.tsx                                     │
│  - Active Mode: 'scenarios' | 'sandbox' | 'challenge'                       │
│  - Active Problem State (Equation, Given, Target, Steps, User Inputs)       │
│  - Scoring, Streak, and Mastery Stats                                       │
└───────┬──────────────────────┬────────────────────────┬─────────────────────┘
        │                      │                        │
        ▼                      ▼                        ▼
┌──────────────────┐  ┌──────────────────┐  ┌─────────────────────────────────┐
│ Top Navigation   │  │ Mole Roadmap Bar │  │ Periodic Molar Mass Drawer      │
│ - Brand wordmark │  │ - Node states    │  │ - Quick search elements         │
│ - Mode switcher  │  │ - Transition arc │  │ - Molar mass calculation helper │
│ - Score & streak │  │ - Active step    │  │                                 │
└──────────────────┘  └──────────────────┘  └─────────────────────────────────┘
                               │
        ┌──────────────────────┴────────────────────────┐
        ▼                                               ▼
┌──────────────────────────────────┐  ┌───────────────────────────────────────┐
│ Chemical Reaction Card           │  │ Dimensional Analysis Workspace        │
│ - Balanced Equation Display      │  │ - Initial Given Slot                  │
│ - Scenario Narrative & Context   │  │ - Chain of Fraction Slots [Num / Den] │
│ - Reagent Molar Masses & Ratios  │  │ - Available Tile Palette (Draggable)  │
│ - Reaction Type & Safety Note    │  │ - Live Unit Cancellation Overlay      │
│                                  │  │ - Calculate & Verification Engine     │
└──────────────────────────────────┘  └───────────────────────────────────────┘
```

### Core Entities & State Model
- **`ChemicalCompound`**: Formula string, display name, molar mass (g/mol), constituent elements breakdown.
- **`BalancedEquation`**: Reactants array with coefficients, products array with coefficients, reaction name, description, real-world narrative.
- **`StoichiometryProblem`**:
  - `id`: Unique identifier
  - `scenarioTitle`: e.g. "Airbag Deployment Safety"
  - `scenarioCategory`: 'safety' | 'space' | 'culinary' | 'nature' | 'medicine'
  - `equation`: `BalancedEquation`
  - `conversionType`: `'gram-to-gram' | 'gram-to-mole' | 'mole-to-gram' | 'mole-to-mole'`
  - `given`: `{ amount: number, unit: 'g' | 'mol', compound: ChemicalCompound }`
  - `target`: `{ unit: 'g' | 'mol', compound: ChemicalCompound }`
  - `expectedSteps`: Array of conversion factors needed
  - `solutionValue`: Calculated numeric answer
- **`WorkspaceFractionSlot`**:
  - `numerator`: `{ value: number | string, unit: string, compound: string }`
  - `denominator`: `{ value: number | string, unit: string, compound: string }`
  - `isCorrect`: boolean | null

### Interactive Feedback & Verification Engine
- **Diagonal Unit Cancellation**: Whenever `slot[i].numerator.unit + compound === slot[i+1].denominator.unit + compound`, an SVG diagonal slash appears across both labels, accompanied by a subtle emerald pulse.
- **Inverted Fraction Detector**: If a student places molar mass inverted (e.g., $65.02\text{ g } NaN_3 / 1\text{ mol } NaN_3$ when multiplying from grams), the app detects that grams are adjacent to grams and suggests: *"Invert this fraction so grams cancel out."*
- **Significant Figures & Tolerance**: Tolerates $\pm 1\%$ rounding variance while reinforcing standard 3-significant-figure precision.

---

## 5. Implementation Steps Summary

1. **Setup & Types (`src/types/chemistry.ts`)**: Define chemical equations, compounds, problem schemas, conversion types, and tile definitions.
2. **Chemistry Engine & Scenarios (`src/data/scenarios.ts` & `src/utils/chemistry.ts`)**: Balanced reactions for all 6 scenarios, molar mass calculator, auto-generator for randomized sandbox practice problems.
3. **Visual Mole Roadmap (`src/components/MoleRoadmap.tsx`)**: Interactive animated diagram highlighting the pathway from Given to Target with current step indicator.
4. **Dimensional Analysis Workspace (`src/components/DimensionalAnalysis.tsx`)**:
   - Starting value box
   - Fraction bracket builder with numerator and denominator drop zones / inputs
   - Flip/invert toggle button on tiles
   - Live diagonal strike-through unit cancellation lines
   - Real-time arithmetic evaluation
5. **Periodic Reference & Molar Mass Drawer (`src/components/PeriodicTableDrawer.tsx`)**: Quick access to atomic masses ($H=1.008, C=12.011, N=14.007, O=15.999$, etc.) and formula calculator.
6. **Scenario Explorer, Sandbox & Challenge Game Loops**: Mode selection, progress tracking, hints, celebration confetti/sound cues, and detailed solution walk-throughs.
7. **Verification & Testing**: Build check, responsive layout verification, zero dead handlers.
