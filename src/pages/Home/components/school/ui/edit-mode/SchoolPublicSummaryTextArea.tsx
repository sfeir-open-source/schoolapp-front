import { Textarea } from '@/components/ui/textarea';

interface SchoolPublicSummaryTextAreaProps {
  publicSummary: string;
  onTextAreaChange: (value: string) => void;
  editMode: boolean;
}

export default function SchoolPublicSummaryTextArea({
  publicSummary,
  onTextAreaChange,
  editMode,
}: SchoolPublicSummaryTextAreaProps) {
  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => onTextAreaChange(event.target.value);

  return (
    <Textarea
      value={publicSummary}
      readOnly={editMode}
      placeholder='Vide.'
      onChange={event => handleTextAreaChange(event)}
    ></Textarea>
  );
}
