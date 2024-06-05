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
      className='resize-none rounded-lg p-1 outline-none sm:bg-blue-300 md:bg-red-300 lg:bg-green-200 xl:bg-yellow-200'
      value={publicSummary}
      onChange={event => handleTextAreaChange(event)}
    ></textarea>
  );
}
