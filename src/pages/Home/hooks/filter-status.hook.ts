import { useState } from 'react';
import type {
  Status,
  StatusType,
} from '../../../shared/interfaces/filter-status.interface';

export const useStatus = () =>
  useState<Status[]>([
    { bgColor: 'bg-green-200', type: 'active', isChecked: true },
    { bgColor: 'bg-slate-200', type: 'abandoned', isChecked: false },
    { bgColor: 'bg-orange-200', type: 'wish', isChecked: false },
    { bgColor: 'bg-blue-200', type: 'proposal', isChecked: false },
    { bgColor: 'bg-red-200', type: 'rejected', isChecked: false },
  ]);

export const useStatusRecord = () =>
  useState<Record<StatusType, string>>({
    active: 'bg-green-200',
    abandoned: 'bg-slate-200',
    wish: 'bg-orange-200',
    proposal: 'bg-blue-200',
    rejected: 'bg-red-200',
  });
