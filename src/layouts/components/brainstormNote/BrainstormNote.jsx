import IconButton from '../../../components/iconButton/IconButton';
import { CancelIcon, PrevIcon } from '../../../components/iconButton/Icons';
import { useNoteStore, VIEW_TYPE } from '../../../store/useNoteStore';
import NoteDetail from './NoteDetail';
import NoteList from './NoteList';

const BrainstormNote = ({ onClose }) => {
  const { view, setView } = useNoteStore();

  const panelStyle = {
    boxShadow: '0px 0px 16px 0px rgba(217, 217, 217, 0.16)',
    backdropFilter: 'blur(4px)',
  };

  return (
    <div
      style={panelStyle}
      className="relative w-516 h-602 rounded-20 flex flex-col gap-15 overflow-hidden animate-in fade-in slide-in-from-bottom-4 p-20 bg-white"
    >
      {/* 헤더 영역 */}
      <section className="w-full flex items-center justify-between px-4 pb-15 border-b border-primary-50">
        <span className="text-24 font-medium text-secondary-500">브레인스토밍 노트</span>
        {view === VIEW_TYPE.LIST ? (
          <IconButton Icon={CancelIcon} theme="note" onClick={onClose} />
        ) : (
          <IconButton Icon={PrevIcon} theme="note" onClick={() => setView(VIEW_TYPE.LIST)} />
        )}
      </section>

      {view === VIEW_TYPE.LIST ? <NoteList /> : <NoteDetail />}
    </div>
  );
};

export default BrainstormNote;
