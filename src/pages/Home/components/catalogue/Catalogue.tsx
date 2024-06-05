import { useContext, useState } from 'react';
import Filter from './components/filter/Filter';
import Schools from './components/schools/Schools';
import { useAddSchool, useGetSchools } from '../../hooks/schools.hook';
import { useStatusRecord } from '../../hooks/filter-status.hook';
import AddSchoolButton from '../add-school-button/AddSchoolButton';
import { EditModeContext } from '../../../../shared/context/edit-mode.context';
import { useStatus } from '../../hooks/status.hook';

export function Catalogue() {
  const [selectedStatus, setSelectedStatus] = useStatus();
  const [searchTerm, setSearchTerm] = useState('');
  const [recordStatus] = useStatusRecord();
  const { data, error, isLoading } = useGetSchools(selectedStatus, searchTerm);
  const { editMode } = useContext(EditModeContext);
  const addSchool = useAddSchool();

  const handleStatusChange = (newSelectedStatus: string[]) => setSelectedStatus(newSelectedStatus);
  const handleSearchTermChange = (searchTerm: string) => setSearchTerm(searchTerm);
  const handleAddSchool = () => addSchool.mutate();

  return (
    <div className='mt-16 flex flex-col gap-4 p-4'>
      <div className='grid w-full grid-cols-3 justify-items-center'>
        <Filter
          onStatusChange={handleStatusChange}
          onSearchTermChange={handleSearchTermChange}
          searchTerm={searchTerm}
          status={recordStatus}
          selectedStatus={selectedStatus}
        />
        <AddSchoolButton editMode={editMode} onClick={handleAddSchool} />
      </div>
      <Schools schools={data} error={error} isLoading={isLoading} />
    </div>
  );
}
