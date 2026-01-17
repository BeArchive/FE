import { useState } from 'react';
import IconButton from '../../../components/iconButton/IconButton';
import { CancelIcon } from '../../../components/iconButton/Icons';
import NoteList from './NoteList';

const BrainstormNote = ({ onClose }) => {
  const [notes, setNotes] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // 임시 데이터
  const [view, setView] = useState('list'); // 목록 or 상세
  const [, /*selectedNoteId*/ setSelectedNoteId] = useState(null);

  const panelStyle = {
    boxShadow: '0px 0px 16px 0px rgba(217, 217, 217, 0.16)',
    backdropFilter: 'blur(4px)',
  };

  const handleDelete = (id) => {
    setNotes((prevNotes) => prevNotes.filter((noteId) => noteId !== id));
    console.log(`${id}번 노트 삭제`);
  };

  // 노트 선택 핸들러
  const handleSelect = (id) => {
    setSelectedNoteId(id);
    setView('detail');
  };

  return (
    <div
      style={panelStyle}
      className="relative w-516 h-602 rounded-20 flex flex-col gap-15 overflow-hidden animate-in fade-in slide-in-from-bottom-4 p-20 bg-white"
    >
      {/* 헤더 영역 */}
      <section className="w-full flex items-center justify-between px-4 pb-15 border-b border-primary-50">
        <span className="text-24 font-medium text-secondary-500">브레인스토밍 노트</span>
        {view === 'list' ? (
          <IconButton Icon={CancelIcon} theme="note" onClick={onClose} />
        ) : (
          <IconButton Icon={CancelIcon} theme="note" onClick={() => setView('list')} />
        )}
      </section>

      {view === 'list' ? (
        <NoteList notes={notes} onDelete={handleDelete} onSelect={handleSelect} />
      ) : (
        <div className="flex-1 flex-col-center">NoteDetail 추가 예정</div>
      )}
    </div>
  );
};

export default BrainstormNote;
