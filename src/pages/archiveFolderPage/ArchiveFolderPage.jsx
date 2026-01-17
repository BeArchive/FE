import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useArchiveStore } from '../../store/archiveStore';
import { useNoteStore } from '../../store/noteStore';
import { useChatSelection } from './hooks/useChatSelection';
import { useChatActions } from './hooks/useChatActions';
import Sidebar from '../archivePage/components/Sidebar';
import UploadModal from '../../components/modal/UploadModal';
import ChatDeleteModal from '../../components/modal/ChatDeleteModal';
import FolderHeader from './components/FolderHeader';
import EmptyState from './components/EmptyState';
import ChatListItem from './components/ChatListItem';

export default function ArchiveFolderPage() {
  const { folderId: folderIdStr } = useParams();
  const folderId = parseInt(folderIdStr, 10);
  const folders = useArchiveStore((state) => state.folders);

  const chats = useNoteStore((state) => state.getNotes(folderId));
  const folder = folders.find((f) => f.id === folderId);

  const { selected, toggleSelect, clearSelection, deselectChat } = useChatSelection();
  const { modals } = useChatActions(folderId, (deletedId) => deselectChat(deletedId));
  const uploadModal = modals.upload;
  const deleteModal = modals.delete;
  const [hoveredChat, setHoveredChat] = useState(null);

  useEffect(() => {
    clearSelection();
  }, [folderId]);

  const onConfirmUpload = (chats) => {
    uploadModal.handle(chats);
    clearSelection();
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
        <FolderHeader
          folderName={folder ? folder.name : '폴더'}
          hasChats={chats.length > 0}
          onUploadClick={() => uploadModal.setOpen(true)}
        />

        {/* 내용 영역 */}
        <div className="flex-1 overflow-y-auto">
          {chats.length === 0 ? (
            // 빈 상태
            <EmptyState onUploadClick={() => uploadModal.setOpen(true)} />
          ) : (
            // 채팅 리스트
            <div className="flex flex-col gap-15 px-41 pb-110">
              {chats.map((chat) => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  isSelected={selected.includes(chat.id)}
                  isHovered={hoveredChat === chat.id}
                  onSelect={() => toggleSelect(chat.id)}
                  onDelete={() => deleteModal.openModal(chat)}
                  onMouseEnter={() => setHoveredChat(chat.id)}
                  onMouseLeave={() => setHoveredChat(null)}
                />
              ))}
            </div>
          )}
        </div>

        <UploadModal
          open={uploadModal.open}
          onClose={() => uploadModal.setOpen(false)}
          onConfirm={onConfirmUpload}
        />

        <ChatDeleteModal
          open={deleteModal.open}
          chat={deleteModal.chat}
          onConfirm={deleteModal.confirm}
          onCancel={deleteModal.close}
        />
      </div>
    </div>
  );
}
