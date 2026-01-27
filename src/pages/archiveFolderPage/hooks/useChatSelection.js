import { useState, useCallback } from 'react';

export function useChatSelection() {
  const [selected, setSelected] = useState([]);

  const toggleSelect = useCallback((chatId) => {
    setSelected((prev) =>
      prev.includes(chatId) ? prev.filter((id) => id !== chatId) : [...prev, chatId],
    );
  }, []);

  const clearSelection = useCallback(() => {
    setSelected([]);
  }, []);

  const deselectChat = useCallback((chatId) => {
    setSelected((prev) => prev.filter((id) => id !== chatId));
  }, []);

  return {
    selected,
    toggleSelect,
    clearSelection,
    deselectChat,
  };
}
