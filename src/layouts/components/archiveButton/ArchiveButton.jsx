import FOLDER from '@assets/images/folder_btn.webp';
import { cn } from '../../../lib/utils';

const ArchiveButton = ({ onClick, className }) => {
  const layoutStyles =
    'flex justify-end items-center w-148 h-52 relative overflow-hidden cursor-pointer';
  const spacingStyles = 'pt-10 pr-22 pb-10 pl-82';
  const visualStyles = 'bg-primary-50 rounded-r-100 shadow-basic';

  return (
    <button onClick={onClick} className={cn(layoutStyles, spacingStyles, visualStyles, className)}>
      <img
        src={FOLDER}
        alt="Archive Folder"
        className="absolute object-contain h-32 w-44 right-22"
      />
    </button>
  );
};

export default ArchiveButton;
