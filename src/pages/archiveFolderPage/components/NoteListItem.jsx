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
      className={cn(
        'relative h-[53px] flex items-center overflow-hidden transition-all',
        isSelected
          ? 'bg-gray-100 rounded-full shadow-basic'
          : isHovered
            ? 'bg-gray-50 rounded-full shadow-basic'
            : 'border-b border-gray-50',
      )}
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* 노트 이미지 */}
      <div className="absolute left-[25px] top-1/2 -translate-y-1/2 w-[30px] h-[31px]">
        <img src={noteImage} alt="노트" className="w-full h-full object-contain" />
      </div>
      {/* 노트 이름 */}
      <p className="absolute left-[115px] font-medium text-[14px] leading-[22px] text-black truncate">
        {note.name}
      </p>
      {/* 수정날짜 */}
      <div className="absolute right-[290px] top-1/2 -translate-y-1/2 flex items-center gap-[5px] font-normal text-[14px] leading-[22px] text-secondary-500">
        <span>수정날짜</span>
        <span>{note.date}</span>
      </div>
      {/* 삭제 버튼 */}
      <button
        className={cn(
          'absolute right-[15px] top-1/2 -translate-y-1/2 w-[92px] h-[35px] rounded-full flex items-center justify-center gap-[5px] transition-all',
          isSelected
            ? 'bg-gray-300 shadow-basic text-gray-100'
            : isHovered
              ? 'bg-gray-100 shadow-basic text-secondary-500'
              : 'bg-primary-0 text-secondary-300',
        )}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <FaRegTrashAlt className="w-[19px] h-[21px]" />
        <span className="font-medium text-[14px] leading-[18px]">삭제</span>
      </button>
    </div>
  );
}
