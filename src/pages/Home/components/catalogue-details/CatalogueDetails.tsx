import { useParams } from 'react-router-dom';
import { useGetSchool } from '@schoolApp/pages/Home/hooks/schools.hook';
import CatalogueDetailsReadOnly from './ui/CatalogueDetailsReadOnly';
import { useEditMode } from '@schoolApp/shared/context/edit-mode.context';
import CatalogueDetailsEditMode from './ui/CatalogueDetailsEditMode';
import { FC } from 'react';

export const CatalogueDetails: React.FC = () => {
  const { id } = useParams();
  const { data: school, error, isLoading } = useGetSchool(id);
  const { currentUser: user } = auth;
  const { editMode } = useEditMode();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message};</div>;
  if (school && !editMode) return <CatalogueDetailsReadOnly school={school} user={user} />;
  if (school && editMode) return <CatalogueDetailsEditMode school={school} user={user} />;

  return <div>Catalogue</div>;
};
