import PrimaryButton from '../../../../shared/components/PrimaryButton';
import { useAuth } from '../../../../core/authentification/auth.hook';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';

export default function Header() {
  const { logout, user } = useAuth();

  return (
    <header className='fixed z-50 flex w-full flex-wrap items-center justify-between border border-b border-slate-200 bg-slate-100/70 p-4 backdrop-blur-sm'>
      <Link to={`/catalogue`}>
        <div className='bg-gradient-to-r from-cyan-500 to-blue-500/50 bg-clip-text font-extrabold text-transparent'>
          SchoolApp
        </div>
      </Link>
      <div className='flex items-center gap-4 lg:order-1'>
        <div className='flex items-center gap-2'>
          <span className='hidden md:flex'>{user?.name}</span>
          <div>
            <img className='w-7 rounded-full' src={user?.picture} />
          </div>
        </div>
        <PrimaryButton text={'Sign Out'} onClick={() => logout()} />
      </div>
    </header>
  );
}
