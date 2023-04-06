import { useQuery } from 'react-query';
import type { School } from '../../../shared/interfaces/schools.interface';

const BACKEND_URI: string = import.meta.env.VITE_BACKEND_URI;

const URI = {
  fake: '/fake-api/Schools.json',
  schools: `${BACKEND_URI}/schools/`,
  school: `${BACKEND_URI}/schools/get/`,
};

export const useGetSchools = (status: string[]) =>
  useQuery<School[], Error>({
    queryFn: () => fetch(URI.schools).then(res => res.json()),
    queryKey: 'schools',
    select: schools => filterSchoolsByStatus(schools, status),
  });

const filterSchoolsByStatus = (schools: School[], status: string[]) =>
  schools.filter(school => status.includes(school.status));

export const useGetSchool = (id: number) =>
  useQuery<School, Error>({
    queryFn: () => fetch(URI.school + id).then(res => res.json()),
    queryKey: 'school',
  });
