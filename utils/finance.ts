
import { SimulationInputs, SimulationSummary, SimulationResult } from '../types';

export const calculateCompoundInterest = (inputs: SimulationInputs): SimulationSummary => {
  const { initialValue, monthlyValue, interestRate, period, rateType, periodType } = inputs;

  // Convert period to months
  const totalMonths = periodType === 'yearly' ? period * 12 : period;

  // Convert rate to decimal monthly rate
  let monthlyRate: number;
  if (rateType === 'yearly') {
    // Equivalent monthly rate from annual: (1 + i_a)^(1/12) - 1
    monthlyRate = Math.pow(1 + interestRate / 100, 1 / 12) - 1;
  } else {
    monthlyRate = interestRate / 100;
  }

  const results: SimulationResult[] = [];
  let currentBalance = initialValue;
  let totalInvested = initialValue;
  let accumulatedInterest = 0;

  // Initial state (Month 0)
  results.push({
    month: 0,
    interest: 0,
    totalInvested: initialValue,
    totalInterest: 0,
    totalAmount: initialValue,
  });

  for (let m = 1; m <= totalMonths; m++) {
    const interestThisMonth = currentBalance * monthlyRate;
    accumulatedInterest += interestThisMonth;
    totalInvested += monthlyValue;
    currentBalance = currentBalance + interestThisMonth + monthlyValue;

    results.push({
      month: m,
      interest: interestThisMonth,
      totalInvested: totalInvested,
      totalInterest: accumulatedInterest,
      totalAmount: currentBalance,
    });
  }

  return {
    totalAmount: currentBalance,
    totalInvested: totalInvested,
    totalInterest: accumulatedInterest,
    results: results,
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
