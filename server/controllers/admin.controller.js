import { updateUserSchema, updateArtisanVisibilitySchema, consentActionSchema, settingSchema } from '../validation/admin.validation.js';
import { getAllUsers, updateUser, getAllProductsAdmin, getStats, getAuditLogs, getSettings, upsertSetting } from '../services/admin.service.js';
import { getAllArtisans, updateArtisanVisibility, getConsentRecords, actOnConsentRecord } from '../services/consent.service.js';

export async function usersList(req, res, next) {
  try {
    const { page, pageSize, role } = req.query;
    res.json(await getAllUsers({ page: Number(page) || 1, pageSize: Math.min(Number(pageSize) || 20, 100), role }));
  } catch (err) { next(err); }
}

export async function userUpdate(req, res, next) {
  try {
    const parsed = updateUserSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Validation failed', fieldErrors: parsed.error.flatten().fieldErrors });
    res.json({ user: await updateUser(req.params.id, req.user, parsed.data) });
  } catch (err) { next(err); }
}

export async function productsList(req, res, next) {
  try {
    const { page, pageSize, status, craft } = req.query;
    res.json(await getAllProductsAdmin({ page: Number(page) || 1, pageSize: Math.min(Number(pageSize) || 20, 100), status, craft }));
  } catch (err) { next(err); }
}

export async function stats(req, res, next) {
  try { res.json(await getStats()); } catch (err) { next(err); }
}

export async function auditLogs(req, res, next) {
  try {
    const { page, pageSize, action, entityType } = req.query;
    res.json(await getAuditLogs({ page: Number(page) || 1, pageSize: Math.min(Number(pageSize) || 30, 100), action, entityType }));
  } catch (err) { next(err); }
}

export async function settingsList(req, res, next) {
  try { res.json({ items: await getSettings() }); } catch (err) { next(err); }
}

export async function settingUpsert(req, res, next) {
  try {
    const parsed = settingSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Validation failed', fieldErrors: parsed.error.flatten().fieldErrors });
    res.json({ setting: await upsertSetting(req.params.key, parsed.data.value, req.user) });
  } catch (err) { next(err); }
}

export async function artisansList(req, res, next) {
  try {
    const { page, pageSize, consentStatus } = req.query;
    res.json(await getAllArtisans({ page: Number(page) || 1, pageSize: Math.min(Number(pageSize) || 20, 100), consentStatus }));
  } catch (err) { next(err); }
}

export async function artisanUpdate(req, res, next) {
  try {
    const parsed = updateArtisanVisibilitySchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Validation failed', fieldErrors: parsed.error.flatten().fieldErrors });
    res.json({ artisan: await updateArtisanVisibility(req.params.id, parsed.data, req.user) });
  } catch (err) { next(err); }
}

export async function consentRecordsList(req, res, next) {
  try {
    const { page, pageSize, status } = req.query;
    res.json(await getConsentRecords({ page: Number(page) || 1, pageSize: Math.min(Number(pageSize) || 20, 100), status }));
  } catch (err) { next(err); }
}

export async function consentRecordAction(req, res, next) {
  try {
    const parsed = consentActionSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Validation failed', fieldErrors: parsed.error.flatten().fieldErrors });
    res.json({ record: await actOnConsentRecord(req.params.id, req.user, parsed.data) });
  } catch (err) { next(err); }
}