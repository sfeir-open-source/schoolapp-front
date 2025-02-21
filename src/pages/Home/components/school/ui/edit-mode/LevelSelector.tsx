import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import clsx from 'clsx';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';

type Level = 'beginner' | 'intermediate' | 'advanced';
interface Props {
  selectedLevel: string;
  onSelectChange?: (value: Level) => void;
  editMode?: boolean;
}
export default function LevelDropdown({ selectedLevel, onSelectChange, editMode }: Props) {
  const options: { value: Level; label: string }[] = [
    { value: 'beginner', label: 'Debutant' },
    { value: 'intermediate', label: 'Intermédiaire' },
    { value: 'advanced', label: 'Avancé' },
  ];

  const readOnlyClasses = clsx({
    '!cursor-default !text-slate-600 !opacity-100 border-0': editMode,
  });

  return (
    <Select defaultValue={selectedLevel} onValueChange={onSelectChange} disabled={editMode}>
      <SelectTrigger className={readOnlyClasses}>
        <SelectValue />
        {!editMode && (
          <SelectPrimitive.Icon asChild>
            <ChevronDown className='h-4 w-4 opacity-50' />
          </SelectPrimitive.Icon>
        )}
      </SelectTrigger>
      <SelectContent>
        {options.map((option, id) => (
          <SelectItem key={id} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
