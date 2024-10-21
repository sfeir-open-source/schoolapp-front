import { useContext, useState } from 'react';
import Filter from './components/filter/Filter';
import Schools from './components/schools/Schools';
import { useAddSchool, useGetSchools } from '@schoolApp/pages/Home/hooks/schools.hook';
import { useStatusRecord } from '@schoolApp/pages/Home/hooks/filter-status.hook';
import AddSchoolButton from '@schoolApp/pages/Home/components/add-school-button/AddSchoolButton';
import { EditModeContext, useEditMode } from '@schoolApp/shared/context/edit-mode.context';
import { useStatus } from '@schoolApp/pages/Home/hooks/status.hook';
import { StatusType } from '@schoolApp/shared/interfaces/filter-status.interface';

export function Catalogue() {
  const [selectedStatus, setSelectedStatus] = useStatus();
  const [searchTerm, setSearchTerm] = useState('');
  const [recordStatus] = useStatusRecord();
  const { data, isError, isLoading } = useGetSchools(selectedStatus, searchTerm);
  const { editMode } = useEditMode();
  const addSchool = useAddSchool();

  const handleStatusChange = (newSelectedStatus: string[]) => setSelectedStatus(newSelectedStatus);
  const handleSearchTermChange = (searchTerm: string) => setSearchTerm(searchTerm);
  const handleAddSchool = () => addSchool.mutate();

  console.log({ data });

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
      <Schools schools={data} isError={isError} isLoading={isLoading} />
    </div>
  );
}
