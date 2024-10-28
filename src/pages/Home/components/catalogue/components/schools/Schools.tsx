import type { School } from '@schoolApp/shared/interfaces/schools.interface';
import { useEditMode } from '@schoolApp/shared/context/edit-mode.context';
import { useDeleteSchool } from '@schoolApp/pages/Home/hooks/schools.hook';
import CatalogueSchool from '@schoolApp/pages/Home/components/catalogue/components/catalogue-school/CatalogueSchool';

interface SchoolsProps {
  schools: School[] | undefined;
  isError: boolean;
  isLoading: boolean;
}
export default function Schools({ schools, isError, isLoading }: SchoolsProps) {
  const { editMode } = useEditMode();
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
