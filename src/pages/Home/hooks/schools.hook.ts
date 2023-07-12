import { useQuery } from 'react-query';
import type { School } from '../../../shared/interfaces/schools.interface';
import { useCookies } from 'react-cookie';
import { fetchData } from '../../../shared/helpers/fetch-data';

const BACKEND_URI: string = import.meta.env.VITE_BACKEND_URI;

const URI = {
  fake: '/fake-api/Schools.json',
  schools: `${BACKEND_URI}/schools/`,
  school: `${BACKEND_URI}/schools/get/`,
};

export const useGetSchools = (status: string[]) => {
  const [cookies] = useCookies(['jwt']);
  return useQuery<School[], Error>({
    queryFn: () => fetchData(URI.fake, cookies.jwt),
    queryKey: 'schools',
    select: schools => filterSchoolsByStatus(schools, status),
  });
};

const filterSchoolsByStatus = (schools: School[], status: string[]) =>
  schools.filter(school => status.includes(school.status));

export const useGetSchool = (id: number) => {
  const [cookies] = useCookies(['jwt']);
  return useQuery<School, Error>({
    queryFn: () => fetchData(URI.school + id, cookies.jwt),
    queryKey: 'school',
  });
};
