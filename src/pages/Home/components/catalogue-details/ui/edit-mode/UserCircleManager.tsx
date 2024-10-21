import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useOutsideClick } from '../../../../hooks/useOutsideClick';
import CustomInput from '../../../../../../shared/components/Input';
import { AiOutlinePlus } from 'react-icons/ai';
import { User } from '@schoolApp/shared/interfaces/users.interface';
import { UseQueryResult } from '@tanstack/react-query';

interface UserListProps {
  userQueryResult: UseQueryResult<User[]>;
  teachers: User[];
  onUserClick: (user: User) => void;
}

const UserList = ({ userQueryResult, teachers, onUserClick }: UserListProps) => {
  const { data: users, isLoading } = userQueryResult;

  console.log({ users });

  const toggle = () => console.log('implement toggle');

  const isTeacher = (user: User) => teachers.some(teacher => teacher.uid === user.uid);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (users) {
    return (
      <div className='flex flex-col gap-1'>
        <span className='bold text-sm font-bold text-slate-600'>Utilisateurs</span>
        {users.map((user, id) => (
          <button
            key={id}
            onClick={() => onUserClick(user)}
            className='relative flex w-full items-center gap-2 rounded-md bg-slate-100 p-2'
          >
            <span className='relative flex h-7 w-7 shrink-0 overflow-hidden rounded-full' onClick={toggle}>
              <img className='aspect-square h-full w-full' src={user.photoURL} />
            </span>
            <span className='text-slate-700'>{user.displayName}</span>
            {isTeacher(user) ? <AiOutlineClose className='absolute right-4 cursor-pointer ' /> : null}
          </button>
        ))}
      </div>
    );
  }
};

interface UserCircleManagerProps {
  users: User[];
  userQueryResult: UseQueryResult<User[]>;
  onUserClick: (user: User) => void;
}
export default function UserCircleManager({ users: teachers, userQueryResult, onUserClick }: UserCircleManagerProps) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOutsideAlerter = () => setOpen(false);
  const ref = useOutsideClick(handleOutsideAlerter);

  const toggle = () => setOpen(!isOpen);

  const handleInputChange = () => console.log('Implement handleInputChange');

  return (
    <>
      <div ref={ref} className='relative flex flex-col gap-1'>
        <div className='flex items-center justify-center gap-2'>
          {teachers.map((teacher, id) => (
            <div key={id} className='relative w-fit'>
              <span className='relative flex h-8 w-8 shrink-0 cursor-pointer overflow-hidden rounded-full'>
                <img className='aspect-square h-full w-full' src={teacher.photoURL} />
              </span>
            </div>
          ))}
          <div className='relative w-fit'>
            <button
              className='cursor-pointer rounded-full border border-slate-400 bg-slate-200/70 p-2 backdrop-blur-sm hover:bg-slate-300 active:bg-slate-200'
              onClick={toggle}
            >
              <AiOutlinePlus />
            </button>
          </div>
        </div>
        {isOpen && (
          <>
            <div className='left0 absolute top-16 flex w-60 transform flex-col gap-4 rounded-lg border border-gray-300 bg-white p-3 shadow-lg dark:bg-gray-700'>
              <CustomInput
                size='sm'
                value=''
                onInputChange={handleInputChange}
                placeholder='Rechercher un utilisateur'
              />
              <UserList userQueryResult={userQueryResult} teachers={teachers} onUserClick={onUserClick} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
