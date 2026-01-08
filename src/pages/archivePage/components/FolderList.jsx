import { cn } from '../../../lib/utils';
import archiveIcon from '../../../assets/images/archive_empty_logo.svg';
import FolderCard from './FolderCard';

export default function FolderList({
  folders = [],
  activeFolderId,
  onActiveFolder,
  hoveredFolderId,
  onHoverFolder,
  editingFolderId,
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-4 gap-120 px-35 py-56 w-full h-full',
        folders.length > 0 ? 'content-start' : 'place-items-center',
      )}
    >
      {folders.length > 0 ? (
        folders.map((folder) => (
          <FolderCard
            key={folder.id}
            folderId={folder.id}
            folderName={folder.name}
            isActive={activeFolderId === folder.id}
            onActive={onActiveFolder}
            isHovered={hoveredFolderId === folder.id}
            onHover={onHoverFolder}
            isEditing={editingFolderId === folder.id}
          />
        ))
      ) : (
        <div className="col-span-4 flex flex-col gap-17 items-center justify-center">
          {/* 빈 상태 아카이브*/}
          <div
            className="flex items-center justify-center"
            style={{ width: '177px', height: '228px', padding: '4px 0 4.83px 0' }}
          >
            <img src={archiveIcon} alt="폴더가 없습니다" className="w-full h-full object-contain" />
          </div>
          <p className="font-medium text-24 text-secondary-500 leading-36">폴더가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
