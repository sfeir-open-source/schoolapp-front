import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '@schoolApp/core/firebase/firebase.config';

export const ProtectedRoutes = () => {
  if (!auth.currentUser) {
    // user is not authenticated
    return <Navigate to='/' />;
  }
  return <Outlet />;
};
