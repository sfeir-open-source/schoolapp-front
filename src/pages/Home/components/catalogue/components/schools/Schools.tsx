import { Link } from 'react-router-dom';
import { getStatusBackgroundColor } from '../../../../../../shared/helpers/status-background-color';
import type { School } from '../../../../../../shared/interfaces/schools.interface';
import { useContext, useState } from 'react';
import { EditModeContext } from '../../../../../../shared/context/edit-mode.context';
import IconDeleteButton from '../icon-delete-button/IconDeleteButton';
import { useDeleteSchool } from '../../../../hooks/schools.hook';
import CatalogueSchool from '../catalogue-school/CatalogueSchool';

interface SchoolsProps {
  schools: School[] | undefined;
  isError: boolean;
  isLoading: boolean;
}
export default function Schools({ schools, isError, isLoading }: SchoolsProps) {
  const { editMode } = useContext(EditModeContext);
  const mutation = useDeleteSchool();

  const handleDeleteSchool = (id: number) => mutation.mutate(id);
  if (isLoading) return <div>Loading ..</div>;

  if (isError) return <div>An error has occurred</div>;

  if (schools)
    return (
      <div className='grid items-center gap-4 px-14 sm:grid-cols-2 md:grid-cols-3 md:px-0 lg:grid-cols-4 xl:grid-cols-5'>
        {schools.map(school => (
          <CatalogueSchool key={school.id} school={school} editMode={editMode} onDelete={handleDeleteSchool} />
        ))}
      </div>
    );

  return <div></div>;
}
