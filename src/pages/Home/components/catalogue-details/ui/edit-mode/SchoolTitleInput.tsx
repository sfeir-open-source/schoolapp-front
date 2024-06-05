interface SchoolTitleInputProps {
  title: string;
  onInputChange: (value: string) => void;
}

export default function SchoolTitleInput({ title, onInputChange }: SchoolTitleInputProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => onInputChange(event.target.value);
  return (
    <input
      className='appearance-none border-none bg-transparent text-4xl font-bold outline-none'
      value={title}
      onChange={handleInputChange}
    />
  );
}
