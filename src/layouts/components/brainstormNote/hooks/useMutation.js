import { useMutation as useTanstackMutation, useQueryClient } from '@tanstack/react-query';
import * as noteApi from '../../../../apis/noteApi';
import { useNoteStore, VIEW_TYPE } from '../../../../store/useNoteStore';

export const useMutation = () => {
  const queryClient = useQueryClient();
  const { tempNote, selectedNote, setView, resetSelectedNote } = useNoteStore();

  // 노트 저장 (생성 또는 수정)
  const saveMutation = useTanstackMutation({
    mutationFn: async () => {
      const currentId = selectedNote?.data?.id;

      const hasContent =
        tempNote.title.trim() || tempNote.category.trim() || tempNote.content.trim();
      if (!hasContent) return null;

      const payload = {
        title: tempNote.title.trim() || '제목 없음',
        category: tempNote.category.trim() || '기본',
        memo: tempNote.content,
      };

      // ID 존재 여부에 따라 API 선택
      return currentId ? noteApi.updateNote(currentId, payload) : noteApi.createNote(payload);
    },
    onSuccess: (response) => {
      if (!response) {
        setView(VIEW_TYPE.LIST);
        resetSelectedNote();
        return;
      }

      if (response.isSuccess) {
        // 'notes' 키를 가진 모든 쿼리를 무효화하여 목록을 새로고침
        queryClient.invalidateQueries({ queryKey: ['notes'] });
        setView(VIEW_TYPE.LIST);
        resetSelectedNote();
      }
    },
    onError: (error) => {
      if (error.response?.status === 409) {
        alert('이미 존재하는 제목입니다.');
      } else {
        console.error('노트 저장 실패:', error);
      }
    },
  });

  // 노트 삭제
  const deleteMutation = useTanstackMutation({
    mutationFn: (id) => noteApi.deleteNote(id),
    onSuccess: (response) => {
      if (response.isSuccess) {
        // 삭제 성공 시 목록 새로고침
        queryClient.invalidateQueries({ queryKey: ['notes'] });
      }
    },
    onError: (error) => {
      console.error('노트 삭제 실패:', error);
    },
  });

  return {
    mutateSave: saveMutation.mutate,
    mutateDelete: deleteMutation.mutate,
    isSaving: saveMutation.isPending,
  };
};
