import { z } from 'zod';

export const fundWalletSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().default('NGN'),
});

export const withdrawSchema = z.object({
  amount: z.number().positive(),
  bankAccount: z.object({
    bankCode: z.string(),
    accountNumber: z.string().min(10),
    accountName: z.string(),
  }),
});

export const transactionSchema = z.object({
  type: z.enum(['deposit', 'withdrawal', 'subscription', 'payout', 'fee']),
  amount: z.number(),
  reference: z.string(),
  balanceAfter: z.number(),
  relatedEntityType: z.string().optional(),
  relatedEntityId: z.string().optional(),
});