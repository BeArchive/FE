import { useState } from 'react';

export function useChatSelection() {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (chatId) => {
    setSelected((prev) =>
      prev.includes(chatId) ? prev.filter((id) => id !== chatId) : [...prev, chatId],
    );
  };

  const clearSelection = () => {
    setSelected([]);
  };

  const deselectChat = (chatId) => {
    setSelected((prev) => prev.filter((id) => id !== chatId));
  };

  return {
    selected,
    toggleSelect,
    clearSelection,
    deselectChat,
  };
}
