import clsx from 'clsx';
import React from 'react';

interface InputProps {
  value: string | number;
  type?: 'text' | 'number';
  onInputChange: (value: string) => void;
  size?: 'md' | 'sm' | 'lg' | 'xs';
  min?: number;
  step?: number;
  placeholder?: string;
  readOnly?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export default function Input({
  value,
  type = 'text',
  min,
  step,
  onInputChange,
  placeholder,
  size = 'md',
  readOnly = false,
  left,
  right,
}: InputProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!readOnly) {
      onInputChange(event.target.value);
    }
  };

  const sizeClasses = clsx({
    'text-sm p-2': size === 'sm',
    'text-xs p-1': size === 'xs',
    'text-lg p-3': size === 'md',
    'p-2.5 text-4xl font-bold': size === 'lg',
  });

  const inputClasses = clsx(
    'h-full flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed',
    sizeClasses
  );

  return (
    <div
      className={clsx(
        'flex h-9 w-full flex-row items-center rounded-md border border-input bg-transparent px-3 shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring disabled:opacity-50',
        {
          'border border-input': !readOnly,
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2': !readOnly,
          'border-0': readOnly,
        }
      )}
    >
      {left && (
        <div className='flex h-full items-center text-muted-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'>
          {left}
        </div>
      )}
      <input
        type={type}
        min={min}
        step={step}
        placeholder={placeholder}
        className={inputClasses}
        value={value}
        onChange={handleInputChange}
        readOnly={readOnly}
      />
      {right && (
        <div className='flex h-full items-center text-muted-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'>
          {right}
        </div>
      )}
    </div>
  );
}
