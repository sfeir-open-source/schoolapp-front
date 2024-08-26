import PrimaryButton from '@schoolApp/shared/components/PrimaryButton';
import { Link } from 'react-router-dom';
import { AiFillEdit, AiFillEye } from 'react-icons/ai';
import { MouseEventHandler } from 'react';
import { auth } from '@schoolApp/core/firebase/firebase.config';

interface HeaderProps {
  editMode: boolean;
  toggleEditMode: MouseEventHandler<HTMLButtonElement>;
}

export default function Header({ editMode, toggleEditMode }: HeaderProps) {
  const { signOut, currentUser: user } = auth;

  return (
    <header
      className={
        'fixed z-50 flex w-full flex-wrap items-center justify-between border border-b border-slate-200 p-4 backdrop-blur-sm ' +
        (editMode ? 'bg-slate-200/70' : 'bg-slate-100/70')
      }>
      <Link to={`/catalogue`}>
        <div className='bg-gradient-to-r from-cyan-500 to-blue-500/50 bg-clip-text font-extrabold text-transparent'>
          SchoolApp
        </div>
      </Link>

      <div className='flex items-center gap-4 lg:order-1'>
        <div className='flex items-center gap-2'>
          {editMode ? (
            <button onClick={toggleEditMode}>
              <AiFillEdit />
            </button>
          ) : (
            <button onClick={toggleEditMode}>
              <AiFillEye size={20} />
            </button>
          )}
          <span className='hidden md:flex'>{user?.displayName}</span>
          <div>
            <img
              className='w-7 rounded-full'
              src={user?.photoURL ?? ''}
              alt={'User profile picture'}
            />
          </div>
        </div>
        <PrimaryButton text={'Sign Out'} onClick={signOut} />
      </div>
    </header>
  );
}
