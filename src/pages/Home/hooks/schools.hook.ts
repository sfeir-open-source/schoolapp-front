import { useQuery } from 'react-query';
import type { School } from '../../../shared/interfaces/schools.interface';

const BACKEND_URI: string = import.meta.env.VITE_BACKEND_URI;

const SCHOOLS_URI = {
  fake: '/fake-api/Schools.json',
  api: `${BACKEND_URI}/schools/`,
};

export const useGetSchools = (status: string[]) =>
  useQuery<School[], Error>({
    queryFn: () => fetch(SCHOOLS_URI.api).then(res => res.json()),
    queryKey: 'school',
    select: schools => filterSchoolsByStatus(schools, status),
  });

const filterSchoolsByStatus = (schools: School[], status: string[]) =>
  schools.filter(school => status.includes(school.status));
