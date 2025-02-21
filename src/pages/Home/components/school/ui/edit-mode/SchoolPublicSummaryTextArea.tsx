import { Textarea } from '@/components/ui/textarea';

interface SchoolPublicSummaryTextAreaProps {
  publicSummary: string;
  onTextAreaChange: (value: string) => void;
}

export default function SchoolPublicSummaryTextArea({
  publicSummary,
  onTextAreaChange,
}: SchoolPublicSummaryTextAreaProps) {
  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => onTextAreaChange(event.target.value);
  return (
    <Textarea value={publicSummary} placeholder='Vide.' onChange={event => handleTextAreaChange(event)}></Textarea>
  );
}
