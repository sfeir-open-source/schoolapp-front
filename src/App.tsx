import { CatalogueDetails } from './pages/Home/components/catalogue-details/CatalogueDetails';
import Home from './pages/Home/Home';
import { Catalogue } from './pages/Home/components/catalogue/Catalogue';
import Login from './pages/Login/Login';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, ProtectedRoute } from './shared/components/GoogleAuth';

export default function App() {
  return (
    <AuthProvider>
      <div className='h-full w-full'>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route
            path='/catalogue'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route
              path='/catalogue/:id'
              element={
                <ProtectedRoute>
                  <CatalogueDetails />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path='/catalogue'
              element={
                <ProtectedRoute>
                  <Catalogue />
                </ProtectedRoute>
              }
            ></Route>
          </Route>
          <Route path='/' element={<Login />}></Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}
