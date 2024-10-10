import { Navigate, Outlet } from 'react-router-dom';
import { useAuthentication } from '../hooks/authentification.hook';

export const ProtectedRoutes = () => {
  const { loading, isAuthenticated } = useAuthentication();

  if (loading) {
    return (
      <>
        <div className='flex h-screen items-center justify-center'>
          <div className='h-20 w-20 animate-ping rounded-full bg-cyan-500'></div>
        </div>
      </>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
};
