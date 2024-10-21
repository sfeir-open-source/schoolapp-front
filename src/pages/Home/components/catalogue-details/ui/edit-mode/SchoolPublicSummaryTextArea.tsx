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
    <textarea
      className='w-full resize-none p-1 p-2 text-slate-600 outline-none hover:bg-slate-100'
      value={publicSummary}
      placeholder='Vide.'
      onChange={event => handleTextAreaChange(event)}
    ></textarea>
  );
}
