import { ReactNode } from 'react';

export function Properties({ children }: { children: ReactNode }) {
  return <div className='ml-4 flex w-full flex-col gap-2'>{children}</div>;
}

export function PropertiesTitle({ children }: { children: ReactNode }) {
  return <div className='flex items-center gap-1'>{children}</div>;
}

export function Property({ children }: { children: ReactNode }) {
  return <div className='grid grid-cols-[11rem_1fr] items-center sm:grid-cols-[14rem_1fr]'>{children}</div>;
}

export function PropertyLabel({ children }: { children: ReactNode }) {
  return <span className='flex items-center gap-1 text-sm opacity-70'>{children}</span>;
}

export function PropertyValue({ children }: { children: ReactNode }) {
  return <span>{children}</span>;
}
