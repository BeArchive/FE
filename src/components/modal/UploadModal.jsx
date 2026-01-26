import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { cn } from '../../lib/utils';
import UploadButton from '../../pages/archiveFolderPage/components/UploadButton';
import { getUnassignedChatRooms, assignChatRoomToFolder } from '../../apis/chatApi';
import { getFormattedDate } from '../../utils/date';

export default function UploadModal({ open, onClose, onConfirm, folderId }) {
  const [selected, setSelected] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [chatHistories, setChatHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // 미분류 채팅방 조회
  useEffect(() => {
    if (open) {
      setSelected([]); // 선택 상태 초기화
      const fetchUnassignedChats = async () => {
        setIsLoading(true);
        try {
          const data = await getUnassignedChatRooms();
          const formattedChats = data.map((chat) => ({
            id: chat.chatRoomId,
            title: chat.title,
            date: getFormattedDate(chat.updatedAt),
          }));
          setChatHistories(formattedChats);
        } catch (error) {
          console.error('미분류 채팅방 조회 실패:', error);
          setChatHistories([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUnassignedChats();
    }
  }, [open]);

  if (!open) return null;

  const toggleSelect = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleConfirm = async () => {
    if (!folderId) {
      console.error('폴더 ID가 없습니다.');
      return;
    }

    setIsUploading(true);
    try {
      // 선택된 각 채팅방을 폴더에 할당
      await Promise.all(selected.map((chatRoomId) => assignChatRoomToFolder(chatRoomId, folderId)));

      // 선택된 채팅 내역을 note 형태로 변환 (분류 채탕방 조회 연동 후 삭제 예정)
      const selectedChats = chatHistories.filter((chat) => selected.includes(chat.id));
      const notes = selectedChats.map((chat) => ({
        id: chat.id,
        name: chat.title,
        url: null, // 추후 상세페이지 연결 시
        date: chat.date,
      }));

      onConfirm(notes);
      onClose();
    } catch (error) {
      console.error('채팅방 업로드 실패:', error);
      alert('채팅방 업로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-gray-200 opacity-50" />

      {/* 모달 */}
      <div className="bg-white rounded-20 shadow-basic w-642 h-433 flex flex-col relative z-10">
        {/* 헤더 */}
        <div className="px-24 pt-19 pb-15">
          <p className="font-medium text-24 text-secondary-500 leading-36">
            브레인스토밍 채팅 내역
          </p>
        </div>
        {/* 구분선 */}
        <div className="mx-10 border-b border-primary-50" />

        {/* 채팅 목록 */}
        <div className="flex-1 overflow-y-auto px-10 pt-14 pb-140">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              {/* TODO: 로딩 스피너 컴포넌트로 교체 예정 */}
              <p className="text-secondary-300">로딩 중...</p>
            </div>
          ) : (
            <div className="flex flex-col gap-10 w-full">
              {chatHistories.map((chat) => {
                const isSelected = selected.includes(chat.id);
                const isHovered = hoveredId === chat.id;

                return (
                  <div
                    key={chat.id}
                    className={cn(
                      'h-53 flex items-center px-20 relative transition-all cursor-pointer',
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
                    <div className="absolute left-20 w-27 h-27 flex items-center justify-center">
                      <div
                        className={`w-27 h-27 rounded-3.85 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-primary-400 shadow-basic'
                            : isHovered
                              ? 'bg-primary-50 shadow-basic'
                              : 'bg-primary-0'
                        }`}
                      >
                        {isSelected && <FaCheck className="text-white text-17" />}
                      </div>
                    </div>

                    {/* 텍스트 */}
                    <p className="absolute left-152 font-medium text-14 leading-22 text-black">
                      {chat.title.length > 16 ? chat.title.slice(0, 16) + '...' : chat.title}
                    </p>

                    {/* 날짜 */}
                    <div className="absolute right-30 flex items-center gap-5 font-normal text-14 leading-22 text-secondary-500">
                      <span>수정날짜</span>
                      <span>{chat.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 리스트 하단 그라데이션 + 버튼 오버레이 */}
        <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-102 bg-gradient-to-b from-transparent to-white rounded-b-20" />
        <div className="absolute left-1/2 bottom-34 -translate-x-1/2 flex items-center justify-center gap-45 pointer-events-auto">
          {/* 업로드 */}
          <UploadButton onClick={handleConfirm} disabled={selected.length === 0 || isUploading} />

          {/* 취소 */}
          <button
            type="button"
            onClick={onClose}
            disabled={isUploading}
            className="group w-117 h-35 rounded-full flex items-center justify-center transition-colors bg-secondary-50 hover:bg-gray-150 active:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="font-medium text-14 leading-18 transition-colors text-secondary-300 group-hover:text-secondary-500 group-active:text-gray-100">
              취소
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
