import { z } from 'zod';

export const updateUserSchema = z.object({
  role: z.enum(['PUBLIC_VISITOR', 'BUYER', 'ARTISAN', 'EDITOR', 'ADMIN', 'SUPER_ADMIN']).optional(),
  isActive: z.boolean().optional(),
});

export const updateArtisanVisibilitySchema = z.object({
  consentStatus: z.enum(['PENDING', 'GRANTED', 'DENIED', 'REVOKED']).optional(),
  profileVisibility: z.boolean().optional(),
  contactVisibility: z.boolean().optional(),
});

export const consentActionSchema = z.object({
  action: z.enum(['GRANT', 'DENY', 'REVOKE']),
  notes: z.string().trim().max(1000).optional().or(z.literal('')),
  expiryDate: z.string().trim().optional().or(z.literal('')),
  restrictions: z.string().trim().max(500).optional().or(z.literal('')),
});

export const settingSchema = z.object({
  value: z.any(),
});