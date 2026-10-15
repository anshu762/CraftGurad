import { submitOffersSchema, offerActionSchema } from '../validation/offers.validation.js';
import {
  submitOffers,
  getOffersForProductViewer,
  getMyOffers,
  performOfferAction,
  getOfferEventsFull,
  getAllOffersForAdmin,
} from '../services/offers.service.js';

export async function submit(req, res, next) {
  try {
    const parsed = submitOffersSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Validation failed', fieldErrors: parsed.error.flatten().fieldErrors });
    const result = await submitOffers(req.user.sub, parsed.data);
    res.status(201).json(result);
  } catch (err) { next(err); }
}

export async function forProduct(req, res, next) {
  try {
    const result = await getOffersForProductViewer(req.params.slug, req.user || null);
    res.json(result);
  } catch (err) { next(err); }
}

export async function mine(req, res, next) {
  try {
    const items = await getMyOffers(req.user.email);
    res.json({ items });
  } catch (err) { next(err); }
}

export async function action(req, res, next) {
  try {
    const parsed = offerActionSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Validation failed', fieldErrors: parsed.error.flatten().fieldErrors });
    const offer = await performOfferAction(req.params.id, req.user, parsed.data);
    res.json({ offer });
  } catch (err) { next(err); }
}

export async function events(req, res, next) {
  try {
    const items = await getOfferEventsFull(req.params.id, req.user);
    res.json({ items });
  } catch (err) { next(err); }
}

export async function adminList(req, res, next) {
  try {
    const { page, pageSize, status } = req.query;
    const result = await getAllOffersForAdmin({
      page: Number(page) || 1,
      pageSize: Math.min(Number(pageSize) || 20, 100),
      status,
    });
    res.json(result);
  } catch (err) { next(err); }
}