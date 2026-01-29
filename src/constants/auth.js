const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL;

// 로컬 개발 환경인지
const isLocal = window.location.hostname === 'localhost';
const authState = isLocal ? 'local' : 'deploy';

export const AUTH_ENDPOINTS = {
  GOOGLE: `${AUTH_BASE_URL}/google?state=${authState}`,
  KAKAO: `${AUTH_BASE_URL}/kakao?state=${authState}`,
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
