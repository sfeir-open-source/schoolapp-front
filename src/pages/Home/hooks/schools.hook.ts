import { School } from '@schoolApp/shared//interfaces/schools.interface';
import { StatusType } from '@schoolApp/shared/interfaces/filter-status.interface';
import {
  addSchool,
  deleteSchool,
  getAllSchools,
  getSchoolByUid,
  updateSchool,
} from '@schoolApp/shared/services/school.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

/**
 * Hook to fetch schools with selected status
 * @param status {StatusType[]}
 */
export const useGetSchools = (status: StatusType[]) => {
  return useQuery({
    queryFn: () => getAllSchools(status),
    queryKey: ['schools', status],
    select: schools => schools.docs.map((school: QueryDocumentSnapshot<School>) => school.data()),
  });
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

/**
 * Hook to delete a school
 * @param uid {string}
 */
export const useDeleteSchool = (uid: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => deleteSchool(uid),
    onSuccess: () => {
      navigate(`/catalogue`);
    },
    onError: err => {
      console.log(err);
    },
  });
};
