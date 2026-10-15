import { updateProfileSchema, consentRequestSchema } from '../validation/artisans.validation.js';
import { getMyProfile, updateMyProfile, uploadMyPortrait, requestConsent } from '../services/artisans.service.js';

export async function me(req, res, next) {
  try {
    const profile = await getMyProfile(req.user.sub);
    res.json({ profile });
  } catch (err) { next(err); }
}

export async function updateMe(req, res, next) {
  try {
    const parsed = updateProfileSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Validation failed', fieldErrors: parsed.error.flatten().fieldErrors });
    const profile = await updateMyProfile(req.user.sub, parsed.data);
    res.json({ profile });
  } catch (err) { next(err); }
}

export async function uploadPortrait(req, res, next) {
  try {
    const profile = await uploadMyPortrait(req.user.sub, req.file);
    res.status(201).json({ profile });
  } catch (err) { next(err); }
}

export async function requestConsentCtrl(req, res, next) {
  try {
    const parsed = consentRequestSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Validation failed', fieldErrors: parsed.error.flatten().fieldErrors });
    const profile = await requestConsent(req.user.sub, parsed.data.consentType);
    res.status(201).json({ profile });
  } catch (err) { next(err); }
}