import React from 'react';
import { TfiArrowUp } from 'react-icons/tfi';

export default function UploadButton({ onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group w-117 h-35 rounded-full flex items-center justify-center gap-5 transition-colors bg-primary-50 hover:bg-primary-200 active:bg-primary-200"
    >
      <TfiArrowUp className="w-16 h-16 transition-colors text-primary-400 group-hover:text-primary-main group-active:text-white" />
      <span className="font-medium text-14 leading-18 transition-colors text-primary-400 group-hover:text-primary-main group-active:text-white">
        업로드
      </span>
    </button>
  );
}
