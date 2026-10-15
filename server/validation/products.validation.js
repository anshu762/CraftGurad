import { z } from 'zod';

const craftEnum = z.enum(['KASUTI', 'ILKAL']);

export const createProductSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(150),
  craft: craftEnum,
  description: z.string().trim().max(3000).optional().or(z.literal('')),
  story: z.string().trim().max(5000).optional().or(z.literal('')),
  material: z.string().trim().max(200).optional().or(z.literal('')),
  technique: z.string().trim().max(200).optional().or(z.literal('')),
  motif: z.string().trim().max(200).optional().or(z.literal('')),
  dimensions: z.string().trim().max(200).optional().or(z.literal('')),
  colour: z.string().trim().max(100).optional().or(z.literal('')),
  makingTimeApprox: z.string().trim().max(100).optional().or(z.literal('')),
  origin: z.string().trim().max(200).optional().or(z.literal('')),
  price: z.number().positive('Price must be greater than zero'),
  reservePrice: z.number().positive().nullable().optional(),
  provenance: z.string().trim().max(3000).optional().or(z.literal('')),
  shippingInfo: z.string().trim().max(1000).optional().or(z.literal('')),
  makerVisible: z.boolean().optional(),
  published: z.boolean().optional(),
});

export const updateProductSchema = createProductSchema.partial();

export const updateImageSchema = z.object({
  altText: z.string().trim().min(1).max(300).optional(),
  displayOrder: z.number().int().min(0).optional(),
});

export const reorderImagesSchema = z.object({
  order: z.array(z.string().min(1)).min(1),
});