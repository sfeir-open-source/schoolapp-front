import { CatalogueDetails } from './pages/Home/components/catalogue-details/CatalogueDetails';
import Home from './pages/Home/Home';
import { Catalogue } from './pages/Home/components/catalogue/Catalogue';
import Login from './pages/Login/Login';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoutes } from './shared/components/ProtectedRoute';

export default function App() {
  return (
    <div className='h-full w-full'>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path='/catalogue' element={<Home />}>
            <Route path='/catalogue/:id' element={<CatalogueDetails />}></Route>
            <Route path='/catalogue' element={<Catalogue />}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}