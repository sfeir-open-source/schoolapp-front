import GoogleLoginButton from './components/GoogleLoginButton';
import loginSvg from './../../assets/login.svg';

export default function Login() {
  return (
    <div className='flex w-full h-full'>
      <div className='w-9/12  h-full flex flex-col gap-4 justify-center items-center bg-gradient-to-b from-cyan-500/50 to-blue-500/50'>
        <GoogleLoginButton />
      </div>
      <div className='w-full h-full flex flex-col gap-20  justify-center items-center'>
        <h3 className='text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500/50'>Login Page</h3>
        <img src={loginSvg} />
      </div>
    </div>
  );
}
