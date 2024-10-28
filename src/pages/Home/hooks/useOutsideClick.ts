import { useRef } from 'react';
import { useClickAway } from 'react-use';

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useClickAway(ref, callback);

  return ref;
};
