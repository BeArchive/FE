import { redirect } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

// 로그인이 필요한 페이지 Loader
export const protectedLoader = () => {
  const { accessToken } = useAuthStore.getState();

  if (!accessToken) {
    alert('로그인이 필요한 서비스입니다.');
    return redirect('/login');
  }
  return null;
};

// 로그인한 사용자는 접근 불가 (로그인 페이지 등)
export const publicLoader = () => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    return redirect('/main');
  }
  return null;
};
