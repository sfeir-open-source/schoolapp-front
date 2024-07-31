interface SchoolTitleInputProps {
  title: string;
  onInputChange: (value: string) => void;
}

export default function SchoolTitleInput({ title, onInputChange }: SchoolTitleInputProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => onInputChange(event.target.value);
  return (
    <input
      className='w-full rounded-lg border border-slate-400 bg-transparent p-2.5 text-4xl font-bold outline-none'
      value={title}
      onChange={handleInputChange}
    />
  );
}
