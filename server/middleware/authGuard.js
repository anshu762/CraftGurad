import jwt from 'jsonwebtoken';

/**
 * Verifies the session cookie and attaches the decoded payload to req.user.
 * required: true  -> blocks the request with 401 if no valid session
 * required: false -> allows the request through with req.user = null
 */
export function authGuard({ required = true } = {}) {
  return (req, res, next) => {
    const cookieName = process.env.COOKIE_NAME || 'cg_session';
    const token = req.cookies?.[cookieName];

    if (!token) {
      if (required) return res.status(401).json({ error: 'Authentication required.' });
      req.user = null;
      return next();
    }

    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch {
      res.clearCookie(cookieName, { path: '/' });
      if (required) return res.status(401).json({ error: 'Session expired. Please log in again.' });
      req.user = null;
      next();
    }
  };
}