import { useAuthentication } from '@schoolApp/shared/hooks/authentification.hook';
import GoogleLoginButton from './components/GoogleLoginButton';
import loginSvg from '@schoolApp/assets/login.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Loader } from '@schoolApp/shared/components/Loader';

export default function Login() {
  const { isAuthenticated, loading } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        navigate('/catalogue', { replace: true });
      }
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='flex h-[100vh] w-full flex-col-reverse md:flex-row'>
      <div className='flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-cyan-500/50 to-blue-500/50'>
        <GoogleLoginButton />
      </div>
      <div className='flex h-full w-full flex-col items-center justify-center gap-20'>
        <h3 className='bg-gradient-to-r from-cyan-500 to-blue-500/50 bg-clip-text text-5xl font-extrabold text-transparent'>
          Login Page
        </h3>
        <img src={loginSvg} alt='login_image' />
      </div>
    </div>
  );
}
