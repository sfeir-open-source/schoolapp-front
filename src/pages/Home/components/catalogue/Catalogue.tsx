import { useContext } from 'react';
import Filter from './components/filter/Filter';
import Schools from './components/schools/Schools';
import {
  useAddSchool,
  useGetSchools,
} from '@schoolApp/pages/Home/hooks/schools.hook';
import { useStatusRecord } from '@schoolApp/pages/Home/hooks/filter-status.hook';
import AddSchoolButton from '@schoolApp/pages/Home/components/add-school-button/AddSchoolButton';
import { EditModeContext } from '@schoolApp/shared/context/edit-mode.context';
import { useStatus } from '@schoolApp/pages/Home/hooks/status.hook';
import { StatusType } from '@schoolApp/shared/interfaces/filter-status.interface';

export function Catalogue() {
  const [selectedStatus, setSelectedStatus] = useStatus();
  const [recordStatus] = useStatusRecord();
  const { data, isLoading, isError } = useGetSchools(selectedStatus);
  const { editMode } = useContext(EditModeContext);
  const addSchool = useAddSchool();
  const handleStatusChange = (newSelectedStatus: StatusType[]) => {
    setSelectedStatus(newSelectedStatus);
  };
  const handleAddSchool = () => addSchool.mutate();

  return (
    <div className='mt-16 flex flex-col gap-4 p-4'>
      <div className='grid w-full grid-cols-3 justify-items-center'>
        <Filter
          onStatusChange={handleStatusChange}
          status={recordStatus}
          selectedStatus={selectedStatus}
        />
        <AddSchoolButton editMode={editMode} onClick={handleAddSchool} />
      </div>
      <Schools schools={data} isError={isError} isLoading={isLoading} />
    </div>
  );
}
