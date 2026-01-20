import { getFormattedDate } from '../../../utils/date';
import { useNoteStore } from '../../../store/useNoteStore';

const NoteDetail = () => {
  const LIMIT = 15; // 글자 수 제한
  const { tempNote, setTempNote, selectedNote } = useNoteStore();

  // 제목 변경 핸들러
  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= LIMIT) {
      setTempNote('title', value);
    }
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value.length <= LIMIT) {
      setTempNote('category', value);
    }
  };

  // 메모 변경 핸들러
  const handleContentChange = (e) => {
    setTempNote('content', e.target.value);
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-25 overflow-hidden">
      {/* 상단 정보 영역 */}
      <section className="w-476 h-74 bg-primary-0 rounded-10 px-10 py-7 flex-col-center gap-14 shrink-0 self-center">
        {/* 제목 */}
        <input
          type="text"
          value={tempNote.title}
          onChange={handleTitleChange}
          placeholder="제목을 입력하세요 (15자 이내)"
          className="bg-transparent border-none outline-none text-18 font-semibold text-secondary-500 w-full"
        />

        <div className="flex items-center w-full gap-15">
          {/* 날짜 */}
          <div className="flex-row-center gap-15">
            <span className="w-38 h-24 bg-primary-50 rounded-6 p-5 flex-row-center text-12 font-medium text-secondary-500 shrink-0">
              날짜
            </span>
            <span className="text-16 font-medium text-secondary-500 ">
              {getFormattedDate(selectedNote?.data?.updatedAt || new Date())}
            </span>
          </div>

          {/* 분류 */}
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

      {/* 메모 영역 */}
      <section className="flex flex-col gap-5 self-center">
        <span className="text-16 font-semibold text-secondary-300 ml-10">메모</span>
        <div className="w-476 h-378 bg-primary-0 rounded-10 p-10">
          <textarea
            value={tempNote.content}
            onChange={handleContentChange}
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
