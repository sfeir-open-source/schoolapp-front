import Input from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { AiFillFilter } from 'react-icons/ai';
import Button from '../../../../../../shared/components/Button';
import type { StatusType } from '../../../../../../shared/interfaces/filter-status.interface';
import './Filter.scss';

interface FilterProps {
  onStatusChange: (status: StatusType[]) => void;
  onSearchTermChange: (searchTerm: string) => void;
  status: Record<StatusType, string>;
  searchTerm: string;
  selectedStatus: StatusType[];
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

  return (
    <div className='col-start-2'>
      <div className='flex justify-center gap-4'>
        <form>
          <label className='sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white'>Search</label>
          <div className='relative'>
            <Input left={<Search />} value={searchTerm} onInputChange={onSearchTermChange} />
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
                      className={`leading-sm flex w-fit items-center justify-start rounded-full px-3 py-1 text-xs font-bold uppercase ${className}`}
                    >
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
