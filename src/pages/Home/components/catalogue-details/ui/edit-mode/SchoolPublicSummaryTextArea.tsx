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
      className='resize-none rounded-lg border border-slate-400 bg-transparent p-1 p-2 text-slate-600 outline-none'
      value={publicSummary}
      onChange={event => handleTextAreaChange(event)}
    ></textarea>
  );
}
