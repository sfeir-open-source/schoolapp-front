import type { MouseEventHandler } from 'react';

type PrimaryButtonProps = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function SecondaryButton({ text, onClick }: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className='rounded-lg bg-blue-100 px-5 py-1.5 text-center text-sm font-medium text-blue-500 hover:scale-105'
    >
      {text}
    </button>
  );
}
