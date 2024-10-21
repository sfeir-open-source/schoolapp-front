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
  onUserClick?: (user: User) => void;
  readonly?: boolean;
}
export default function UserCircleManager({
  users,
  userQueryResult,
  onUserClick,
  readonly = false,
}: UserCircleManagerProps) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOutsideAlerter = () => setOpen(false);
  const ref = useOutsideClick(handleOutsideAlerter);

  const toggle = () => setOpen(!isOpen);

  const handleInputChange = () => console.log('Implement handleInputChange');

  const handleUserClick = (user: User) => {
    if (!onUserClick) return;

    onUserClick(user);
  };

  return (
    <>
      <div ref={ref} className='relative flex flex-col gap-1'>
        <div className='flex items-center gap-2'>
          {users.map((teacher, id) => (
            <div key={id} className='relative w-fit' data-tooltip='#transition_tooltip'>
              <span className='relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full'>
                <img
                  className='aspect-square h-full w-full'
                  title={teacher.email}
                  src={teacher.photoURL}
                  alt={teacher.displayName}
                />
              </span>
            </div>
          ))}
          {!readonly ? (
            <div className='relative w-fit'>
              <button
                className='z-10 cursor-pointer rounded-full border border-slate-400 bg-slate-200/70 p-2 backdrop-blur-sm hover:bg-slate-300 active:bg-slate-200'
                onClick={toggle}
              >
                <AiOutlinePlus />
              </button>
            </div>
          ) : null}
        </div>
        {isOpen && (
          <>
            <div className='left0 absolute top-10 z-50 flex w-60 transform flex-col gap-4 rounded-lg border border-gray-300 bg-white p-3 shadow-lg dark:bg-gray-700'>
              <CustomInput
                size='sm'
                value=''
                onInputChange={handleInputChange}
                placeholder='Rechercher un utilisateur'
              />
              <UserList userQueryResult={userQueryResult} teachers={users} onUserClick={handleUserClick} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
