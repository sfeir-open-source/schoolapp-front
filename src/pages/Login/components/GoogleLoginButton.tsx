import { useEffect } from 'react';
import type { CredentialResponse } from 'google-one-tap';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function GoogleLoginButton() {
  const navigate = useNavigate();

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
    const userObject = jwt_decode(response.credential);
    console.log('user decode :', userObject);
    navigate('/home');
  };
  return <div id='google-login-button'></div>;
}
