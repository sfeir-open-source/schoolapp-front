import { useState } from 'react';
import { AiFillFilter } from 'react-icons/ai';
import './Filter.scss';
import SecondaryButton from '../../../../../../shared/components/SecondaryButton';
import { useStatus } from '../../../../hooks/filter-status.hook';
import type { Status } from '../../../../../../shared/interfaces/filter-status.interface';

interface FilterProps {
  onStatusChange: (status: Status[]) => void;
  status: Status[];
}

export default function Filter({ onStatusChange, status }: FilterProps) {
  const [isShown, setShow] = useState<boolean>(false);

  const toggleStatus = (s: Status) => {
    const newStatus = [...status];
    const id = newStatus.indexOf(s);
    newStatus[id] = { ...s, isChecked: !s.isChecked };
    const notChecked = newStatus.some(s => s.isChecked);
    if (notChecked) {
      const idActiveStatus = newStatus.findIndex(s => s.text === 'ACTIVE');
      newStatus[idActiveStatus] = {
        ...newStatus[idActiveStatus],
        isChecked: true,
      };
    }
    onStatusChange(newStatus);
  };

  const toggle = () => setShow(!isShown);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 14rem' }}>
      <form className='mx-auto'>
        <label className='sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          Search
        </label>
        <div className='relative'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <svg
              aria-hidden='true'
              className='h-5 w-5 text-gray-500 dark:text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              ></path>
            </svg>
          </div>
          <input
            type='search'
            id='default-search'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 px-5 py-1.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Search a School ...'
            required
          ></input>
        </div>
      </form>
      <div className='flex items-center justify-start'>
        <SecondaryButton onClick={toggle}>
          <AiFillFilter />
        </SecondaryButton>
        {isShown && (
          <div className='filter-content z-10 w-56 rounded-lg bg-white p-3 shadow dark:bg-gray-700'>
            <ul className='space-y-2 text-sm'>
              {status.map(s => (
                <li key={s.text} className='flex items-center gap-1' dir='rtl'>
                  <input
                    id='apple'
                    type='checkbox'
                    checked={s.isChecked}
                    onChange={() => toggleStatus(s)}
                    value=''
                    dir='rtl'
                    className='text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700'
                  />
                  <label
                    className={`rounded-lg py-1 px-3  text-sm font-medium ${s.bgColor}`}
                  >
                    {s.text}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
