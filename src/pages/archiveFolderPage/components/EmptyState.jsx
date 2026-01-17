import React from 'react';
import archiveIcon from '../../../assets/images/archive_empty_logo.svg';
import UploadButton from './UploadButton';

// 빈 상태 폴더 내부 컴포넌트
export default function EmptyState({ onUploadClick }) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-15">
      <div className="flex flex-col items-center gap-17 w-full">
        <img src={archiveIcon} alt="빈 폴더" className="w-177 h-228 object-contain" />
        <div className="flex flex-col items-center gap-5 text-center text-secondary-500 w-full">
          <p className="font-medium text-24 leading-36">대화내역을 불러와 주세요.</p>
          <p className="font-normal text-18 leading-22">
            브레인스토밍 채팅에서 나눴던 대화를 폴더로 정리해 보세요.
          </p>
        </div>
      </div>
      {/* 업로드 버튼 */}
      <UploadButton onClick={onUploadClick} />
    </div>
  );
}
