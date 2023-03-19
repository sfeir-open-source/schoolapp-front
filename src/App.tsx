import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className='w-full h-full'>
      <Routes>
        <Route path='*' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
    </div>
  );
}
