import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { School } from '@schoolApp/shared//interfaces/schools.interface';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { StatusType } from '@schoolApp/shared/interfaces/filter-status.interface';
import {
  addSchool,
  deleteSchool,
  getAllSchools,
  getSchoolByUid,
} from '@schoolApp/shared/services/school.service';

/**
 * Hook to fetch schools with selected status
 * @param status {StatusType[]}
 */
export const useGetSchools = (status: StatusType[]) => {
  return useQuery({
    queryFn: () => getAllSchools(status),
    queryKey: ['schools', status],
    select: schools =>
      schools.docs.map((school: QueryDocumentSnapshot<School>) =>
        school.data()
      ),
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
    queryKey: `schools/${uid}`,
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
