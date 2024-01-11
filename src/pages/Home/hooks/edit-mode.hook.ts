import { useState } from 'react';

export const useEditMode = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  return { editMode, toggle: () => setEditMode(!editMode) };
};
