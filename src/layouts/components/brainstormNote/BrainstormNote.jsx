import { useState } from 'react';
import NoteItem from './NoteItem';
import IconButton from '../../../components/iconButton/IconButton';
import { AddIcon, CancelIcon } from '../../../components/iconButton/Icons';

const BrainstormNote = ({ onClose }) => {
  const [notes, setNotes] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // 임시 데이터

  const panelStyle = {
    boxShadow: '0px 0px 16px 0px rgba(217, 217, 217, 0.16)',
    backdropFilter: 'blur(4px)',
  };

  const handleDelete = (id) => {
    setNotes((prevNotes) => prevNotes.filter((noteId) => noteId !== id));
    console.log(`${id}번 노트 삭제`);
  };

  return (
    <div
      style={panelStyle}
      className="relative w-516 h-602 rounded-20 flex flex-col gap-15 overflow-hidden animate-in fade-in slide-in-from-bottom-4 p-20 bg-white"
    >
      {/* 헤더 영역 */}
      <section className="w-full flex items-center justify-between px-4 pb-15 border-b border-primary-50">
        <span className="text-24 font-medium text-secondary-500">브레인스토밍 노트</span>
        <IconButton Icon={CancelIcon} theme="note" onClick={onClose} />
      </section>

      {/* 리스트 영역 */}
      <section className="flex-1 w-full overflow-y-auto flex flex-col items-center gap-10 pb-40 custom-scrollbar">
        {/* 임시 데이터 */}
        {notes.map((id) => (
          <NoteItem
            key={id}
            title="가나다라마바사가나다라마바사가나"
            date="2026. 01. 01"
            onDelete={() => handleDelete(id)}
          />
        ))}
      </section>

      {/* 추가하기 버튼 */}
      <button className="btn-confirm-yes absolute bottom-25 right-18 z-10 w-117 h-35 rounded-100 bg-primary-50 text-primary-400 flex-row-center gap-5 active:scale-95">
        <AddIcon className="w-23 h-23" />
        <span className="text-16 font-medium">추가하기</span>
      </button>
    </div>
  );
};

export default BrainstormNote;
