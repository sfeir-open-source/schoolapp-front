import { useParams } from 'react-router-dom';
import { useEditMode } from '../../../../shared/context/edit-mode.context';
import { useGetSchool } from '../../hooks/schools.hook';
import SchoolDetail from './ui/SchoolDetail';

export const SchoolPage: React.FC = () => {
  const { id } = useParams();

  if (!id) return;
  const { data: school, error, isLoading } = useGetSchool(id);
  const { editMode } = useEditMode();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message};</div>;
  if (school) return <SchoolDetail school={school} editMode={editMode} />;

  return <div>Catalogue</div>;
};
