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

export default function Input({
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
      className={`${sizeClasses} disabled:opacity-50', flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed
`}
      value={value}
      onChange={handleInputChange}
    />
  );
}
