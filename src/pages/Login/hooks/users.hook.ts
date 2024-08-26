import { useMutation, useQuery } from 'react-query';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '@schoolApp/core/firebase/firebase.config';
import { useNavigate } from 'react-router-dom';
import { userConverter } from '@schoolApp/shared/interfaces/users.interface';
import {
  getAllUsers,
  getUserByUid,
} from '@schoolApp/shared/services/user.service';

/**
 * Hook to fetch users
 */
export const useGetUsers = () => {
  return useQuery({
    queryFn: () => getAllUsers(),
    queryKey: ['users'],
    select: users => users.docs.map(user => user.data()),
  });
};

export const useGetUser = (id: string) => {
  return useQuery({
    queryFn: () => getUserByUid(id),
    select: user => user.data(),
    queryKey: `users/${id}`,
  });
};

export const useDeleteUser = (id: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () =>
      deleteDoc(doc(firestore, `users/${id}`).withConverter(userConverter)),
    onSuccess: () => {
      navigate(`/catalogue`);
    },
    onError: err => {
      console.log(err);
    },
  });
};
