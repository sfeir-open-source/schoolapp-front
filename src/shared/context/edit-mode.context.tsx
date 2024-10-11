import { createContext, ReactNode, useContext } from 'react';

interface EditModeContextType {
  editMode: boolean;
  toggle: () => void;
}
export const EditModeContext = createContext<EditModeContextType>({} as EditModeContextType);

export const useEditMode = () => useContext(EditModeContext);
