
export interface SimulationResult {
  month: number;
  interest: number;
  totalInvested: number;
  totalInterest: number;
  totalAmount: number;
}

export interface SimulationSummary {
  totalAmount: number;
  totalInvested: number;
  totalInterest: number;
  results: SimulationResult[];
}

export type PeriodType = 'monthly' | 'yearly';
export type RateType = 'monthly' | 'yearly';

export interface SimulationInputs {
  initialValue: number;
  monthlyValue: number;
  interestRate: number;
  period: number;
  rateType: RateType;
  periodType: PeriodType;
}
