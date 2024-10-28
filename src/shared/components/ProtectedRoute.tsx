import { Navigate, Outlet } from 'react-router-dom';
import { useAuthentication } from '@schoolApp/shared/hooks/authentification.hook';
import { Loader } from './Loader';

export const ProtectedRoutes = () => {
  const { loading, isAuthenticated } = useAuthentication();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
};
