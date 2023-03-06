import { useQuery } from 'react-query';
import { School } from '../../../shared/interfaces/schools.interface';

export default function Schools() {
  const { isLoading, error, data } = useQuery<boolean, Error, School[]>('repoData', () => fetch('/fake-api/Schools.json').then((res) => res.json()));

  if (isLoading) return <div>Loading ..</div>;

  if (error) return <div>'An error has occurred: {error.message};</div>;

  if (data)
    return (
      <div>
        {data.map((school) => (
          <div>
            {school.name} {school.summary}
          </div>
        ))}
      </div>
    );
}
