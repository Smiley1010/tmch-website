
const API_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

export function getToken() {
  return sessionStorage.getItem("tmch_cms_token");
}

export function getStoredUser() {
  try {
    return JSON.parse(
      sessionStorage.getItem("tmch_cms_user") || "null"
    );
  } catch {
    return null;
  }
}

export function signOut() {
  sessionStorage.removeItem("tmch_cms_token");
  sessionStorage.removeItem("tmch_cms_user");
  window.location.assign("/cms/login");
}

export async function apiRequest(path, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
    });
  } catch (error) {
    throw new Error(
      `Cannot connect to the CMS API at ${API_BASE}. ` +
      "Check that the backend is running on port 5000."
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed (${response.status}).`
    );
  }

  return data;
}
