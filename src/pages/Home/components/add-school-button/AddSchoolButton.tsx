import { MouseEventHandler } from 'react';
import PrimaryButton from '@schoolApp/shared/components/PrimaryButton';

interface AddSchoolButtonProps {
  editMode: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function AddSchoolButton({
  editMode,
  onClick,
}: AddSchoolButtonProps) {
  return editMode ? (
    <div className='ml-auto'>
      <PrimaryButton text='Add School' onClick={onClick} />
    </div>
  ) : null;
}
