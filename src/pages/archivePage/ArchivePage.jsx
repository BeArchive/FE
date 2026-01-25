import { cn } from '../../lib/utils';
import Sidebar from './components/Sidebar';
import FolderCard from './components/FolderCard';
import ConfirmModal from '../../components/modal/ConfirmModal';
import archiveIcon from '../../assets/images/archive_empty_logo.svg';
import { useArchiveStore } from '../../store/archiveStore';
import { useFoldersQuery } from './hooks/useFoldersQuery';
import { useFolderDnd } from './hooks/useFolderDnd';
import { deleteFolder as deleteFolderApi } from '../../apis/folderApi';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import SortableFolderItem from './components/SortableFolderItem';

const ArchivePage = () => {
  const { folders, modal, deleteFolder, closeModal } = useArchiveStore();
  const { isOpen, variant, data } = modal;

  useFoldersQuery(); // 폴더 조회
  const { sensors, handleDragEnd } = useFolderDnd();

  // 폴더 삭제 처리
  const handleDeleteFolder = async (folderId) => {
    try {
      await deleteFolderApi(folderId);
      deleteFolder(folderId);
      closeModal();
    } catch (error) {
      console.error('폴더 삭제 실패:', error);
      closeModal();
    }
  };

  return (
    <div className="w-full h-full bg-primary-0 flex">
      {/* 사이드바 */}
      <div className="rounded-tr-20 shadow-basic">
        <Sidebar />
      </div>

      {/* 아카이브 보드 영역 */}
      <div className="flex-1 bg-white rounded-20 shadow-basic flex flex-col ml-28 mr-20 mb-20 relative">
        {/* 헤더 */}
        <div className="pt-41 px-41 pb-18 mx-20 border-b border-primary-50 text-left">
          <p className="font-medium text-20 text-secondary-500 leading-24">아카이브 보드</p>
        </div>

        {/* 폴더 리스트 */}
        <div className="flex-1 overflow-y-auto flex flex-col items-start justify-start">
          <div
            className={cn(
              'grid grid-cols-4 gap-120 px-35 py-56 w-full h-full',
              folders.length > 0 ? 'content-start' : 'place-items-center',
            )}
          >
            {folders.length > 0 ? (
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                sensors={sensors}
              >
                <SortableContext items={folders.map((f) => f.id)} strategy={rectSortingStrategy}>
                  {folders.map((folder) => (
                    <SortableFolderItem key={folder.id} id={folder.id}>
                      {(listeners) => (
                        <div {...listeners}>
                          <FolderCard folderId={folder.id} folderName={folder.name} />
                        </div>
                      )}
                    </SortableFolderItem>
                  ))}
                </SortableContext>
              </DndContext>
            ) : (
              <div className="col-span-4 flex flex-col gap-17 items-center justify-center">
                {/* 빈 상태 아카이브 */}
                <div
                  className="flex items-center justify-center"
                  style={{ width: '177', height: '228', padding: '4 0 4.83 0' }}
                >
                  <img
                    src={archiveIcon}
                    alt="폴더가 없습니다"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="font-medium text-24 text-secondary-500 leading-36">
                  폴더가 없습니다.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 모달 */}
        <ConfirmModal
          open={isOpen}
          hideCancel={variant === 'duplicate'}
          title={
            variant === 'delete' ? '폴더 삭제' : variant === 'duplicate' ? '폴더 생성 중복' : '확인'
          }
          description={
            variant === 'delete'
              ? [
                  `(${folders.find((f) => f.id === data)?.name}) 폴더를 삭제하시겠습니까?`,
                  '삭제하실 경우 복구할 수 없습니다.',
                ]
              : variant === 'duplicate'
                ? ['기존 폴더명과 중복되어 생성이 불가능합니다.', '폴더명을 변경해 주세요.']
                : []
          }
          cancelLabel="취소하기"
          confirmLabel={variant === 'delete' ? '삭제하기' : '확인'}
          onCancel={() => closeModal()}
          onConfirm={() => {
            if (variant === 'delete') {
              handleDeleteFolder(data);
            } else {
              closeModal();
            }
          }}
        />
      </div>
    </div>
  );
};

export default ArchivePage;
