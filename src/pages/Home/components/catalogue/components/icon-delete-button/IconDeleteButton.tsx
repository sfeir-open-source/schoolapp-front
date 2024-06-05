import { AiFillDelete } from 'react-icons/ai';
import './IconDeleteButton.scss';

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
      <div className='gradient-overlay absolute z-10 flex w-full justify-end p-2'>
        <AiFillDelete
          className='text-white'
          onClick={e => handleButtonClick(e)}
        />
      </div>
    );
  }

  return null;
}
