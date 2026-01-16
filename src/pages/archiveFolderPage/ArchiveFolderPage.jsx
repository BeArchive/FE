import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useArchiveStore } from '../../store/archiveStore';
import { useNoteStore } from '../../store/noteStore';
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
  const addNotes = useNoteStore((state) => state.addNotes);
  const deleteNote = useNoteStore((state) => state.deleteNote);
  const folder = folders.find((f) => f.id === folderId);

  const [selected, setSelected] = useState([]);
  const [openUpload, setOpenUpload] = useState(false);
  const [hoveredNote, setHoveredNote] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const toggleSelect = (noteId) => {
    setSelected((prev) =>
      prev.includes(noteId) ? prev.filter((id) => id !== noteId) : [...prev, noteId],
    );
  };

  const onConfirmUpload = (notes) => {
    // notes는 이미 { id, name, url, date } 형태로 전달됨
    addNotes(folderId, notes);
    setOpenUpload(false);
  };

  const handleDeleteClick = (note) => {
    setNoteToDelete(note);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (noteToDelete) {
      deleteNote(folderId, noteToDelete.id);
      setSelected((prev) => prev.filter((id) => id !== noteToDelete.id));
      setDeleteModalOpen(false);
      setNoteToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setNoteToDelete(null);
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
          onUploadClick={() => setOpenUpload(true)}
        />

        {/* 내용 영역 */}
        <div className="flex-1 overflow-y-auto">
          {notes.length === 0 ? (
            // 빈 상태
            <EmptyState onUploadClick={() => setOpenUpload(true)} />
          ) : (
            // 노트 리스트
            <div className="flex flex-col gap-[15px] px-[41px] pb-[110px]">
              {notes.map((note) => (
                <NoteListItem
                  key={note.id}
                  note={note}
                  isSelected={selected.includes(note.id)}
                  isHovered={hoveredNote === note.id}
                  onSelect={() => toggleSelect(note.id)}
                  onDelete={() => handleDeleteClick(note)}
                  onMouseEnter={() => setHoveredNote(note.id)}
                  onMouseLeave={() => setHoveredNote(null)}
                />
              ))}
            </div>
          )}
        </div>

        <UploadModal
          open={openUpload}
          onClose={() => setOpenUpload(false)}
          onConfirm={onConfirmUpload}
        />

        <NoteDeleteModal
          open={deleteModalOpen}
          note={noteToDelete}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      </div>
    </div>
  );
}
