import { z } from 'zod';

export const opportunitySchema = z.object({
  categoryId: z.string().cuid(),
  title: z.string().min(3).max(200),
  sponsorId: z.string().cuid().optional(),
  targetRaise: z.number().positive(),
  unitPrice: z.number().positive(),
  totalUnits: z.number().int().positive(),
  minInvestment: z.number().positive(),
  maxInvestment: z.number().positive().optional(),
  tenureMonths: z.number().int().positive(),
  projectedReturnPct: z.number().min(0).max(100),
  riskRating: z.enum(['low', 'medium', 'high']),
  backingType: z.string().optional(),
  useOfFunds: z.string().optional(),
});

export const opportunityStatusSchema = z.enum(['draft', 'under_review', 'listed', 'funding', 'funded', 'active', 'completed', 'defaulted']);

export const opportunityDocumentSchema = z.object({
  docType: z.enum(['memorandum', 'risk_disclosure', 'subscription_agreement', 'use_of_funds', 'return_projection', 'payment_schedule', 'exit_plan', 'site_photo', 'title_summary', 'valuation_report']),
  fileUrl: z.string().url(),
});