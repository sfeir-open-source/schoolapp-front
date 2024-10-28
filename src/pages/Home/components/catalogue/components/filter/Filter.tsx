import { ChangeEvent, useState } from 'react';
import { AiFillFilter } from 'react-icons/ai';
import './Filter.scss';
import type { StatusType } from '@schoolApp/shared/interfaces/filter-status.interface';
import Button from '@schoolApp/shared/components/Button';

interface FilterProps {
  onStatusChange: (status: string[]) => void;
  onSearchTermChange: (searchTerm: string) => void;
  status: Record<StatusType, string>;
  searchTerm: string;
  selectedStatus: string[];
}

export default function Filter({
  onStatusChange,
  onSearchTermChange,
  status,
  searchTerm,
  selectedStatus,
}: FilterProps) {
  const [isShown, setShow] = useState<boolean>(false);

  const toggleStatus = (statusType: StatusType) => {
    const updatedSelectedStatus = selectedStatus.includes(statusType)
      ? selectedStatus.filter(type => type !== statusType)
      : [...selectedStatus, statusType];
    onStatusChange(updatedSelectedStatus);
  };

  const toggle = () => setShow(!isShown);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onSearchTermChange(value);
  };

  return (
    <div className='col-start-2'>
      <div className='flex justify-center gap-4'>
        <form>
          <label className='sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white'>Search</label>
          <div className='relative'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <svg
                aria-hidden='true'
                className='h-5 w-5 text-gray-500 dark:text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
              </svg>
            </div>
            <input
              type='search'
              id='default-search'
              className='relative block w-full rounded-lg border border-gray-300 bg-gray-50 px-5 py-1.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              placeholder='Search a School ...'
              value={searchTerm}
              onChange={handleChange}
              required></input>
          </div>
        </form>
        <div className='relative flex items-center justify-start'>
          <Button variant='secondary' onClick={toggle}>
            <AiFillFilter />
          </Button>
          {isShown && (
            <div className='filter-content absolute left-0 left-1/2 top-[2rem] z-10 w-fit -translate-x-1/2 rounded-lg border border-gray-300 bg-white p-3 shadow-lg dark:bg-gray-700'>
              <ul className='flex flex-col gap-2 text-sm'>
                {Object.entries(status).map(([statusType, className]) => (
                  <li key={statusType} className='li' dir='rtl'>
                    <label
                      className={`leading-sm flex w-fit items-center justify-start rounded-full px-3 py-1 text-xs font-bold uppercase ${className}`}>
                      {statusType}
                    </label>
                    <input
                      id='apple'
                      type='checkbox'
                      checked={selectedStatus.includes(statusType as StatusType)}
                      onChange={() => toggleStatus(statusType as StatusType)}
                      value=''
                      dir='rtl'
                      className='text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700'
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
