import { useParams } from 'react-router-dom';
import { useGetSchool } from '../../hooks/schools.hook';
import { useAuth } from '../../../../core/authentification/auth.hook';
import CatalogueDetailsReadOnly from './ui/CatalogueDetailsReadOnly';
import { useEditMode } from '../../hooks/edit-mode.hook';
import { useContext, useEffect } from 'react';
import { EditModeContext } from '../../../../shared/context/edit-mode.context';
import CatalogueDetailsEditMode from './ui/CatalogueDetailsEditMode';

export const CatalogueDetails: React.FC = () => {
  const { id } = useParams();
  const { data: school, error, isLoading } = useGetSchool(id);
  const user = useAuth().user;
  const { editMode, toggle } = useContext(EditModeContext);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message};</div>;
  if (school && !editMode)
    return <CatalogueDetailsReadOnly school={school} user={user} />;
  if (school && editMode)
    return <CatalogueDetailsEditMode school={school} user={user} />;

  return <div>Catalogue</div>;
};
