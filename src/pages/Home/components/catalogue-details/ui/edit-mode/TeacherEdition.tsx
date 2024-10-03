import React, { useEffect, useRef, useState } from 'react';
import { GoogleUser } from '../../../../../../shared/interfaces/google-user';
import { AiOutlineClose } from 'react-icons/ai';
import { useOutsideClick } from '../../../../hooks/useOutsideClick';
import CustomInput from '../../../../../../shared/components/Input';
import { School, Teacher } from '../../../../../../shared/interfaces/schools.interface';

interface TeacherEditionProps {
  teacher: Teacher | null;
}
export default function TeacherEdition({ teacher }: TeacherEditionProps) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOutsideAlerter = () => setOpen(false);
  const ref = useOutsideClick(handleOutsideAlerter);

  const toggle = () => setOpen(!isOpen);

  const handleInputChange = () => {
    console.log('HERE');
  };
  return (
    <>
      <div ref={ref} className='relative flex flex-col gap-1'>
        <p className='text-sm font-bold text-slate-600'>Professeur</p>
        <div className='relative w-fit'>
          <span className='relative flex h-8 w-8 shrink-0 cursor-pointer overflow-hidden rounded-full' onClick={toggle}>
            <img className='aspect-square h-full w-full' src={teacher?.picture} />
          </span>
          {isOpen && (
            <div className='left0 absolute top-12 flex w-60 transform flex-col gap-4 rounded-lg border border-gray-300 bg-white p-3 shadow-lg dark:bg-gray-700'>
              <span className='flex justify-center font-bold text-slate-600'>Professor</span>
              <CustomInput
                size='sm'
                value=''
                onInputChange={handleInputChange}
                placeholder='Rechercher un professeur'
              />
              <span className='bold text-sm font-bold text-slate-600'>Proffesseur actuel</span>
              <div className='relative flex w-full items-center gap-2 rounded-md bg-slate-100 p-2'>
                <span className='relative flex h-7 w-7 shrink-0 overflow-hidden rounded-full' onClick={toggle}>
                  <img className='aspect-square h-full w-full' src={teacher?.picture} />
                </span>
                <span className='text-slate-700'>{teacher?.name}</span>
                <AiOutlineClose className='absolute right-4 cursor-pointer ' />
              </div>
            </div>
          )}{' '}
        </div>
      </div>
    </>
  );
}
