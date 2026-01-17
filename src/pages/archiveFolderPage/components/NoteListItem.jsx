import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import noteImage from '../../../assets/images/note_btn.webp';
import { cn } from '../../../lib/utils';

export default function NoteListItem({
  note,
  isSelected,
  isHovered,
  onSelect,
  onDelete,
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <div
      className={`relative h-53 flex items-center overflow-hidden transition-all ${
        isSelected
          ? 'bg-gray-100 rounded-full shadow-basic'
          : isHovered
            ? 'bg-gray-50 rounded-full shadow-basic'
            : 'border-b border-gray-50'
      }`}
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* 노트 이미지 */}
      <div className="absolute left-25 top-1/2 -translate-y-1/2 w-30 h-31">
        <img src={noteImage} alt="노트" className="w-full h-full object-contain" />
      </div>
      {/* 노트 이름 */}
      <p className="absolute left-115 font-medium text-14 leading-22 text-black truncate">
        {note.name}
      </p>
      {/* 수정날짜 */}
      <div className="absolute right-290 top-1/2 -translate-y-1/2 flex items-center gap-5 font-normal text-14 leading-22 text-secondary-500">
        <span>수정날짜</span>
        <span>{note.date}</span>
      </div>
      {/* 삭제 버튼 */}
      <button
        className={`absolute right-15 top-1/2 -translate-y-1/2 w-92 h-35 rounded-full flex items-center justify-center gap-5 transition-all ${
          isSelected
            ? 'bg-gray-300 shadow-basic text-gray-100'
            : isHovered
              ? 'bg-gray-100 shadow-basic text-secondary-500'
              : 'bg-primary-0 text-secondary-300'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <FaRegTrashAlt className="w-19 h-21" />
        <span className="font-medium text-14 leading-18">삭제</span>
      </button>
    </div>
  );
}
