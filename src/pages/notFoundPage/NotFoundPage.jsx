import React from 'react';
import Logo from '../../components/Logo';
import questionIcon from '../../assets/icons/question_icon.svg';
import notFoundIcon from '../../assets/icons/notfound_icon.svg';

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen bg-primary-0">
      {/* 로고 */}
      <div className="absolute left-50 top-50">
        <Logo />
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center gap-15">
        {/* 아이콘 */}
        <div className="relative grid place-items-center">
          <img
            src={questionIcon}
            alt="?"
            className="absolute top-0 -translate-y-45 w-31 h-56 object-contain"
          />
          <img src={notFoundIcon} alt="404" className="w-240 h-233 object-contain" />
        </div>

        {/* 제목 */}
        <p className="text-42 font-bold leading-58 text-primary-main text-center">404 Not Found</p>

        {/* 설명 */}
        <div className="text-center text-16 font-medium leading-24 text-gray-700">
          <p className="mb-0">죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.</p>
          <p className="mb-0">존재하지 않는 주소를 입력하셨거나,</p>
          <p>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
        </div>
      </div>
    </div>
  );
}
