import { useState } from 'react';
import NOTE_BTN from '@assets/images/note_btn.webp';
import { cn } from '../../../lib/utils';

const BrainstormNote = ({ onClick, className }) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = (e) => {
    setIsActive(!isActive);
    if (onClick) onClick(e);
  };

  // 스타일
  const layoutStyles =
    'flex-row-center w-70 h-70 shrink-0 overflow-hidden pt-15 pr-11 pb-15 pl-21 justify-end items-center';

  const visualStyles =
    'bg-primary-50 rounded-full shadow-[4px_4px_8px_0_rgba(196,196,196,0.16)] transition-all duration-200';

  const borderStyles = cn(
    'border-1',
    isActive ? 'border-primary-200' : 'border-transparent hover:border-primary-200',
  );

  return (
    <button
      onClick={handleToggle}
      className={cn(layoutStyles, visualStyles, borderStyles, className)}
    >
      <img src={NOTE_BTN} alt="Note Icon" className="object-contain w-full h-full" />
    </button>
  );
};

export default BrainstormNote;
