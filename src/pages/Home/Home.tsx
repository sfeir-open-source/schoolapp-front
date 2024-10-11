import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import { useContext, useEffect } from 'react';
import { EditModeContext, useEditMode } from '@schoolApp/shared/context/edit-mode.context';

export default function Home() {
  const { editMode, toggle } = useEditMode();

  const onClick = () => console.log('CLICK');

  useEffect(() => console.log({ editMode }), [editMode]);

  return (
    <div className='flex h-full flex-col'>
      <Header editMode={editMode} toggleEditMode={toggle} />
      <Outlet />
    </div>
  );
}
