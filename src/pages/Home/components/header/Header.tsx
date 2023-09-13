import PrimaryButton from '../../../../shared/components/PrimaryButton';
import { useAuth } from '../../../../core/authentification/auth.hook';
import { Link } from 'react-router-dom';

export default function Header() {
  const { logout, user } = useAuth();

  return (
    <header className='fixed z-50 w-full border border-b border-gray-200 bg-white/20 p-4 backdrop-blur-sm'>
      <nav className='flex items-center justify-between'>
        <Link to={`/catalogue`}>
          <div className='bg-gradient-to-r from-cyan-500 to-blue-500/50 bg-clip-text text-2xl font-extrabold text-transparent'>
            SchoolApp
          </div>
        </Link>
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
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <span>{user?.name}</span>
            <div>
              <img className='w-7 rounded-full' src={user?.picture} />
            </div>
          </div>
          <PrimaryButton text={'Sign Out'} onClick={() => logout()} />
        </div>
      </nav>
    </header>
  );
}
