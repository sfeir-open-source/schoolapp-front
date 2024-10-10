import { StatusType } from '@schoolApp/shared/interfaces/filter-status.interface';
import { useState } from 'react';

export function useStatus() {
  return useState<StatusType[]>(['active', 'abandoned', 'wish', 'proposal', 'rejected']);
}
