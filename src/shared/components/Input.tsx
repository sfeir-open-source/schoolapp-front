interface InputProps {
  value: string | number;
  type?: 'text' | 'number';
  onInputChange: (value: string) => void;
  size?: 'md' | 'sm' | 'lg' | 'xs';
  min?: number;
  step?: number;
  placeholder?: string;
}

import clsx from 'clsx';

export default function CustomInput({
  value,
  type = 'text',
  min,
  step,
  onInputChange,
  placeholder,
  size = 'md',
}: InputProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => onInputChange(event.target.value);

  const sizeClasses = clsx({
    'text-sm p-2': size === 'sm',
    'text-xs p-1': size === 'xs',
    'text-lg p-3': size === 'md',
    'p-2.5 text-4xl font-bold': size === 'lg',
  });

  return (
    <input
      type={type}
      min={min}
      step={step}
      placeholder={placeholder}
      className={`w-full rounded-sm text-slate-600 outline-none hover:bg-slate-100 ${sizeClasses}`}
      value={value}
      onChange={handleInputChange}
    />
  );
}
