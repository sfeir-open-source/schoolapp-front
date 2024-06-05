import { ReactNode, createContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleUser } from '../../shared/interfaces/google-user';
import { useLocalStorage } from '../../shared/hooks/local-storage.hook';

interface InterfaceAuthContext {
  login: (user: GoogleUser) => Promise<void>;
  logout: () => void;
  user: GoogleUser | null;
}

export const AuthContext = createContext<InterfaceAuthContext>({} as InterfaceAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage('___user___', null);
  const navigate = useNavigate();

  const login = async (data: GoogleUser) => setUser(data);

  const logout = () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
