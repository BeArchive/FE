import { AddIcon } from '../../../components/iconButton/Icons';
import { useNoteStore, VIEW_TYPE } from '../../../store/useNoteStore';
import NoteItem from './NoteItem';
import { getFormattedDate } from '../../../utils/date';

const NoteList = () => {
  const { notes, deleteNote, setSelectedNote, setView, resetSelectedNote } = useNoteStore();

  // 추가하기 버튼 핸들러
  const handleAddClick = () => {
    resetSelectedNote();
    setView(VIEW_TYPE.DETAIL);
  };

  // 노트 선택 핸들러
  const handleSelectClick = (note) => {
    setSelectedNote(note);
    setView(VIEW_TYPE.DETAIL);
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
            onDelete={() => deleteNote(note.data.id)}
            onClick={() => handleSelectClick(note)}
          />
        ))}
      </section>

      {/* 추가하기 버튼 */}
      <button
        onClick={handleAddClick}
        className="btn-confirm-yes absolute bottom-25 right-18 z-10 w-117 h-35 rounded-100 bg-primary-50 text-primary-400 flex-row-center gap-5 active:scale-95"
      >
        <AddIcon className="w-23 h-23" />
        <span className="text-16 font-medium">추가하기</span>
      </button>
    </>
  );
};

export default NoteList;
