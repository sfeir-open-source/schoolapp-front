import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../../shared/helpers/fetch-data';
import type { School } from '../../../shared/interfaces/schools.interface';

const BACKEND_URI: string = import.meta.env.VITE_BACKEND_URI;

const URI = {
  fakeSchools: '/fake-api/Schools.json',
  fakeSchool: '/fake-api/School.json',
  schools: `${BACKEND_URI}/schools/`,
  school: `${BACKEND_URI}/schools/get/`,
  add: `${BACKEND_URI}/schools/add`,
  update: `${BACKEND_URI}/schools/update`,
};

export const useGetSchools = (status: string[], searchTerm: string) => {
  const [cookies] = useCookies(['jwt']);
  return useQuery<School[]>({
    queryFn: () => fetchData(URI.schools, cookies.jwt),
    queryKey: ['schools'],
    select: schools => filterSchools(schools, status, searchTerm),
  });
};

const filterSchools = (
  schools: School[],
  status: string[],
  searchTerm: string
) => {
  const filteredSchoolsByStatus = filterSchoolsByStatus(schools, status);
  return filteredSchoolsByStatus.filter(school =>
    school.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  );
};
const filterSchoolsByStatus = (schools: School[], status: string[]): School[] =>
  schools.filter(school => status.includes(school.status));

export const useGetSchool = (id: string | undefined) => {
  const [cookies] = useCookies(['jwt']);
  return useQuery<School>({
    queryFn: () => fetchData(URI.school + id, cookies.jwt),
    queryKey: ['school', id],
  });
};

export const useAddSchool = () => {
  const [cookies] = useCookies(['jwt']);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<School>({
    mutationFn: () =>
      axios.post(URI.add, EMPTY_SCHOOL, {
        headers: { Authorization: `Bearer ${cookies.jwt}` },
      }),
    onSuccess: school => {
      queryClient.invalidateQueries({ queryKey: ['schools'] });
      navigate(`/catalogue/${school.id}`);
    },
    onError: err => {
      console.log(err);
    },
  });
};

export const useUpdateSchool = () => {
  const [cookies] = useCookies(['jwt']);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (school: School) =>
      axios.put(`${URI.update}/${school.id}`, school, {
        headers: { Authorization: `Bearer ${cookies.jwt}` },
      }),
    onSuccess: success => {
      queryClient.setQueriesData(
        { queryKey: ['schools'] },
        (prevSchools: School[] | undefined) => {
          if (!prevSchools) return undefined;
          return prevSchools.map(school =>
            school.id === success.data.id ? success.data : school
          );
        }
      );

      queryClient.setQueriesData(
        { queryKey: ['school', success.data.id] },
        () => success.data
      );

      toast.success('la School (' + success.data.title + ') a été modifié !');
    },
    onError: err => {
      toast.error('Problème lors de la modification de la School !');
    },
  });
};

export const EMPTY_SCHOOL = {
  title: 'Empty School',
  image: 'default-school.png',
  publicSummary: 'empty description',
  duration: '1.0',
  objectives: [],
  prerequisites: [],
  document: '',
  githubLink: '',
  teachers: [],
  status: 'proposal',
  createdBy: 'auditor',
  version: 1,
};
