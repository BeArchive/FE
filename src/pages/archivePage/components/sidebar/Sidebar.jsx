import { useState } from 'react';
import { cn } from '../../../../lib/utils';
import useNavigation from '../../../../hooks/useNavigation';
import { LuCirclePlus } from 'react-icons/lu';
import { FaRegCircleCheck, FaRegCircleXmark } from 'react-icons/fa6';
import editIcon from '../../../../assets/icons/edit_icon.svg';

export default function Sidebar({ folders, setFolders }) {
  const { goTo } = useNavigation();
  const [folderList, setFolderList] = useState(folders);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editingFolderName, setEditingFolderName] = useState('');

  const handleFolderSelect = (folderId) => {
    setSelectedFolderId(folderId);
    goTo(`/archive/${folderId}`);
  };

  const handleEditClick = (e, folder) => {
    e.stopPropagation();
    setEditingFolderId(folder.id);
    setEditingFolderName(folder.name);
  };

  const handleSaveFolder = (e, folderId) => {
    e.stopPropagation();
    if (editingFolderName.trim()) {
      const updatedFolders = folderList.map((f) =>
        f.id === folderId ? { ...f, name: editingFolderName } : f,
      );
      setFolderList(updatedFolders);
      setFolders(updatedFolders);
    }
    setEditingFolderId(null);
  };

  const handleCancelEdit = (e) => {
    e.stopPropagation();
    setEditingFolderId(null);
    setEditingFolderName('');
  };

  return (
    <div className="flex flex-col h-full w-290 bg-white border-r rounded-tr-20 border-primary-50">
      {/* 헤더 - "폴더" */}
      <div className="flex items-center justify-between px-16 py-10 mt-31 mx-20 rounded-100 transition-colors duration-200 hover:bg-primary-0 active:bg-primary-50">
        <p className="font-medium text-20 text-secondary-500 leading-24">폴더</p>
        <button
          className="flex items-center justify-center w-23 h-23 text-primary-main"
          aria-label="폴더 추가"
        >
          <LuCirclePlus className="w-full h-full" />
        </button>
      </div>

      {/* 구분선 */}
      <div className="h-1 bg-primary-50 my-10 mx-20 " />

      {/* 폴더 목록 */}
      <div className="flex flex-col gap-10 px-16 overflow-y-auto flex-1 mt-10">
        {folderList.map((folder) => {
          const isSelected = selectedFolderId === folder.id;
          const isEditing = editingFolderId === folder.id;
          const folderItemStyles = cn(
            'flex items-center px-20 py-10 rounded-100',
            'cursor-pointer transition-all duration-200',
            isEditing
              ? 'bg-gray-50'
              : isSelected
                ? 'bg-primary-50'
                : 'bg-transparent hover:bg-primary-0 active:bg-primary-50',
          );

          return (
            <div
              key={folder.id}
              className={cn(folderItemStyles, 'group')}
              onClick={() => handleFolderSelect(folder.id)}
            >
              {isEditing ? (
                <>
                  <div className="flex flex-col w-155">
                    <input
                      type="text"
                      value={editingFolderName}
                      onChange={(e) => setEditingFolderName(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-transparent border-none focus:outline-none text-16 font-medium text-secondary-500 leading-24 w-full"
                      autoFocus
                    />
                    <div className="h-1 bg-secondary-100 w-full" />
                  </div>
                  <div className="flex gap-14 ml-auto items-center">
                    <button
                      className="flex items-center justify-center w-19 h-19 text-primary-400 hover:text-primary-main transition-colors"
                      aria-label="저장"
                      onClick={(e) => handleSaveFolder(e, folder.id)}
                    >
                      <FaRegCircleCheck className="w-full h-full" />
                    </button>
                    <button
                      className="flex items-center justify-center w-19 h-19 text-secondary-300 hover:text-secondary-500 transition-colors"
                      aria-label="취소"
                      onClick={handleCancelEdit}
                    >
                      <FaRegCircleXmark className="w-full h-full" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-16 font-medium text-secondary-500 leading-24 flex-1 truncate">
                    {folder.name.length > 8 ? `${folder.name.slice(0, 8)}...` : folder.name}
                  </p>
                  <button
                    className="ml-auto flex items-center justify-center w-23 h-23 transition-all duration-200 hover:brightness-75"
                    aria-label={`${folder.name} 편집`}
                    onClick={(e) => handleEditClick(e, folder)}
                  >
                    <img src={editIcon} alt="편집" className="w-full h-full" />
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
