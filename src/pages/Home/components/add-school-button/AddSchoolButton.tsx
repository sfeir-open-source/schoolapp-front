import Button from '@schoolApp/shared/components/Button';

interface AddSchoolButtonProps {
  editMode: boolean;
  onClick: () => void;
}

export default function AddSchoolButton({ editMode, onClick }: AddSchoolButtonProps) {
  return editMode ? (
    <div className='ml-auto'>
      <Button variant='primary' onClick={onClick}>
        Add School
      </Button>
    </div>
  ) : null;
}
