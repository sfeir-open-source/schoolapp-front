import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useEditMode } from '@/shared/context/edit-mode.context';

const EditModeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { editMode, toggle } = useEditMode();
  return (
    <div className={className + ' flex items-center space-x-2'}>
      <Switch checked={editMode} onCheckedChange={toggle} />
      <Label>Edit Mode</Label>
    </div>
  );
};

export default EditModeToggle;
