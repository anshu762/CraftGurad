import jwt from 'jsonwebtoken';

/**
 * Verifies the session token and attaches the decoded payload to req.user.
 *
 * Token is accepted from either:
 *   1. `Authorization: Bearer <token>` header — primary mechanism. Works
 *      identically across browsers/origins because it is not subject to
 *      cookie SameSite/third-party-cookie policy at all.
 *   2. The httpOnly cookie — kept as a fallback for same-origin/local-dev
 *      convenience (e.g. hitting the API directly from a REST client).
 *
 * required: true  -> blocks the request with 401 if no valid session
 * required: false -> allows the request through with req.user = null
 */
export function authGuard({ required = true } = {}) {
  return (req, res, next) => {
    const cookieName = process.env.COOKIE_NAME || 'cg_session';
    const cookieToken = req.cookies?.[cookieName];

    const authHeader = req.headers.authorization || '';
    const headerToken = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7).trim()
      : null;

    const token = headerToken || cookieToken;

    if (!token) {
      if (required) return res.status(401).json({ error: 'Authentication required.' });
      req.user = null;
      return next();
    }

    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch {
      if (cookieToken) res.clearCookie(cookieName, { path: '/' });
      if (required) return res.status(401).json({ error: 'Session expired. Please log in again.' });
      req.user = null;
      next();
    }
  };
}