import { useEffect, useRef } from 'react';

export const useAutoSave = (values, selectedNote, saveNote) => {
  const lastState = useRef(values);

  // 컴포넌트 리렌더링 시마다 최신 입력값으로 ref 업데이트
  useEffect(() => {
    lastState.current = values;
  }, [values]);

  useEffect(() => {
    // 컴포넌트가 사라질 때 실행
    return () => {
      const { title, category, content } = lastState.current;

      // 1. 변경 사항 체크
      const isChanged =
        title !== (selectedNote?.data?.title || '') ||
        category !== (selectedNote?.data?.category || '') ||
        content !== (selectedNote?.data?.memo || '');

      // 2. 내용이 하나라도 있는지 체크
      const hasContent = title.trim() || category.trim() || content.trim();

      // 변경되었고 내용이 있을 때만 저장
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
};
