let API_BASE_URL, API_SUBPATH;

if (typeof window !== 'undefined' && window.APP_CONFIG) {
  API_BASE_URL = window.APP_CONFIG.API_BASE_URL || null;
  API_SUBPATH = window.APP_CONFIG.API_SUBPATH || '/api';
} else {
  API_BASE_URL = null;
  API_SUBPATH = null;
}

export { API_BASE_URL, API_SUBPATH };

export const getApiUrl = (endpoint) => {
  if (API_BASE_URL && API_SUBPATH) {
    return `${API_BASE_URL}${API_SUBPATH}${endpoint}`;
  } else if (API_SUBPATH) {
    return `${API_SUBPATH}${endpoint}`;
  }
  return endpoint;
};
