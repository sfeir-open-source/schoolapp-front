import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';

export default function Home() {
  return (
    <div className='flex flex-col gap-4 p-4'>
      <Header />
      <Outlet />
    </div>
  );
}
