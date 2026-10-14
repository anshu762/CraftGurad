import { registerSchema, loginSchema } from '../validation/auth.validation.js';
import { createUser, verifyCredentials, signToken, toPublicUser, getUserById } from '../services/auth.service.js';

const COOKIE_NAME = process.env.COOKIE_NAME || 'cg_session';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

function setAuthCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

export async function register(req, res, next) {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation failed', fieldErrors: parsed.error.flatten().fieldErrors });
    }
    const user = await createUser(parsed.data);
    const token = signToken(user);
    setAuthCookie(res, token);
    res.status(201).json({ user: toPublicUser(user) });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation failed', fieldErrors: parsed.error.flatten().fieldErrors });
    }
    const user = await verifyCredentials(parsed.data.email, parsed.data.password);
    const token = signToken(user);
    setAuthCookie(res, token);
    res.json({ user: toPublicUser(user) });
  } catch (err) {
    next(err);
  }
}

export function logout(req, res) {
  res.clearCookie(COOKIE_NAME, { path: '/' });
  res.json({ message: 'Logged out successfully.' });
}

export async function me(req, res, next) {
  try {
    const user = await getUserById(req.user.sub);
    if (!user || !user.isActive) return res.status(401).json({ error: 'Not authenticated' });
    res.json({ user: toPublicUser(user) });
  } catch (err) {
    next(err);
  }
}