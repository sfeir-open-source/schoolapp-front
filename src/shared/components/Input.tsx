interface InputProps {
  value: string;
  onInputChange: (value: string) => void;
  size?: 'md' | 'sm' | 'lg';
  placeholder?: string;
}

import clsx from 'clsx';

export default function CustomInput({ value, onInputChange, placeholder, size = 'md' }: InputProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => onInputChange(event.target.value);

  const sizeClasses = clsx({
    'text-sm p-2': size === 'sm',
    'text-lg p-3': size === 'md',
    'p-2.5 text-4xl font-bold': size === 'lg',
  });

  return (
    <input
      placeholder={placeholder}
      className={`w-full rounded-lg border border-slate-400 bg-transparent text-slate-600 outline-none ${sizeClasses}`}
      value={value}
      onChange={handleInputChange}
    />
  );
}
