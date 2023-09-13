import { useState } from 'react';
import Filter from './components/filter/Filter';
import Schools from './components/schools/Schools';
import { useGetSchools } from '../../hooks/schools.hook';
import { useStatus, useStatusRecord } from '../../hooks/filter-status.hook';

export function Catalogue() {
  const [selectedStatus, setSelectedStatus] = useState(['active']);
  const [recordStatus] = useStatusRecord();
  const { data, error, isLoading } = useGetSchools(selectedStatus);

  const handleStatusChange = (newSelectedStatus: string[]) => {
    setSelectedStatus(newSelectedStatus);
  };

  return (
    <div className='mt-16 flex flex-col gap-4 p-4'>
      <Filter
        onStatusChange={handleStatusChange}
        status={recordStatus}
        selectedStatus={selectedStatus}
      />
      <Schools schools={data} error={error} isLoading={isLoading} />
    </div>
  );
}
