import PrimaryButton from '../../../../shared/components/PrimaryButton';
import { useAuth } from '../../../../core/authentification/auth.hook';

export default function Header() {
  const { logout, user } = useAuth();

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
        <div className='flex items-center gap-4'>
          {/* <div>
            <div style={'border-radius: 1rem;'}><img src={user?.picture}/></div>
          </div> */}
          <PrimaryButton text={'Sign Out'} onClick={() => logout()} />
        </div>
      </nav>
    </header>
  );
}
