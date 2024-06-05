import { useState } from 'react';

export function useStatus() {
  const useStatus = useState(['active', 'abandoned', 'wish', 'proposal', 'rejected']);

  return useStatus;
}
