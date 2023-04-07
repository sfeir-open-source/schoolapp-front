import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../core/authentification/auth.hook';

export const ProtectedRoutes = () => {
  const auth = useAuth();

  if (!auth.user) {
    // user is not authenticated
    return <Navigate to='/' />;
  }
  return <Outlet />;
};
