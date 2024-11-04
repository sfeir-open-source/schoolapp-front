interface InputProps {
  value: string | number;
  type?: 'text' | 'number';
  onInputChange: (value: string) => void;
  size?: 'md' | 'sm' | 'lg' | 'xs';
  min?: number;
  step?: number;
  placeholder?: string;
  realTimeEdits?: RealTimeEdits[] | null;
  title?: string;
  schoolId?: string;
}

import clsx from 'clsx';
import { RealTimeEdits } from '../interfaces/real-time-edits.interface';
import { auth } from '@schoolApp/core/firebase/firebase.config';
import { addRealTimeEdits, deleteRealTimeEdits, updateRealTimeEdits } from '../services/real-time-edits.service';
import { useEffect } from 'react';

export default function CustomInput({
  value,
  type = 'text',
  min,
  step,
  onInputChange,
  placeholder,
  size = 'md',
  realTimeEdits,
  schoolId,
  title,
}: InputProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => onInputChange(event.target.value);

  const { currentUser } = auth;

  const sizeClasses = clsx({
    'text-sm p-2': size === 'sm',
    'text-xs p-1': size === 'xs',
    'text-lg p-3': size === 'md',
    'p-2.5 text-4xl font-bold': size === 'lg',
    'border border-red-500': realTimeEdits?.some(
      realTimeEdit => realTimeEdit.fieldId === title && realTimeEdit.schoolId === schoolId
    ),
  });

  const handleFocus = () => {
    if (!currentUser?.email || !schoolId || !title) return;

    const foundRealTimeEdit = realTimeEdits?.find(realTimeEdit => realTimeEdit.userId === currentUser.email);

    foundRealTimeEdit
      ? updateRealTimeEdits(foundRealTimeEdit.id, { ...foundRealTimeEdit, fieldId: title, schoolId: schoolId })
      : addRealTimeEdits({ fieldId: title, schoolId: schoolId, userId: currentUser.email });
  };

  const handleBlur = () => {
    if (!currentUser?.email || !schoolId || !title) return;

    const foundRealTimeEdit = realTimeEdits?.find(realTimeEdit => realTimeEdit.userId === currentUser.email);

    if (!foundRealTimeEdit) return;

    deleteRealTimeEdits(foundRealTimeEdit.id);
  };
  return (
    <input
      type={type}
      min={min}
      step={step}
      placeholder={placeholder}
      className={`w-full rounded-sm text-slate-600 outline-none hover:bg-slate-100 ${sizeClasses}`}
      value={value}
      onChange={handleInputChange}
      onFocus={handleFocus} // log when input is focused
      onBlur={handleBlur} // log when input is blurred
    />
  );
}
