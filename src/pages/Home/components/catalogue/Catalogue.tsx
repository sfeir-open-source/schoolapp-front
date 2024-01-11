import { useContext, useState } from 'react';
import Filter from './components/filter/Filter';
import Schools from './components/schools/Schools';
import { useGetSchools } from '../../hooks/schools.hook';
import { useStatusRecord } from '../../hooks/filter-status.hook';
import AddSchoolButton from '../add-school-button/AddSchoolButton';
import { EditModeContext } from '../../../../shared/context/edit-mode.context';

export function Catalogue() {
  const [selectedStatus, setSelectedStatus] = useState([
    'active',
    'abandoned',
    'wish',
    'proposal',
    'rejected',
  ]);
  const [recordStatus] = useStatusRecord();
  const { data, error, isLoading } = useGetSchools(selectedStatus);
  const { editMode } = useContext(EditModeContext);

  const handleStatusChange = (newSelectedStatus: string[]) => {
    setSelectedStatus(newSelectedStatus);
  };

  return (
    <div className='mt-16 flex flex-col gap-4 p-4'>
      <div className='grid w-full grid-cols-3 justify-items-center'>
        <Filter
          onStatusChange={handleStatusChange}
          status={recordStatus}
          selectedStatus={selectedStatus}
        />
        <AddSchoolButton editMode={editMode} />
      </div>

      <Schools schools={data} error={error} isLoading={isLoading} />
    </div>
  );
}
