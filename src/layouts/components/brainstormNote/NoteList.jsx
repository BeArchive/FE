import { useState } from 'react';
import { AddIcon } from '../../../components/iconButton/Icons';
import { useNoteStore, VIEW_TYPE } from '../../../store/useNoteStore';
import NoteItem from './NoteItem';
import { getFormattedDate } from '../../../utils/date';
import ChatDeleteModal from '../../../components/modal/ChatDeleteModal';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { useNoteQuery } from './hooks/useNoteQuery';
import { useMutation } from './hooks/useMutation';

const NoteList = () => {
  const { setView, setSelectedNote, resetSelectedNote } = useNoteStore();
  const { notes, getNextPage, hasNext } = useNoteQuery();
  const { mutateDelete } = useMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetNote, setTargetNote] = useState(null);

  // 무한 스크롤 훅 연결
  const bottomRef = useInfiniteScroll({
    hasNextPage: hasNext,
    fetchNextPage: getNextPage,
  });

  // 추가하기 버튼 핸들러
  const handleAddClick = () => {
    resetSelectedNote();
    setView(VIEW_TYPE.DETAIL);
  };

  // 노트 선택 핸들러
  const handleSelectClick = (note) => {
    setSelectedNote({ data: note });
    setView(VIEW_TYPE.DETAIL);
  };

  // 삭제 확인 핸들러
  const handleConfirmDelete = () => {
    if (targetNote) {
      mutateDelete(targetNote.id);
      setIsModalOpen(false);
      setTargetNote(null);
    }
  };

  return (
    <>
      <section className="flex-1 w-full overflow-y-auto flex flex-col items-center gap-10 pb-40 custom-scrollbar">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            title={note.title}
            date={getFormattedDate(note.updatedAt)}
            onDelete={() => {
              setTargetNote(note);
              setIsModalOpen(true);
            }}
            onClick={() => handleSelectClick(note)}
          />
        ))}

        {/* 무한 스크롤 감지 박스 */}
        <div ref={bottomRef} className="h-20 w-full shrink-0" />
      </section>

      <button
        onClick={handleAddClick}
        className="btn-confirm-yes absolute bottom-25 right-18 z-10 w-117 h-35 rounded-100 bg-primary-50 text-primary-400 flex-row-center gap-5 active:scale-95"
      >
        <AddIcon className="w-23 h-23" />
        <span className="text-16 font-medium">추가하기</span>
      </button>

      <ChatDeleteModal
        open={isModalOpen}
        chat={
          targetNote
            ? { name: targetNote.title, date: getFormattedDate(targetNote.updatedAt) }
            : null
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default NoteList;
