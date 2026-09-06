import { z } from 'zod';

export const kycSchema = z.object({
  bvn: z.string().length(11, 'BVN must be 11 digits').optional(),
  nin: z.string().length(11, 'NIN must be 11 digits').optional(),
  idDocumentUrl: z.string().url().optional(),
  selfieUrl: z.string().url().optional(),
  verificationProvider: z.string().optional(),
});

export const investorProfileSchema = z.object({
  nextOfKin: z.object({
    name: z.string().min(2),
    phone: z.string().min(10),
    relationship: z.string(),
  }).optional(),
  bankAccount: z.object({
    bankName: z.string(),
    accountNumber: z.string().min(10),
    accountName: z.string(),
  }).optional(),
  riskAcknowledgedAt: z.date().optional(),
});

export const businessProfileSchema = z.object({
  entityName: z.string().min(2),
  registrationNo: z.string().optional(),
  entityType: z.enum(['business', 'cooperative', 'association', 'diaspora_group']),
});