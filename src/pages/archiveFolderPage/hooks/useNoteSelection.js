import { useState } from 'react';

export function useNoteSelection() {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (noteId) => {
    setSelected((prev) =>
      prev.includes(noteId) ? prev.filter((id) => id !== noteId) : [...prev, noteId],
    );
  };

  const clearSelection = () => {
    setSelected([]);
  };

  const deselectNote = (noteId) => {
    setSelected((prev) => prev.filter((id) => id !== noteId));
  };

  return {
    selected,
    toggleSelect,
    clearSelection,
    deselectNote,
  };
}
