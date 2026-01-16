import React from 'react';
import UploadButton from './UploadButton';

export default function FolderHeader({ folderName, hasNotes, onUploadClick }) {
  return (
    <div className="relative w-full h-[118px] sticky top-0 z-10 bg-white">
      <p className="absolute left-[41px] top-[41px] font-medium text-[20px] leading-[24px] text-secondary-500">
        아카이브 보드 · {folderName}
      </p>
      {/* 구분선 */}
      <div className="absolute left-[20px] right-[20px] top-[83px] h-[1px] bg-primary-50" />
      {/* 업로드 버튼 (노트가 있을 때만 표시) */}
      {hasNotes && (
        <div className="absolute right-[50px] top-[35px]">
          <UploadButton onClick={onUploadClick} />
        </div>
      )}
    </div>
  );
}
