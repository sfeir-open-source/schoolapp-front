import { createContext } from 'react';

interface EditModeContextType {
  editMode: boolean;
  toggle: () => void;
}
export const EditModeContext = createContext<EditModeContextType>({} as EditModeContextType);
