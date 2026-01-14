import React, { useState } from 'react';
import { TfiArrowUp } from 'react-icons/tfi';
import { FaCheck } from 'react-icons/fa6';
import { cn } from '../../lib/utils';

// 더미 채팅 데이터
const DUMMY_CHAT_HISTORIES = [
  {
    id: 1,
    title: '가나다라마바사가나다라마바사가나',
    date: '2026. 01. 01',
  },
  {
    id: 2,
    title: '가나다라마바사가나다라마바사가나',
    date: '2026. 01. 01',
  },
  {
    id: 3,
    title: '가나다라마바사가나다라마바사가나',
    date: '2026. 01. 01',
  },
  {
    id: 4,
    title: '가나다라마바사가나다라마바사가나',
    date: '2026. 01. 01',
  },
  {
    id: 5,
    title: '가나다라마바사가나다라마바사가나',
    date: '2026. 01. 01',
  },
  {
    id: 6,
    title: '가나다라마바사가나다라마바사가나',
    date: '2026. 01. 01',
  },
];

export default function UploadModal({ open, onClose, onConfirm }) {
  const [selected, setSelected] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  if (!open) return null;

  const toggleSelect = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleConfirm = () => {
    // 선택된 채팅 내역을 note 형태로 변환
    const selectedChats = DUMMY_CHAT_HISTORIES.filter((chat) => selected.includes(chat.id));
    const notes = selectedChats.map((chat) => ({
      id: chat.id,
      name: chat.title,
      url: null, // 추후 상세페이지 연결 시
      date: chat.date,
    }));
    onConfirm(notes);
  };

  // 버튼 공통 스타일
  const commonButtonStyle =
    'w-[117px] h-[35px] rounded-full flex items-center justify-center gap-5 transition-colors';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-gray-150 opacity-50" />

      {/* 모달 */}
      <div className="bg-white rounded-20 shadow-basic w-[642px] h-[433px] flex flex-col relative z-10">
        {/* 헤더 */}
        <div className="px-24 pt-19 pb-15">
          <p className="font-medium text-24 text-secondary-500 leading-36">
            브레인스토밍 채팅 내역
          </p>
        </div>
        {/* 구분선 */}
        <div className="mx-10 border-b border-primary-50" />

        {/* 채팅 목록 */}
        <div className="flex-1 overflow-y-auto px-10 pt-14 pb-[140px]">
          <div className="flex flex-col gap-10 w-full">
            {DUMMY_CHAT_HISTORIES.map((chat) => {
              const isSelected = selected.includes(chat.id);
              const isHovered = hoveredId === chat.id;

              return (
                <div
                  key={chat.id}
                  className={cn(
                    'h-[53px] flex items-center px-20 relative transition-all cursor-pointer',
                    isSelected
                      ? 'bg-gray-100 rounded-10 shadow-basic'
                      : isHovered
                        ? 'bg-gray-50 rounded-10 shadow-basic'
                        : 'border-b border-gray-50',
                  )}
                  onClick={() => toggleSelect(chat.id)}
                  onMouseEnter={() => setHoveredId(chat.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* 체크박스 */}
                  <div className="absolute left-[20px] w-[27px] h-[27px] flex items-center justify-center">
                    <div
                      className={cn(
                        'w-[27px] h-[27px] rounded-[3.85px] flex items-center justify-center transition-all',
                        isSelected
                          ? 'bg-primary-400 shadow-basic'
                          : isHovered
                            ? 'bg-primary-50 shadow-basic'
                            : 'bg-primary-0',
                      )}
                    >
                      {isSelected && <FaCheck className="text-white text-17" />}
                    </div>
                  </div>

                  {/* 텍스트 */}
                  <p className="absolute left-[152px] font-medium text-14 leading-22 text-black">
                    {chat.title.length > 16 ? chat.title.slice(0, 16) + '...' : chat.title}
                  </p>

                  {/* 날짜 */}
                  <div className="absolute right-[30px] flex items-center gap-5 font-normal text-14 leading-22 text-secondary-500">
                    <span>수정날짜</span>
                    <span>{chat.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 리스트 하단 그라데이션 + 버튼 오버레이 */}
        <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-[102px] bg-gradient-to-b from-transparent to-white rounded-b-20" />
        <div className="absolute left-1/2 bottom-[34px] -translate-x-1/2 flex items-center justify-center gap-[45px] pointer-events-auto">
          {/* 업로드 */}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={selected.length === 0}
            className={cn(
              'group',
              'w-[117px] h-[35px] rounded-full',
              'flex items-center justify-center gap-5',
              'transition-colors',
              'bg-primary-50 hover:bg-primary-200 active:bg-primary-200',
            )}
          >
            <TfiArrowUp
              className={cn(
                'w-16 h-16 transition-colors',
                'text-primary-400',
                'group-hover:text-primary-main',
                'group-active:text-white',
              )}
            />
            <span
              className={cn(
                'font-medium text-[14px] leading-18 transition-colors',
                'text-primary-400',
                'group-hover:text-primary-main',
                'group-active:text-white',
              )}
            >
              업로드
            </span>
          </button>

          {/* 취소 */}
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'group',
              'w-[117px] h-[35px] rounded-full',
              'flex items-center justify-center',
              'transition-colors',
              'bg-secondary-50 hover:bg-gray-150 active:bg-gray-400',
            )}
          >
            <span
              className={cn(
                'font-medium text-[14px] leading-18 transition-colors',
                'text-secondary-300',
                'group-hover:text-secondary-500',
                'group-active:text-gray-100',
              )}
            >
              취소
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
