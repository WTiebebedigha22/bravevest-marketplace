import { z } from 'zod';

export const subscriptionSchema = z.object({
  opportunityId: z.string().cuid(),
  units: z.number().int().positive(),
  amount: z.number().positive(),
});

export const subscriptionStatusSchema = z.enum(['pending', 'active', 'matured', 'defaulted']);