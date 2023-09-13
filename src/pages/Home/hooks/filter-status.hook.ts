import { useState } from 'react';
import type { StatusType } from '../../../shared/interfaces/filter-status.interface';

export const useStatusRecord = () =>
  useState<Record<StatusType, string>>({
    active: 'bg-green-200  text-green-700',
    abandoned: 'bg-slate-200 text-slate-700',
    wish: 'bg-orange-200 text-orange-700',
    proposal: 'bg-blue-200 text-blue-700',
    rejected: 'bg-red-200 text-red-700',
  });
