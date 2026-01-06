import { useState } from 'react';
import FolderList from '../archiveBoard/FolderList';
import Sidebar from '../sidebar/Sidebar';

export default function ArchiveBoard() {
  const [folders, setFolders] = useState([
    { id: 1, name: '폴더명1' },
    { id: 2, name: '폴더명2' },
    { id: 3, name: '폴더명3' },
    { id: 4, name: '안녕하세요' },
  ]);

  return (
    <div className="flex w-full h-full">
      {/* 사이드바 */}
      <div className="rounded-tr-20 shadow-basic">
        <Sidebar folders={folders} setFolders={setFolders} />
      </div>

      {/* 아카이브 보드 영역 */}
      <div className="flex-1 bg-white rounded-20 shadow-basic flex flex-col ml-28 mr-20 mb-20">
        {/* 헤더 */}
        <div className="pt-41 px-41 pb-18 mx-20 border-b border-primary-50 text-left">
          <p className="font-medium text-20 text-secondary-500 leading-24">아카이브 보드</p>
        </div>

        {/* 폴더 리스트 */}
        <div className="flex-1 overflow-y-auto flex flex-col items-start justify-start">
          <FolderList folders={folders} />
        </div>
      </div>
    </div>
  );
}
