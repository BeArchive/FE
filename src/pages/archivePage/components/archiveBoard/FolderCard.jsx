import folderImage from '../../../../assets/images/folder_btn.webp';
import { cn } from '../../../../lib/utils';
import useNavigation from '../../../../hooks/useNavigation';

export default function FolderCard({ folderId, folderName = '폴더명', className }) {
  const { goTo } = useNavigation();

  const handleFolderClick = () => {
    goTo(`/archive/${folderId}`);
  };

  const cardStyles = cn(
    'flex items-center justify-center p-20 rounded-20',
    'transition-all duration-200',
    'cursor-pointer bg-transparent shrink-0',
    'hover:bg-primary-0 active:bg-primary-50',
    className,
  );

  return (
    <div className={cardStyles} onClick={handleFolderClick}>
      <div className="flex flex-col gap-18 items-center w-128">
        {/* 폴더 이미지 */}
        <div className="h-96 w-128">
          <img src={folderImage} alt={folderName} className="w-full h-full object-contain" />
        </div>

        {/* 폴더 이름 */}
        <p className="font-medium text-16 text-center text-secondary-500 break-words w-full">
          {folderName}
        </p>
      </div>
    </div>
  );
}
