import { NavigateFunction, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, UserCredential } from '@firebase/auth';
import { auth } from '@schoolApp/core/firebase/firebase.config';
import { addUser } from '@schoolApp/shared/services/user.service';
import Button from '@schoolApp/shared/components/Button';
import { AiOutlineGoogle } from 'react-icons/ai';

export default function GoogleLoginButton() {
  const navigate: NavigateFunction = useNavigate();

  // Initialize Firebase Auth provider
  const provider = new GoogleAuthProvider();

  // whenever a user interacts with the provider, we force them to select an account
  provider.setCustomParameters({
    prompt: 'select_account ',
  });

  const logGoogleUser = async (): Promise<void> => {
    signInWithPopup(auth, provider).then((userCredential: UserCredential) => {
      addUser(userCredential).then(object => {
        console.log('addUser then', object);
        navigate('/catalogue');
      });
    });
  };

  return (
    <div>
      <Button classes='flex items-center gap-4' variant='primary' onClick={logGoogleUser}>
        <AiOutlineGoogle />
        <span>Sign In With Google</span>
      </Button>
    </div>
  );
}
