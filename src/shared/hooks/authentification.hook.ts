import { auth } from '@schoolApp/core/firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

export const useAuthentication = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  onAuthStateChanged(auth, user => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  });

  return { loading, isAuthenticated };
};
