import { useState } from 'react';
import { StatusType } from '../../../../../../shared/interfaces/filter-status.interface';
import { useStatusRecord } from '../../../../hooks/filter-status.hook';
import { useOutsideClick } from '../../../../hooks/useOutsideClick';
import { getStatusBackgroundColor } from '../../../../../../shared/helpers/status-background-color';

interface SchoolEditableStatusProps {
  selectedStatus: StatusType;
  onStatusChange: (value: StatusType) => void;
}

export default function SchoolEditableStatus({ selectedStatus, onStatusChange }: SchoolEditableStatusProps) {
  const [status] = useStatusRecord();
  const [showStatus, setShow] = useState<boolean>(false);

  const handleOutsideAlerter = () => setShow(false);
  const statusRef = useOutsideClick(handleOutsideAlerter);

  const toggleStatus = () => setShow(!showStatus);

  const handleStatusChange = (statusType: StatusType) => {
    onStatusChange(statusType);
  };

  return (
    <div ref={statusRef} className='relative'>
      <label className={'cursor-pointer ' + getStatusBackgroundColor(selectedStatus)} onClick={toggleStatus}>
        {selectedStatus}
      </label>
      {showStatus && (
        <div className='absolute left-16 top-8 z-10 w-fit -translate-x-1/2 rounded-lg border border-gray-300 bg-white p-3 shadow-lg dark:bg-gray-700'>
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
                  checked={statusType === selectedStatus}
                  onChange={() => handleStatusChange(statusType as StatusType)}
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
  );
}
