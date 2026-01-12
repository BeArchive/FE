const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AUTH_ENDPOINTS = {
  GOOGLE: `${API_BASE_URL}/oauth2/authorization/google`,
  KAKAO: `${API_BASE_URL}/oauth2/authorization/kakao`,
};

export const ROUTES = {
  MAIN: '/',
  LOGIN: '/login',
  OAUTH_CALLBACK: '/oauth/callback',
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
};
