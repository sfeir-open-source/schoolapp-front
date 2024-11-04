import { useParams } from 'react-router-dom';
import { useGetSchool } from '../../hooks/schools.hook';
import CatalogueDetailsReadOnly from './ui/CatalogueDetailsReadOnly';
import { useContext } from 'react';
import { EditModeContext, useEditMode } from '../../../../shared/context/edit-mode.context';
import CatalogueDetailsEditMode from './ui/CatalogueDetailsEditMode';
import { auth } from '@schoolApp/core/firebase/firebase.config';

export const CatalogueDetails: React.FC = () => {
  const { id } = useParams();

  if (!id) return;
  const { data: school, error, isLoading } = useGetSchool(id);
  const { editMode } = useEditMode();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message};</div>;
  if (school && !editMode) return <CatalogueDetailsReadOnly school={school} />;
  if (school && editMode) return <CatalogueDetailsEditMode school={school} />;

  return <div>Catalogue</div>;
};
