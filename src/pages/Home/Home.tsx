import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import { useEditMode } from './hooks/edit-mode.hook';
import { useContext } from 'react';
import { EditModeContext } from '../../shared/context/edit-mode.context';
import AddSchoolButton from './components/add-school-button/AddSchoolButton';

export default function Home() {
  const { editMode, toggle } = useContext(EditModeContext);

  return (
    <div className='flex flex-col'>
      <Header editMode={editMode} toggleEditMode={() => toggle()} />
      <Outlet />
    </div>
  );
}
