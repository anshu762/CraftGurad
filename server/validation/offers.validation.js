import { z } from 'zod';

export const submitOffersSchema = z.object({
  itemIds: z.array(z.string().min(1)).min(1, 'Select at least one item to submit an offer for'),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian phone number'),
  preferredContact: z.enum(['EMAIL', 'PHONE', 'WHATSAPP']).optional(),
  shippingLocation: z.string().trim().max(200).optional().or(z.literal('')),
  message: z.string().trim().max(1000).optional().or(z.literal('')),
  consentGiven: z.boolean().refine((v) => v === true, {
    message: 'You must consent to share your contact details with the artisan',
  }),
  termsAccepted: z.boolean().refine((v) => v === true, {
    message: 'You must accept the offer terms to continue',
  }),
});

export const offerActionSchema = z
  .object({
    action: z.enum(['ACCEPT', 'REJECT', 'COUNTER']),
    counterAmount: z.number().positive('Counter amount must be greater than zero').optional(),
    reason: z.string().trim().max(500).optional().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    if (data.action === 'COUNTER' && !data.counterAmount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Counter amount is required',
        path: ['counterAmount'],
      });
    }
  });