import { firestore } from '@schoolApp/core/firebase/firebase.config';
import { userConverter } from '@schoolApp/shared/interfaces/users.interface';
import { getAllUsers, getUserByEmail } from '@schoolApp/shared/services/user.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

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
    queryFn: () => getUserByEmail(id),
    select: user => user.data(),
    queryKey: ['users', id],
  });
};

export const useDeleteUser = (id: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => deleteDoc(doc(firestore, `users/${id}`).withConverter(userConverter)),
    onSuccess: () => {
      navigate(`/catalogue`);
    },
    onError: err => {
      console.log(err);
    },
  });
};
