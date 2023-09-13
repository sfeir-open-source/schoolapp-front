import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';

export default function Home() {
  return (
    <div className='flex flex-col'>
      <Header />
      <Outlet />
    </div>
  );
}
