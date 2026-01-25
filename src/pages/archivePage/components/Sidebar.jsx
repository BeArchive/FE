import { useState } from 'react';
import { cn } from '../../../lib/utils';
import useNavigation from '../../../hooks/useNavigation';
import { LuCirclePlus } from 'react-icons/lu';
import { FaRegCircleCheck, FaRegCircleXmark } from 'react-icons/fa6';
import editIcon from '../../../assets/icons/edit_icon.svg';
import { useArchiveStore } from '../../../store/archiveStore';
import { useFolderDnd } from '../hooks/useFolderDnd';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableFolderItem from './SortableFolderItem';
import { createFolder, updateFolderName as updateFolderNameApi } from '../../../apis/folderApi';

export default function Sidebar() {
  const {
    folders,
    setFolders,
    editingFolderId,
    setEditingFolderId,
    setActiveFolderId,
    setHoveredFolderId,
    getFolderStyle,
    isDuplicateName,
    openModal,
    getNewFolderName,
    updateFolderName,
  } = useArchiveStore();

  const { goTo } = useNavigation();
  const [editingFolderName, setEditingFolderName] = useState('');
  const { sensors, handleDragEnd } = useFolderDnd();

  // 폴더 상태 스타일 반환
  const getFolderItemStyles = (folder) => {
    const bgStyle = getFolderStyle(folder.id);
    return cn(
      'flex items-center px-20 py-10 rounded-100',
      'cursor-pointer transition-all duration-200',
      bgStyle,
      bgStyle === 'bg-transparent' && 'hover:bg-primary-0',
    );
  };

  // 폴더 추가 핸들러
  const handleAddFolder = async () => {
    const newName = getNewFolderName();
    try {
      const folderData = await createFolder(newName);
      const newFolder = {
        id: folderData.folderId,
        name: folderData.folderName,
        folderOrder: folderData.folderOrder,
      };
      setFolders([...folders, newFolder]);
      setEditingFolderId(newFolder.id);
      setEditingFolderName(newFolder.name);
    } catch (error) {
      console.error('폴더 생성 실패:', error);
    }
  };

  const handleFolderSelect = (folderId) => {
    setActiveFolderId(folderId);
    goTo(`/archive/${folderId}`);
  };

  const handleEditClick = (e, folder) => {
    e.stopPropagation();
    setEditingFolderId(folder.id);
    setEditingFolderName(folder.name);
  };

  const commitRename = async (folderId, newName) => {
    try {
      await updateFolderNameApi(folderId, newName);
      updateFolderName(folderId, newName);
      setEditingFolderId(null);
      setEditingFolderName('');
    } catch (error) {
      console.error('폴더명 수정 실패:', error);
    }
  };

  return (
    <div className="flex flex-col h-full w-290 bg-white border-r rounded-tr-20 border-primary-50">
      {/* 헤더 - "폴더" */}
      <div className="flex items-center justify-between px-16 py-10 mt-31 mx-20 rounded-100 transition-colors duration-200 hover:bg-primary-0 active:bg-primary-50">
        <p className="font-medium text-20 text-secondary-500 leading-24">폴더</p>
        <button
          className="flex items-center justify-center w-23 h-23 text-primary-main"
          aria-label="폴더 추가"
          onClick={handleAddFolder}
        >
          <LuCirclePlus className="w-full h-full" />
        </button>
      </div>

      {/* 구분선 */}
      <div className="h-1 bg-primary-50 my-10 mx-20 " />

      {/* 폴더 목록 */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
        <SortableContext items={folders.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-10 px-16 overflow-y-auto flex-1 mt-10">
            {folders.map((folder) => {
              const isEditing = editingFolderId === folder.id;
              const folderItemStyles = getFolderItemStyles(folder);

              return (
                <SortableFolderItem key={folder.id} id={folder.id}>
                  {(listeners) => (
                    <div
                      className={cn(folderItemStyles, 'group')}
                      onClick={() => handleFolderSelect(folder.id)}
                      onMouseEnter={() => setHoveredFolderId(folder.id)}
                      onMouseLeave={() => setHoveredFolderId(null)}
                      onMouseDown={() => setActiveFolderId(folder.id)}
                      onMouseUp={() => setActiveFolderId(null)}
                      {...(isEditing ? {} : listeners)}
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
                              onClick={(e) => {
                                e.stopPropagation();
                                const proposed = editingFolderName.trim();
                                // 변경이 없는 경우
                                if (!proposed || proposed === folder.name) {
                                  setEditingFolderId(null);
                                  setEditingFolderName('');
                                  return;
                                }
                                // 중복 검사
                                if (isDuplicateName(proposed) && proposed !== folder.name) {
                                  openModal('duplicate', proposed);
                                  return;
                                }
                                // 이름 변경 저장
                                commitRename(folder.id, proposed);
                              }}
                            >
                              <FaRegCircleCheck className="w-full h-full" />
                            </button>
                            <button
                              className="flex items-center justify-center w-19 h-19 text-secondary-300 hover:text-secondary-500 transition-colors"
                              aria-label="삭제"
                              onClick={(ev) => {
                                ev.stopPropagation();
                                openModal('delete', folder.id);
                              }}
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
                            onMouseDown={(e) => e.stopPropagation()}
                            onTouchStart={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                          >
                            <img src={editIcon} alt="편집" className="w-full h-full" />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </SortableFolderItem>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
