import { AddIcon } from '../../../components/iconButton/Icons';
import NoteItem from './NoteItem';

// NoteItem 리스트, 추가하기 버튼
const NoteList = ({ notes, onDelete, onSelect }) => {
  return (
    <>
      {/* 리스트 영역 */}
      <section className="flex-1 w-full overflow-y-auto flex flex-col items-center gap-10 pb-40 custom-scrollbar">
        {notes.map((id) => (
          <NoteItem
            key={id}
            title="가나다라마바사가나다라마바사가나"
            date="2026. 01. 01"
            onDelete={() => onDelete(id)}
            onClick={() => onSelect(id)}
          />
        ))}
      </section>

      {/* 추가하기 버튼 */}
      <button className="btn-confirm-yes absolute bottom-25 right-18 z-10 w-117 h-35 rounded-100 bg-primary-50 text-primary-400 flex-row-center gap-5 active:scale-95">
        <AddIcon className="w-23 h-23" />
        <span className="text-16 font-medium">추가하기</span>
      </button>
    </>
  );
};

export default NoteList;
