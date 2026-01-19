import NOTE_BTN from '@assets/images/note_btn.webp';
import { cn } from '../../../lib/utils';

const BrainstormNoteButton = ({ isActive, onClick, className }) => {
  // 스타일
  const layoutStyles =
    'flex-row-center w-70 h-70 shrink-0 overflow-hidden pt-15 pr-11 pb-15 pl-21 justify-end items-center active:scale-95';

  const visualStyles = 'bg-primary-50 rounded-full shadow-sub transition-all duration-200';

  const borderStyles = cn(
    'border-1',
    isActive ? 'border-primary-200' : 'border-transparent hover:border-primary-200',
  );

  return (
    <button onClick={onClick} className={cn(layoutStyles, visualStyles, borderStyles, className)}>
      <img src={NOTE_BTN} alt="Note Icon" className="object-contain w-full h-full" />
    </button>
  );
};

export default BrainstormNoteButton;
