import axios from 'axios';
import useAuthStore from '../../store/useAuthStore';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 공통 요청 인터셉터 (Request Interceptor)
const onRequestFulfilled = (config) => {
  // 토큰을 싣지 말아야 할 요청들
  const publicUrls = ['/auth/signup', '/auth/login'];

  const isPublicRequest = config.url && publicUrls.some((url) => config.url.includes(url));

  // 공개 요청이 아니라면 토큰을 헤더에 삽입
  if (!isPublicRequest) {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
};

const onRequestRejected = (error) => {
  return Promise.reject(error);
};

// 2. 공통 응답 인터셉터 (Response Interceptor)
const onResponseFulfilled = (response) => {
  return response;
};

const onResponseRejected = (error) => {
  const { response } = error;

  // 401 Error(인증 실패/만료)
  if (response?.status === 401) {
    console.warn('401 Unauthorized: 토큰이 만료되었습니다. 로그아웃합니다.');

    useAuthStore.getState().logout();
  }

  return Promise.reject(error);
};

// 3. 인스턴스 생성 및 인터셉터 부착
// 기본 JSON 요청용 인스턴스
export const defaultInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

defaultInstance.interceptors.request.use(onRequestFulfilled, onRequestRejected);
defaultInstance.interceptors.response.use(onResponseFulfilled, onResponseRejected);

// 파일 업로드(FormData)용 인스턴스
export const multiInstance = axios.create({
  baseURL: BASE_URL,
});

multiInstance.interceptors.request.use(onRequestFulfilled, onRequestRejected);
multiInstance.interceptors.response.use(onResponseFulfilled, onResponseRejected);
