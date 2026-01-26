import { useEffect } from 'react';
import IconButton from '../../../components/iconButton/IconButton';
import { CancelIcon, PrevIcon } from '../../../components/iconButton/Icons';
import { useNoteStore, VIEW_TYPE } from '../../../store/useNoteStore';
import NoteDetail from './NoteDetail';
import NoteList from './NoteList';
import { useMutation } from './hooks/useMutation';

const BrainstormNote = ({ onClose }) => {
  const { view, setView } = useNoteStore();
  const { mutateSave } = useMutation();

  // 컴포넌트 언마운트 시 뷰 상태를 리스트로 초기화
  useEffect(() => {
    return () => {
      setView(VIEW_TYPE.LIST);
    };
  }, [setView]);

  const panelStyle = {
    boxShadow: '0px 0px 16px 0px rgba(217, 217, 217, 0.16)',
    backdropFilter: 'blur(4px)',
  };

  return (
    <div
      style={panelStyle}
      className="relative w-516 h-602 max-w-[calc(100vw-40rem)] max-h-[calc(100vh-28.5rem)] rounded-20 flex flex-col gap-15 overflow-hidden animate-in fade-in slide-in-from-bottom-4 p-20 bg-white"
    >
      {/* 헤더 영역 */}
      <section className="w-full flex items-center justify-between px-4 pb-15 border-b border-primary-50 shrink-0">
        <span className="text-24 font-medium text-secondary-500">브레인스토밍 노트</span>
        {view === VIEW_TYPE.LIST ? (
          <IconButton Icon={CancelIcon} theme="note" onClick={onClose} />
        ) : (
          <IconButton Icon={PrevIcon} theme="note" onClick={() => mutateSave()} />
        )}
      </section>

      <div className="flex-1 overflow-y-auto">
        {view === VIEW_TYPE.LIST ? <NoteList /> : <NoteDetail />}
      </div>
    </div>
  );
};

export default BrainstormNote;
