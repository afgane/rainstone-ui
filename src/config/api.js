let API_BASE_URL, API_SUBPATH, BASE_URL;

if (typeof window !== 'undefined' && window.APP_CONFIG) {
  API_BASE_URL = window.APP_CONFIG.API_BASE_URL || null;
  API_SUBPATH = window.APP_CONFIG.API_SUBPATH || '/api';
  BASE_URL = window.APP_CONFIG.BASE_URL || '/';
} else {
  API_BASE_URL = null;
  API_SUBPATH = null;
  BASE_URL = '/';
}

export { API_BASE_URL, API_SUBPATH, BASE_URL };

export const getApiUrl = (endpoint) => {
  if (API_BASE_URL && API_SUBPATH) {
    return `${API_BASE_URL}${API_SUBPATH}${endpoint}`;
  } else if (API_SUBPATH) {
    return `${API_SUBPATH}${endpoint}`;
  }
  return endpoint;
};
