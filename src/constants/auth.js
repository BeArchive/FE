const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL;

export const AUTH_ENDPOINTS = {
  GOOGLE: `${AUTH_BASE_URL}/google`,
  KAKAO: `${AUTH_BASE_URL}/kakao`,
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
