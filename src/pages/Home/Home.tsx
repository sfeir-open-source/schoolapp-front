import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import { useEffect } from 'react';
import { useEditMode } from '@schoolApp/shared/context/edit-mode.context';

export default function Home() {
  const { editMode, toggle } = useEditMode();

  return (
    <div className='flex h-full flex-col'>
      <Header editMode={editMode} toggleEditMode={toggle} />
      <Outlet />
    </div>
  );
}
