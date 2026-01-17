import { useEffect, useRef, useState } from 'react';
import { getFormattedDate } from '../../../utils/date';
import { useNoteStore } from '../../../store/useNoteStore';

const NoteDetail = () => {
  const { selectedNote, saveNote } = useNoteStore();

  const [title, setTitle] = useState(selectedNote?.data?.title || '');
  const [category, setCategory] = useState(selectedNote?.data?.category || '');
  const [content, setContent] = useState(selectedNote?.data?.memo || '');

  const lastState = useRef({ title, category, content }); // 최신 상태값

  useEffect(() => {
    lastState.current = { title, category, content };
  }, [title, category, content]);

  // 언마운트될때 자동 저장
  useEffect(() => {
    return () => {
      const { title, category, content } = lastState.current;
      // 변경 사항 있는지 체크
      const isChanged =
        title !== (selectedNote?.data?.title || '') ||
        category !== (selectedNote?.data?.category || '') ||
        content !== (selectedNote?.data?.memo || '');

      // 내용이 하나라도 있는지 체크
      const hasContent = title.trim() || category.trim() || content.trim();

      //  변경 사항이 있고, 내용이 비어있지 않을 때만 저장
      if (isChanged && hasContent) {
        saveNote({
          title: title.trim() || '제목 없음',
          category: category.trim() || '미분류',
          memo: content,
          updatedAt: new Date().toISOString(),
          id: selectedNote?.data?.id,
        });
      }
    };
  }, [saveNote, selectedNote]);

  return (
    <div className="flex-1 w-full flex flex-col gap-25 overflow-hidden">
      {/* 상단 정보 영역 */}
      <section className="w-476 h-74 bg-primary-0 rounded-10 px-10 py-7 flex-col-center gap-14 shrink-0 self-center">
        {/* 제목 */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="bg-transparent border-none outline-none text-18 font-semibold text-secondary-500 w-full"
        />

        <div className="flex items-center w-full gap-15">
          {/* 날짜 */}
          <div className="flex-row-center gap-15">
            <span className="w-38 h-24 bg-primary-50 rounded-6 p-5 flex-row-center text-12 font-medium text-secondary-500 shrink-0">
              날짜
            </span>
            <span className="text-16 font-medium text-secondary-500 ">
              {getFormattedDate(selectedNote?.data?.updatedAt)}
            </span>
          </div>

          {/* 분류 */}
          <div className="flex-row-center gap-15">
            <span className="w-38 h-24 bg-primary-50 rounded-6 p-5 flex-row-center text-12 font-medium text-secondary-500 shrink-0">
              분류
            </span>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="카테고리"
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
