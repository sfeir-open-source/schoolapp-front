import { Link } from 'react-router-dom';
import PrimaryButton from '../../../../shared/components/PrimaryButton';

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
        <Link to='/'>
          <PrimaryButton text={'Sign Out'}/>
        </Link>
      </nav>
    </header>
  );
}
