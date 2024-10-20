import { CatalogueDetails } from './pages/Home/components/catalogue-details/CatalogueDetails';
import Home from './pages/Home/Home';
import { Catalogue } from './pages/Home/components/catalogue/Catalogue';
import Login from './pages/Login/Login';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoutes } from './shared/components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import { useEditMode } from './shared/context/edit-mode.context';

export default function App() {
  const { editMode } = useEditMode();
  return (
    <div className={'h-[100vh] w-full ' + (editMode ? 'bg-slate-50' : 'bg-stone-100')}>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path='/catalogue' element={<Home />}>
            <Route path='/catalogue/:id' element={<CatalogueDetails />}></Route>
            <Route path='/catalogue' element={<Catalogue />}></Route>
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}
