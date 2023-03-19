import { useQuery } from 'react-query';
import { School } from '../../../shared/interfaces/schools.interface';

export const useGetSchools = (status: string[]) =>
  useQuery<School[], Error>({
    queryFn: () => fetch('/fake-api/Schools.json').then((res) => res.json()),
    queryKey: 'school',
    select: (schools) => filterSchoolsByStatus(schools, status),
  });

const filterSchoolsByStatus = (schools: School[], status: string[]) => schools.filter((school) => status.includes(school.status));
