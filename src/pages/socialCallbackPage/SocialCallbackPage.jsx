import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useNavigation from '../../hooks/useNavigation';
import { ROUTES } from '../../constants/auth';
import useAuthStore from '../../store/useAuthStore';
import Spinner from '../../components/Spinner';

const SocialCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const { goTo } = useNavigation();
  const { login } = useAuthStore();

  useEffect(() => {
    // URL에서 토큰 추출
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken && refreshToken) {
      login(accessToken, refreshToken); // 로그인
      goTo(ROUTES.MAIN, { replace: true });
    } else {
      console.error('인증 토큰을 찾을 수 없습니다.');
      goTo(ROUTES.LOGIN, { replace: true });
    }
  }, [searchParams, goTo, login]);

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen bg-primary-0 p-50">
      <div className="flex flex-col-center w-612 h-498 bg-white rounded-24 shadow-sub">
        <Spinner showDimmer={false} />
        <p className="mb-250 text-24 text-primary-main whitespace-pre-line text-center">{`환영합니다!\n곧 메인 화면으로 이동합니다`}</p>
      </div>
    </div>
  );
};

export default SocialCallbackPage;
