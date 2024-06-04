import { MouseEventHandler } from 'react';
import { AiFillDelete, AiFillSave } from 'react-icons/ai';

interface IconDeleteButtonProps {
  onButtonClick: () => void;
  isShown: boolean;
}

export default function IconDeleteButton({
  onButtonClick,
  isShown,
}: IconDeleteButtonProps) {
  const handleButtonClick = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    onButtonClick();
  };
  if (isShown) {
    return (
      <div className='absolute flex w-full justify-end bg-gradient-to-b from-black to-transparent p-2'>
        <AiFillDelete
          className='text-slate-100'
          onClick={e => handleButtonClick(e)}
        />
      </div>
    );
  }

  return null;
}
