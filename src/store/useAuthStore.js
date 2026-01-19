import { create } from 'zustand';
import { STORAGE_KEYS } from '../constants/auth';

const useAuthStore = create((set) => ({
  // 로컬 스토리지에 토큰이 있는지 확인
  isLoggedIn: !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),

  // 로그인
  login: (accessToken, refreshToken) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    set({ isLoggedIn: true });
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    set({ isLoggedIn: false });
  },
}));

export default useAuthStore;
