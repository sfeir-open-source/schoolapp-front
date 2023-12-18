import GoogleLoginButton from './components/GoogleLoginButton';
import loginSvg from './../../assets/login.svg';

export default function Login() {
  return (
    <div className='flex h-full w-full flex-col-reverse md:flex-row'>
      <div className='flex  h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-cyan-500/50 to-blue-500/50'>
        <GoogleLoginButton />
      </div>
      <div className='flex h-full w-full flex-col items-center  justify-center gap-20'>
        <h3 className='bg-gradient-to-r from-cyan-500 to-blue-500/50 bg-clip-text text-5xl font-extrabold text-transparent'>
          Login Page
        </h3>
        <img src={loginSvg} alt={`login_image`} />
      </div>
    </div>
  );
}
