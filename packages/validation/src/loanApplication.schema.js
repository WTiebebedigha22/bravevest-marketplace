import { z } from 'zod';

export const loanApplicationSchema = z.object({
  productType: z.enum(['sme', 'salary_backed', 'asset_backed', 'working_capital', 'invoice', 'trade_finance']),
  requestedAmount: z.number().positive(),
  tenureMonths: z.number().int().positive().max(60),
  purpose: z.string().optional(),
});

export const repaymentSchema = z.object({
  dueDate: z.date(),
  amount: z.number().positive(),
  paidStatus: z.boolean().default(false),
});

export const creditAssessmentSchema = z.object({
  bureauRef: z.string().optional(),
  creditScore: z.number().int().min(0).max(999).optional(),
  dtiRatio: z.number().min(0).max(1).optional(),
});