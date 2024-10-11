import { EditModeContext } from '@schoolApp/shared/context/edit-mode.context';
import { ReactNode, useState } from 'react';

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState<boolean>(true);

  const toggle = () => setEditMode(!editMode);

  return <EditModeContext.Provider value={{ editMode, toggle }}>{children}</EditModeContext.Provider>;
}
