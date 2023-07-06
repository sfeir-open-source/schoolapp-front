import { MouseEventHandler } from 'react';

interface PrimaryButtonProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function PrimaryButton({ text, onClick }: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className='rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-1.5 text-center text-sm font-medium text-white hover:scale-105'
    >
      {text}
    </button>
  );
}
