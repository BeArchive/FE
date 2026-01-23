import { useEffect } from 'react';
import { getFormattedDate } from '../../../utils/date';
import { useNoteStore } from '../../../store/useNoteStore';
import { useNoteQuery } from './hooks/useNoteQuery';

const NoteDetail = () => {
  const LIMIT = 15;
  const { tempNote, setTempNote, selectedNote } = useNoteStore();
  const { noteDetail, isDetailLoading } = useNoteQuery();

  useEffect(() => {
    if (noteDetail) {
      setTempNote('content', noteDetail.memo || '');
      setTempNote('title', noteDetail.title || '');
      setTempNote('category', noteDetail.category || '');
    }
  }, [noteDetail, setTempNote]);

  const handleTitleChange = (e) => {
    if (e.target.value.length <= LIMIT) setTempNote('title', e.target.value);
  };

  const handleCategoryChange = (e) => {
    if (e.target.value.length <= LIMIT) setTempNote('category', e.target.value);
  };

  if (isDetailLoading) {
    return <div className="flex-1 flex-row-center text-secondary-300">로딩 중...</div>;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-25 overflow-hidden">
      <section className="w-476 h-74 bg-primary-0 rounded-10 px-10 py-7 flex-col-center gap-14 shrink-0 self-center">
        <input
          type="text"
          value={tempNote.title}
          onChange={handleTitleChange}
          placeholder="제목을 입력하세요 (15자 이내)"
          className="bg-transparent border-none outline-none text-18 font-semibold text-secondary-500 w-full"
        />

        <div className="flex items-center w-full gap-15">
          <div className="flex-row-center gap-15">
            <span className="w-38 h-24 bg-primary-50 rounded-6 p-5 flex-row-center text-12 font-medium text-secondary-500 shrink-0">
              날짜
            </span>
            <span className="text-16 font-medium text-secondary-500 ">
              {getFormattedDate(selectedNote?.data?.updatedAt || new Date())}
            </span>
          </div>

          <div className="flex-row-center gap-15">
            <span className="w-38 h-24 bg-primary-50 rounded-6 p-5 flex-row-center text-12 font-medium text-secondary-500 shrink-0">
              분류
            </span>
            <input
              type="text"
              value={tempNote.category}
              onChange={handleCategoryChange}
              placeholder="카테고리 (15자 이내)"
              className="bg-transparent border-none outline-none text-16 font-medium text-secondary-500 w-full"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5 self-center">
        <span className="text-16 font-semibold text-secondary-300 ml-10">메모</span>
        <div className="w-476 h-378 bg-primary-0 rounded-10 p-10">
          <textarea
            value={tempNote.content}
            onChange={(e) => setTempNote('content', e.target.value)}
            placeholder="자유롭게 생각을 남겨보세요!"
            className="w-full h-full bg-transparent border-none outline-none resize-none text-14 font-regular text-secondary-500 leading-22"
            spellCheck="false"
          />
        </div>
      </section>
    </div>
  );
};

export default NoteDetail;
