import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import useNavigation from '../../hooks/useNavigation';

const SocialCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const { goTo } = useNavigation();

  useEffect(() => {
    // URL에서 토큰 추출
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken && refreshToken) {
      // LocalStorage에 토큰 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      goTo('/', { replace: true });
    } else {
      console.error('인증 토큰을 찾을 수 없습니다.');
      goTo('/login');
    }
  }, [searchParams, goTo]);

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen bg-primary-0 p-50">
      <div className="flex flex-col items-center justify-center w-612 h-498 bg-white rounded-24 shadow-sub">
        <Spinner />
        <p className="mt-10 text-primary-main">환영합니다</p>
      </div>
    </div>
  );
};

export default SocialCallbackPage;
