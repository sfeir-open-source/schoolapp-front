import { AiFillSave } from 'react-icons/ai';

interface SaveButtonProps {
  onButtonClick: () => void;
  isShown: boolean;
}

export default function SaveButton({ onButtonClick, isShown }: SaveButtonProps) {
  if (isShown) {
    return (
      <button
        onClick={() => onButtonClick()}
        className='cursor-pointer rounded-full border border-slate-400 bg-slate-200/70 p-2 backdrop-blur-sm hover:bg-slate-300 active:bg-slate-200'
      >
        <AiFillSave />
      </button>
    );
  }

  return null;
}
