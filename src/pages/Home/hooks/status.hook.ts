import { useState } from 'react';
import { StatusType } from '@schoolApp/shared/interfaces/filter-status.interface';

export function useStatus() {
  return useState<StatusType[]>([
    'active',
    'abandoned',
    'wish',
    'proposal',
    'rejected',
  ]);
}
