import React from 'react';
import UploadButton from './UploadButton';

export default function FolderHeader({ folderName, hasNotes, onUploadClick }) {
  return (
    <div className="relative w-full h-118 sticky top-0 z-10 bg-white">
      <p className="absolute left-41 top-41 font-medium text-20 leading-24 text-secondary-500">
        아카이브 보드 · {folderName}
      </p>
      {/* 구분선 */}
      <div className="absolute left-20 right-20 top-83 h-1 bg-primary-50" />
      {/* 업로드 버튼 (노트가 있을 때만 표시) */}
      {hasNotes && (
        <div className="absolute right-50 top-35">
          <UploadButton onClick={onUploadClick} />
        </div>
      )}
    </div>
  );
}
