import { cn } from '../../lib/utils';
import Sidebar from './components/Sidebar';
import FolderCard from './components/FolderCard';
import ConfirmModal from '../../components/modal/ConfirmModal';
import archiveIcon from '../../assets/images/archive_empty_logo.svg';
import { useArchiveStore } from './store/archiveStore';

const ArchivePage = () => {
  const { folders, modal, deleteFolder, closeModal, openModal } = useArchiveStore();

  const { isOpen, variant, data } = modal;

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
              folders.map((folder) => (
                <FolderCard key={folder.id} folderId={folder.id} folderName={folder.name} />
              ))
            ) : (
              <div className="col-span-4 flex flex-col gap-17 items-center justify-center">
                {/* 빈 상태 아카이브 */}
                <div
                  className="flex items-center justify-center"
                  style={{ width: '177px', height: '228px', padding: '4px 0 4.83px 0' }}
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
              deleteFolder(data);
            }
            closeModal();
          }}
        />
      </div>
    </div>
  );
};

export default ArchivePage;
