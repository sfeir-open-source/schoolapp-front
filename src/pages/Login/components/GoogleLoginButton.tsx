import { useEffect } from 'react';
import type { CredentialResponse } from 'google-one-tap';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../core/authentification/auth.hook';
import { GoogleUser } from '../../../shared/interfaces/google-user';
import { useLocalStorage } from '../../../shared/hooks/local-storage.hook';
import { useCookies } from 'react-cookie';

export default function GoogleLoginButton() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [cookies, setCookie] = useCookies(['jwt', 'test']);

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('google-login-button')!,
      { theme: 'outline' }
    );
    window.google.accounts.id.prompt();
  }, [login]);

  const handleCredentialResponse = (response: CredentialResponse) => {
    const userObject = jwt_decode(response.credential) as GoogleUser;
    console.log({ userObject, response });
    login(userObject).then(() => {
      setCookie('jwt', response.credential, { path: '/' });
      navigate('/catalogue');
    });
  };
  return <div id='google-login-button'></div>;
}
