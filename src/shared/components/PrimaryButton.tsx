type PrimaryButtonProps = {
  text: string
}

export default function PrimaryButton({ text }: PrimaryButtonProps) {
  return (
    <button className='rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-1.5 text-center text-sm font-medium text-white hover:scale-105'>
      {text}
    </button>
  )
}
