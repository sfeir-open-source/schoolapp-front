import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Level = 'beginner' | 'intermediate' | 'advanced';
interface Props {
  selectedLevel: string;
  onSelectChange?: (value: string) => void;
}
export default function LevelDropdown({ selectedLevel, onSelectChange }: Props) {
  const options: { value: Level; label: string }[] = [
    { value: 'beginner', label: 'Debutant' },
    { value: 'intermediate', label: 'Intermédiaire' },
    { value: 'advanced', label: 'Avancé' },
  ];
  return (
    <Select defaultValue={selectedLevel} onValueChange={onSelectChange}>
      <SelectTrigger className='h-select-sm h-8 text-sm'>
        <SelectValue />
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
