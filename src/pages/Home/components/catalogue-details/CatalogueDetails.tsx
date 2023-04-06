import { useParams } from 'react-router-dom';
import { useGetSchool } from '../../hooks/schools.hook';

export const CatalogueDetails: React.FC = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetSchool(Number(id));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message};</div>;
  if (data)
    return (
      <div>
        {data.id} {data.title}
      </div>
    );

  return <div>Catalogue</div>;
};
