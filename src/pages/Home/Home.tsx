import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import { useContext } from 'react';
import { EditModeContext } from '@schoolApp/shared/context/edit-mode.context';

export default function Home() {
  const { editMode, toggle } = useContext(EditModeContext);

  return (
    <div className='flex h-full flex-col'>
      <Header editMode={editMode} toggleEditMode={() => toggle()} />
      <Outlet />
    </div>
  );
}
