import folderImage from '../../../assets/images/folder_btn.webp';
import { cn } from '../../../lib/utils';
import useNavigation from '../../../hooks/useNavigation';
import { useArchiveStore } from '../../../store/archiveStore';

export default function FolderCard({ folderId, folderName = '폴더명', className }) {
  const { goTo } = useNavigation();
  const { setActiveFolderId, setHoveredFolderId, getFolderStyle } = useArchiveStore();

  const handleFolderClick = () => {
    setActiveFolderId(folderId);
    goTo(`/archive/${folderId}`);
  };

  const getCardStyles = () => {
    const bgStyle = getFolderStyle(folderId);

    return cn(
      'flex items-center justify-center p-20 rounded-20',
      'transition-all duration-200',
      'cursor-pointer shrink-0',
      bgStyle,
      bgStyle === 'bg-transparent' && 'hover:bg-primary-0',
      className,
    );
  };

  return (
    <div
      className={getCardStyles()}
      onClick={handleFolderClick}
      onMouseEnter={() => setHoveredFolderId(folderId)}
      onMouseLeave={() => setHoveredFolderId(null)}
      onMouseDown={() => setActiveFolderId(folderId)}
      onMouseUp={() => setActiveFolderId(null)}
    >
      <div className="flex flex-col gap-18 items-center w-128">
        {/* 폴더 이미지 */}
        <div className="h-96 w-128">
          <img src={folderImage} alt={folderName} className="w-full h-full object-contain" />
        </div>

        {/* 폴더 이름 */}
        <p className="font-medium text-16 text-center text-secondary-500 break-words w-full">
          {folderName.length > 8 ? `${folderName.slice(0, 8)}...` : folderName}
        </p>
      </div>
    </div>
  );
}
