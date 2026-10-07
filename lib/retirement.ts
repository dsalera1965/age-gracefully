export type RetirementInput = {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  annualSavings: number;
  annualIncome: number;
  annualExpenses: number;
  expectedReturn: number;
  inflation: number;
};

export const defaultRetirementInput: RetirementInput = {
  currentAge: 35,
  retirementAge: 65,
  currentSavings: 120000,
  annualSavings: 20000,
  annualIncome: 120000,
  annualExpenses: 65000,
  expectedReturn: 7,
  inflation: 3,
};

export type RetirementResults = {
  yearsToRetirement: number;
  projectedNestEgg: number;
  annualRetirementNeed: number;
  targetNestEgg: number;
  gap: number;
  retirementScore: number;
  projectedMonthlyIncome: number;
  recommendedAnnualSavings: number;
  recommendedMonthlySavings: number;
};

export function calculateRetirementPlan(input: RetirementInput): RetirementResults {
  const yearsToRetirement = Math.max(input.retirementAge - input.currentAge, 1);

  const inflationFactor = Math.pow(1 + input.inflation / 100, yearsToRetirement);
  const annualRetirementNeed = input.annualExpenses * inflationFactor * 0.9;
  const targetNestEgg = annualRetirementNeed / 0.04;

  const projectedNestEgg =
    input.currentSavings * Math.pow(1 + input.expectedReturn / 100, yearsToRetirement) +
    input.annualSavings * ((Math.pow(1 + input.expectedReturn / 100, yearsToRetirement) - 1) / (input.expectedReturn / 100));

  const gap = Math.max(0, targetNestEgg - projectedNestEgg);
  const retirementScore = Math.min(100, Math.max(0, Math.round((projectedNestEgg / targetNestEgg) * 100)));

  const projectedMonthlyIncome = annualRetirementNeed / 12;

  const shortfall = Math.max(0, targetNestEgg - projectedNestEgg);
  const annualFactor =
    (Math.pow(1 + input.expectedReturn / 100, yearsToRetirement) - 1) / (input.expectedReturn / 100);
  const recommendedAnnualSavings = shortfall > 0 ? shortfall / Math.max(annualFactor, 1) : 0;

  return {
    yearsToRetirement,
    projectedNestEgg,
    annualRetirementNeed,
    targetNestEgg,
    gap,
    retirementScore,
    projectedMonthlyIncome,
    recommendedAnnualSavings,
    recommendedMonthlySavings: recommendedAnnualSavings / 12,
  };
}
