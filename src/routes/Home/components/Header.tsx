import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav className='flex justify-between items-center'>
        <div className='text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500/50'>SchoolApp</div>
        <ul className='flex gap-4 items-center'>
          <li className='text-sm font-semibold leading-6 text-gray-900'>Catalogue</li>
          <li className='text-sm font-semibold leading-6 text-gray-900'>Features</li>
          <li className='text-sm font-semibold leading-6 text-gray-900'>Profile</li>
        </ul>
        <Link className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 font-medium rounded-lg text-sm px-5 py-1.5 text-center' to='/'>
          Sign Out
        </Link>
      </nav>
    </header>
  );
}
