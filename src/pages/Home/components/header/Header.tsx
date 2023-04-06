import { Link } from 'react-router-dom';
import PrimaryButton from '../../../../shared/components/PrimaryButton';
import { useAuth } from '../../../../shared/components/GoogleAuth';

export default function Header() {
  const { logout } = useAuth();

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
        <PrimaryButton text={'Sign Out'} onClick={() => logout()} />
      </nav>
    </header>
  );
}
