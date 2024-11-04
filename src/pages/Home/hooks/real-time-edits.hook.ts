import { RealTimeEdits } from '@schoolApp/shared/interfaces/real-time-edits.interface';
import { getAllRealTimeEdits, subscribeToRealTimeEdits } from '@schoolApp/shared/services/real-time-edits.service';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';

export const useGetRealTimeEdits = () => {
  const queryClient = useQueryClient();

  useEffect(
    () =>
      subscribeToRealTimeEdits(snapshot => {
        const realTimeEdits = snapshot.docs.map(doc => doc.data());
        queryClient.setQueryData(['realTimeEdits'], realTimeEdits);
      }),
    []
  );

  return useQuery({
    queryFn: async () => {
      const realTimeEdits = await getAllRealTimeEdits();
      return realTimeEdits.docs.map((realTimeEdit: QueryDocumentSnapshot<RealTimeEdits>) => realTimeEdit.data());
    },
    queryKey: ['realTimeEdits'],
  });
};
