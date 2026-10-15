import { z } from 'zod';

export const updateProfileSchema = z.object({
  publicDisplayName: z.string().trim().max(100).optional().or(z.literal('')),
  location: z.string().trim().max(150).optional().or(z.literal('')),
  biography: z.string().trim().max(2000).optional().or(z.literal('')),
  craftAssociation: z.enum(['KASUTI', 'ILKAL']).nullable().optional(),
});

export const consentRequestSchema = z.object({
  consentType: z.enum(['PORTRAIT', 'QUOTE', 'NAME', 'LOCATION', 'PRODUCT_ATTRIBUTION']),
});