const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const TOKEN_STORAGE_KEY = 'cg_token';

// In-memory copy of the token, hydrated from localStorage at module load
// (i.e. before AuthContext's first /auth/me call fires), so every request
// made during the app's lifetime — including the very first one — can
// carry it. This is what makes auth work cross-origin regardless of
// browser cookie policy: the token travels as a normal header, not a cookie.
let authToken = null;
try {
  authToken = localStorage.getItem(TOKEN_STORAGE_KEY) || null;
} catch {
  authToken = null;
}

function setToken(token) {
  authToken = token || null;
  try {
    if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
    else localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    // localStorage unavailable (private browsing etc.) — token still works
    // in-memory for the current page session.
  }
}

function clearToken() {
  setToken(null);
}

function authHeaders() {
  return authToken ? { Authorization: `Bearer ${authToken}` } : {};
}

async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: body ? JSON.stringify(body) : undefined,
  });
  let data = null;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    const error = new Error(data?.error || 'Something went wrong. Please try again.');
    error.status = res.status;
    error.fieldErrors = data?.fieldErrors || null;
    throw error;
  }
  return data;
}

async function uploadRequest(path, formData) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: { ...authHeaders() },
    body: formData,
  });
  let data = null;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    const error = new Error(data?.error || 'Something went wrong. Please try again.');
    error.status = res.status;
    error.fieldErrors = data?.fieldErrors || null;
    throw error;
  }
  return data;
}

export const apiClient = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  delete: (path) => request(path, { method: 'DELETE' }),
  upload: (path, formData) => uploadRequest(path, formData),
  setToken,
  clearToken,
};