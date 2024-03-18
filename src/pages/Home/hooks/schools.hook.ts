import axios from 'axios';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
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
  return useQuery<School[], Error>({
    queryFn: () => fetchData(URI.schools, cookies.jwt),
    queryKey: 'schools',
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
  return useQuery<School, Error>({
    queryFn: () => fetchData(URI.school + id, cookies.jwt),
    queryKey: 'school',
  });
};

export const useAddSchool = () => {
  const [cookies] = useCookies(['jwt']);
  const navigate = useNavigate();

  return useMutation<School>({
    mutationFn: () =>
      axios.post(URI.add, EMPTY_SCHOOL, {
        headers: { Authorization: `Bearer ${cookies.jwt}` },
      }),
    onSuccess: school => {
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

  return useMutation({
    mutationFn: (school: School) =>
      axios.put(`${URI.update}/${school.id}`, school, {
        headers: { Authorization: `Bearer ${cookies.jwt}` },
      }),
    onSuccess: success => {
      toast.success('la School (' + success.data.title + ') a été modifié !');
      navigate(`/catalogue/${success.data.id}`);
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
