import { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface GoogleUser {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

interface InterfaceAuthContext {
  login: (user: GoogleUser) => Promise<void>;
  logout: () => void;
  user: GoogleUser | null;
}

const AuthContext = createContext<InterfaceAuthContext>(
  {} as InterfaceAuthContext
);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data: GoogleUser) => {
    console.log('here', user, data);
    setUser(data);
    navigate('/catalogue');
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate('/', { replace: true });
  };
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const currentUserContext = useContext(AuthContext);
  return currentUserContext;
};

import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: any) => {
  const auth = useAuth();

  console.log(auth);

  if (!auth.user) {
    // user is not authenticated
    return <Navigate to='/' />;
  }
  return children;
};
