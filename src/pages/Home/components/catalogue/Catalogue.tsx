import { useState } from 'react';
import Filter from './components/filter/Filter';
import Schools from './components/schools/Schools';
import { useGetSchools } from '../../hooks/schools.hook';
import type { Status } from '../../../../shared/interfaces/filter-status.interface';

export function Catalogue() {
  const [selectedStatus, setSelectedStatus] = useState(['active']);
  const { data, error, isLoading } = useGetSchools(selectedStatus);

  const handleStatusChange = (status: Status[]) => {
    const selectedStatus = status.filter(s => s.isChecked).map(s => s.text);
    setSelectedStatus(selectedStatus);
  };

  return (
    <div className='flex flex-col gap-4'>
      <Filter onStatusChange={handleStatusChange} />
      <Schools schools={data} error={error} isLoading={isLoading} />
    </div>
  );
}
