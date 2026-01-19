import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { isExternalUrl } from '../utils/url';

const useNavigation = () => {
  const navigate = useNavigate();

  // options에 {isNewTab = true}를 주면 새창으로 열기
  const goTo = useCallback(
    (path, options = {}) => {
      const { isNewTab = false, ...navOptions } = options;

      // 외부 링크 처리
      if (isExternalUrl(path)) {
        if (isNewTab) {
          const newWindow = window.open(path, '_blank', 'noopener,noreferrer');

          if (newWindow) newWindow.opener = null;
        } else {
          window.location.href = path;
        }
        return;
      }

      // 내부 경로 처리
      navigate(path, navOptions);
    },
    [navigate],
  );

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return { goTo, goBack };
};

export default useNavigation;
