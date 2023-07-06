import type { MouseEventHandler, ReactNode } from 'react';

interface PrimaryButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

export default function SecondaryButton({
  onClick,
  children,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className='rounded-lg bg-blue-100 px-5 py-1.5 text-center text-sm font-medium text-blue-500 hover:scale-105'
    >
      {children}
    </button>
  );
}
