import { getFilteredSchools } from '@/shared/helpers/schools.helpers';
import { School } from '@schoolApp/shared//interfaces/schools.interface';
import { StatusType } from '@schoolApp/shared/interfaces/filter-status.interface';
import {
  addSchool,
  deleteSchool,
  getAllSchools,
  getSchoolByUid,
  subscribeToSchools,
  updateSchool,
} from '@schoolApp/shared/services/school.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

/**
 * Hook to fetch schools with selected status
 * @param status {StatusType[]}
 */
export const useGetSchools = (status: StatusType[], searchTerm: string) => {
  const queryClient = useQueryClient();

  useEffect(
    () =>
      subscribeToSchools(snapshot => {
        const schools = snapshot.docs.map(doc => doc.data());
        queryClient.setQueryData(['schools', status], schools);
      }),
    []
  );

  const { data, isError, isLoading } = useQuery({
    queryFn: async () => {
      const schools = await getAllSchools(status);
      return schools.docs.map((school: QueryDocumentSnapshot<School>) => school.data());
    },
    queryKey: ['schools', status],
  });

  return {
    schools: getFilteredSchools(data, searchTerm),
    isError,
    isLoading,
  };
};

/**
 * Hook to get a school by its uid
 * @param uid {string}
 */
export const useGetSchool = (uid: string) => {
  return useQuery({
    queryFn: () => getSchoolByUid(uid),
    select: school => school.data(),
    queryKey: ['school', uid],
  });
};

/**
 * Hook to create an empty school
 */
export const useAddSchool = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => addSchool(),
    onSuccess: school => navigate(`/catalogue/${school.id}`),
    onError: err => {
      console.log(err);
    },
  });
};

/**
 * Hook to create an empty school
 */
export const useUpdateSchool = () => {
  return useMutation({
    mutationFn: (school: School) => updateSchool(school.id, school),
    onSuccess: () => toast.success(`La School a été editée !`),
    onError: (err, school) => {
      console.log(err, school);
      toast.error(`Aie ! Il a eu un problème durant l'édition de la school`);
    },
  });
};

export const useDeleteSchool = (queryClient: any) => {
  return useMutation({
    mutationFn: (uid: string) => deleteSchool(uid),
    onSuccess: (deletedSchool, id) => {
      toast.success(`La School a été suprimée !`);
      queryClient.invalidateQueries(['schools']);
    },
    onError: err => {
      console.error(err);
      toast.error(`Aie ! Il a eu un problème durant la suppression de la school`);
    },
  });
};
