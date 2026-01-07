import { useState } from 'react';
import FolderList from '../archiveBoard/FolderList';
import Sidebar from '../sidebar/Sidebar';
import ConfirmModal from '../../../../components/modal/ConfirmModal';
import { useFolderState } from '../../hooks/useFolderState';

export default function ArchiveBoard() {
  const [folders, setFolders] = useState([
    { id: 1, name: '폴더명1' },
    { id: 2, name: '폴더명2' },
    { id: 3, name: '폴더명3' },
    { id: 4, name: '안녕하세요' },
  ]);
  const {
    activeFolderId,
    setActiveFolderId,
    hoveredFolderId,
    setHoveredFolderId,
    editingFolderId,
    setEditingFolderId,
  } = useFolderState();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState('default');
  const [modalFolderName, setModalFolderName] = useState('');

  const openDeleteModal = (name) => {
    setModalVariant('delete');
    setModalFolderName(name);
    setModalOpen(true);
  };

  const openDuplicateModal = (name) => {
    setModalVariant('duplicate');
    setModalFolderName(name);
    setModalOpen(true);
  };

  return (
    <div className="flex w-full h-full">
      {/* 사이드바 */}
      <div className="rounded-tr-20 shadow-basic">
        <Sidebar
          folders={folders}
          setFolders={setFolders}
          activeFolderId={activeFolderId}
          onActiveFolder={setActiveFolderId}
          hoveredFolderId={hoveredFolderId}
          onHoverFolder={setHoveredFolderId}
          editingFolderId={editingFolderId}
          onEditingFolder={setEditingFolderId}
          onRequestDelete={openDeleteModal}
          onRequestDuplicate={openDuplicateModal}
        />
      </div>

      {/* 아카이브 보드 영역 */}
      <div className="flex-1 bg-white rounded-20 shadow-basic flex flex-col ml-28 mr-20 mb-20 relative">
        {/* 헤더 */}
        <div className="pt-41 px-41 pb-18 mx-20 border-b border-primary-50 text-left">
          <p className="font-medium text-20 text-secondary-500 leading-24">아카이브 보드</p>
        </div>

        {/* 폴더 리스트 */}
        <div className="flex-1 overflow-y-auto flex flex-col items-start justify-start">
          <FolderList
            folders={folders}
            activeFolderId={activeFolderId}
            onActiveFolder={setActiveFolderId}
            hoveredFolderId={hoveredFolderId}
            onHoverFolder={setHoveredFolderId}
            editingFolderId={editingFolderId}
          />
        </div>

        {/* 모달 */}
        <ConfirmModal
          open={modalOpen}
          hideCancel={modalVariant === 'duplicate'}
          title={
            modalVariant === 'delete'
              ? '폴더 삭제'
              : modalVariant === 'duplicate'
                ? '폴더 생성 중복'
                : '확인'
          }
          description={
            modalVariant === 'delete'
              ? [
                  `(${modalFolderName}) 폴더를 삭제하시겠습니까?`,
                  '삭제하실 경우 복구할 수 없습니다.',
                ]
              : modalVariant === 'duplicate'
                ? ['기존 폴더명과 중복되어 생성이 불가능합니다.', '폴더명을 변경해 주세요.']
                : []
          }
          cancelLabel="취소하기"
          confirmLabel={modalVariant === 'delete' ? '삭제하기' : '확인'}
          onCancel={() => setModalOpen(false)}
          onConfirm={() => {
            if (modalVariant === 'delete') {
              setFolders((prev) => prev.filter((f) => f.name !== modalFolderName));
            }
            setModalOpen(false);
          }}
        />
      </div>
    </div>
  );
}
