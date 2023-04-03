import { useState } from 'react'
import type { Status } from '../../../shared/interfaces/filter-status.interface'

export const useStatus = () =>
  useState<Status[]>([
    { bgColor: 'bg-green-200', text: 'active', isChecked: true },
    { bgColor: 'bg-slate-200', text: 'abandoned', isChecked: false },
    { bgColor: 'bg-orange-200', text: 'wish', isChecked: false },
    { bgColor: 'bg-blue-200', text: 'proposal', isChecked: false },
    { bgColor: 'bg-red-200', text: 'rejected', isChecked: false },
  ])
