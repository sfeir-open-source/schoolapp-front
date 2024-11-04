import { firestore } from '@schoolApp/core/firebase/firebase.config';
import { userConverter } from '@schoolApp/shared/interfaces/users.interface';
import { getAllUsers, getUserByEmail, subscribeToUsers } from '@schoolApp/shared/services/user.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteDoc, doc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hook to fetch users
 */
export const useGetUsers = () => {
  const queryClient = useQueryClient();

  useEffect(
    () =>
      subscribeToUsers(snapshot => {
        const users = snapshot.docs.map(doc => doc.data());

        users.forEach(user => {
          const userId = user.email;
          console.log(user, userId);
          queryClient.setQueryData(['users', userId], user);
        });

        queryClient.setQueryData(['users'], users);
      }),
    []
  );
  return useQuery({
    queryFn: async () => {
      const users = await getAllUsers();
      return users.docs.map(user => user.data());
    },
    queryKey: ['users'],
  });
};

export const useGetUser = (email: string) => {
  return useQuery({
    queryFn: async () => {
      const user = await getUserByEmail(email);
      return user.data();
    },
    queryKey: ['users', email],
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
