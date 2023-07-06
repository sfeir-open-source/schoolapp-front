import { useState } from 'react';
import Filter from './components/filter/Filter';
import Schools from './components/schools/Schools';
import { useGetSchools } from '../../hooks/schools.hook';
import type { Status } from '../../../../shared/interfaces/filter-status.interface';
import { useStatus } from '../../hooks/filter-status.hook';

export function Catalogue() {
  const [selectedStatus, setSelectedStatus] = useState(['active']);
  const [status, setStatus] = useStatus();
  const { data, error, isLoading } = useGetSchools(selectedStatus);

  const handleStatusChange = (status: Status[]) => {
    const selectedStatus = status.filter(s => s.isChecked).map(s => s.type);
    setStatus(status);
    setSelectedStatus(selectedStatus);
  };

  return (
    <div className='flex flex-col gap-4'>
      <Filter onStatusChange={handleStatusChange} status={status} />
      <Schools schools={data} error={error} isLoading={isLoading} />
    </div>
  );
}
