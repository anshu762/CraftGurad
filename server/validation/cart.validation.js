import { z } from 'zod';

export const addItemSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
});

export const draftAmountSchema = z.object({
  draftAmount: z.number().positive('Amount must be greater than zero').nullable(),
});