import ImageButton from '../../components/imageButton/ImageButton';
import Logo from '../../components/logo/Logo';
import GOOGLE from '@assets/images/google_login.webp';
import KAKAO from '@assets/images/kakao_login.webp';
import useNavigation from '../../hooks/useNavigation';
import { AUTH_ENDPOINTS } from '../../constants/auth';

const LoginPage = () => {
  const { goTo } = useNavigation();

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen bg-primary-0 p-50">
      <div className="absolute top-50 left-50">
        <Logo />
      </div>

      <div className="flex flex-col items-center justify-center w-612 h-498 bg-white rounded-24 shadow-sub">
        {/* 로고, 소개 멘트 */}
        <div className="flex flex-col items-center gap-20 text-center">
          <Logo long className="w-293 h-80 pointer-events-none" />

          <p className="whitespace-pre-line text-primary-main text-18 font-medium">
            래퍼런스를 아카이빙 하고 {'\n'}
            <span className="font-bold">아이디어</span>를 확장하는 공간
          </p>
        </div>

        {/* 구분선 */}
        <div className="w-468 h-3 bg-primary-50 mt-68 mb-28" />

        {/* SNS 로그인 버튼 */}
        <div className="flex flex-col items-center gap-22">
          <p className="text-secondary-200 text-16 font-medium">SNS</p>
          <div className="flex items-center justify-between w-392 h-40">
            <ImageButton
              src={GOOGLE}
              alt="구글로그인"
              className="w-165 h-40"
              onClick={() => goTo(AUTH_ENDPOINTS.GOOGLE)}
            />
            <ImageButton
              src={KAKAO}
              alt="카카오로그인"
              className="w-165 h-40"
              onClick={() => goTo(AUTH_ENDPOINTS.KAKAO)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
