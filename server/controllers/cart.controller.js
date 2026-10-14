import { addItemSchema, draftAmountSchema } from '../validation/cart.validation.js';
import { getCart, addItem, updateItemDraftAmount, removeItem, clearCart } from '../services/cart.service.js';

export async function get(req, res, next) {
  try {
    const cart = await getCart(req.user.sub);
    res.json({ cart });
  } catch (err) { next(err); }
}

export async function add(req, res, next) {
  try {
    const parsed = addItemSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Validation failed', fieldErrors: parsed.error.flatten().fieldErrors });
    const cart = await addItem(req.user.sub, parsed.data.productId);
    res.status(201).json({ cart });
  } catch (err) { next(err); }
}

export async function updateDraft(req, res, next) {
  try {
    const parsed = draftAmountSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Validation failed', fieldErrors: parsed.error.flatten().fieldErrors });
    const cart = await updateItemDraftAmount(req.user.sub, req.params.itemId, parsed.data.draftAmount);
    res.json({ cart });
  } catch (err) { next(err); }
}

export async function remove(req, res, next) {
  try {
    const cart = await removeItem(req.user.sub, req.params.itemId);
    res.json({ cart });
  } catch (err) { next(err); }
}

export async function clear(req, res, next) {
  try {
    const cart = await clearCart(req.user.sub);
    res.json({ cart });
  } catch (err) { next(err); }
}