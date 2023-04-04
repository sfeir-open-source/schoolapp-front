import { Link } from 'react-router-dom';
import PrimaryButton from '../../../../shared/components/PrimaryButton';

export default function Header() {
  return (
    <header>
      <nav className='flex items-center justify-between'>
        <div className='bg-gradient-to-r from-cyan-500 to-blue-500/50 bg-clip-text text-2xl font-extrabold text-transparent'>
          SchoolApp
        </div>
        <ul className='flex items-center gap-4'>
          <li className='text-sm font-semibold leading-6 text-gray-900'>
            Catalogue
          </li>
          <li className='text-sm font-semibold leading-6 text-gray-900'>
            Features
          </li>
          <li className='text-sm font-semibold leading-6 text-gray-900'>
            Profile
          </li>
        </ul>
        <Link to='/'>
          <PrimaryButton text={'Sign Out'} />
        </Link>
      </nav>
    </header>
  );
}
