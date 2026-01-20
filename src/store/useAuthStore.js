import { create } from 'zustand';
import { STORAGE_KEYS } from '../constants/auth';

const useAuthStore = create((set) => ({
  // 상태에 토큰 값 저장
  accessToken: localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
  isLoggedIn: !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),

  // 로그인
  login: (accessToken, refreshToken) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

    set({ isLoggedIn: true, accessToken });
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);

    set({ isLoggedIn: false, accessToken: null });
  },
}));

export default useAuthStore;
