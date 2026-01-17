import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useArchiveStore } from '../../store/archiveStore';
import { useNoteStore } from '../../store/noteStore';
import { useNoteSelection } from './hooks/useNoteSelection';
import { useNoteActions } from './hooks/useNoteActions';
import Sidebar from '../archivePage/components/Sidebar';
import UploadModal from '../../components/modal/UploadModal';
import NoteDeleteModal from '../../components/modal/NoteDeleteModal';
import FolderHeader from './components/FolderHeader';
import EmptyState from './components/EmptyState';
import NoteListItem from './components/NoteListItem';

export default function ArchiveFolderPage() {
  const { folderId: folderIdStr } = useParams();
  const folderId = parseInt(folderIdStr, 10);
  const folders = useArchiveStore((state) => state.folders);

  const notes = useNoteStore((state) => state.getNotes(folderId));
  const folder = folders.find((f) => f.id === folderId);

  const { selected, toggleSelect, clearSelection, deselectNote } = useNoteSelection();
  const { modals } = useNoteActions(folderId, (deletedId) => deselectNote(deletedId));
  const uploadModal = modals.upload;
  const deleteModal = modals.delete;
  const [hoveredNote, setHoveredNote] = useState(null);

  useEffect(() => {
    clearSelection();
  }, [folderId]);

  const onConfirmUpload = (notes) => {
    uploadModal.handle(notes);
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
          hasNotes={notes.length > 0}
          onUploadClick={() => uploadModal.setOpen(true)}
        />

        {/* 내용 영역 */}
        <div className="flex-1 overflow-y-auto">
          {notes.length === 0 ? (
            // 빈 상태
            <EmptyState onUploadClick={() => uploadModal.setOpen(true)} />
          ) : (
            // 노트 리스트
            <div className="flex flex-col gap-15 px-41 pb-110">
              {notes.map((note) => (
                <NoteListItem
                  key={note.id}
                  note={note}
                  isSelected={selected.includes(note.id)}
                  isHovered={hoveredNote === note.id}
                  onSelect={() => toggleSelect(note.id)}
                  onDelete={() => deleteModal.openModal(note)}
                  onMouseEnter={() => setHoveredNote(note.id)}
                  onMouseLeave={() => setHoveredNote(null)}
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

        <NoteDeleteModal
          open={deleteModal.open}
          note={deleteModal.note}
          onConfirm={deleteModal.confirm}
          onCancel={deleteModal.close}
        />
      </div>
    </div>
  );
}
