import { useState } from 'react';
import { AddIcon } from '../../../components/iconButton/Icons';
import { useNoteStore, VIEW_TYPE } from '../../../store/useNoteStore';
import NoteItem from './NoteItem';
import { getFormattedDate } from '../../../utils/date';
import ChatDeleteModal from '../../../components/modal/ChatDeleteModal';
import * as noteApi from '../../../apis/noteApi';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';

const NoteList = () => {
  const {
    notes,
    fetchNotes,
    hasNext,
    nextCursor,
    deleteNote,
    setSelectedNote,
    setView,
    resetSelectedNote,
  } = useNoteStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetNote, setTargetNote] = useState(null);

  // 무한 스크롤 훅 연결
  const bottomRef = useInfiniteScroll({
    hasNextPage: hasNext,
    fetchNextPage: () => fetchNotes(nextCursor),
  });

  // 추가하기 버튼 핸들러
  const handleAddClick = () => {
    resetSelectedNote();
    setView(VIEW_TYPE.DETAIL);
  };

  // 노트 선택 핸들러
  const handleSelectClick = async (note) => {
    try {
      const response = await noteApi.getNoteDetail(note.data.id);

      if (response.isSuccess) {
        setSelectedNote({ data: response.data });
        setView(VIEW_TYPE.DETAIL);
      }
    } catch (error) {
      console.error('상세 정보 로드 실패', error);
    }
  };

  // 노트 삭제 핸들러
  const handleDeleteClick = (note) => {
    setTargetNote(note);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (targetNote) {
      deleteNote(targetNote.data.id);
      setIsModalOpen(false);
      setTargetNote(null);
    }
  };

  return (
    <>
      {/* 리스트 영역 */}
      <section className="flex-1 w-full overflow-y-auto flex flex-col items-center gap-10 pb-40 custom-scrollbar">
        {notes.map((note) => (
          <NoteItem
            key={note.data.id}
            title={note.data.title}
            date={getFormattedDate(note.data.updatedAt)}
            onDelete={() => handleDeleteClick(note)}
            onClick={() => handleSelectClick(note)}
          />
        ))}

        {/* 무한 스크롤 감지 박스 */}
        <div ref={bottomRef} className="h-20 w-full shrink-0" />
      </section>

      {/* 추가하기 버튼 */}
      <button
        onClick={handleAddClick}
        className="btn-confirm-yes absolute bottom-25 right-18 z-10 w-117 h-35 rounded-100 bg-primary-50 text-primary-400 flex-row-center gap-5 active:scale-95"
      >
        <AddIcon className="w-23 h-23" />
        <span className="text-16 font-medium">추가하기</span>
      </button>

      {/* 삭제 모달 */}
      <ChatDeleteModal
        open={isModalOpen}
        chat={
          targetNote
            ? {
                name: targetNote.data.title,
                date: getFormattedDate(targetNote.data.updatedAt),
              }
            : null
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default NoteList;
