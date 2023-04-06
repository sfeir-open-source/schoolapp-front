import { useEffect } from 'react';
import type { CredentialResponse } from 'google-one-tap';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { GoogleUser, useAuth } from '../../../shared/components/GoogleAuth';

export default function GoogleLoginButton() {
  const navigate = useNavigate();
  const { login } = useAuth();

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
  });

  const handleCredentialResponse = (response: CredentialResponse) => {
    const userObject = jwt_decode(response.credential) as GoogleUser;
    login(userObject).then(() => console.log('handleCredentialResponse'));
  };
  return <div id='google-login-button'></div>;
}
