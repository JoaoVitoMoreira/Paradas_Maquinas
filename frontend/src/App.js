import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/useAuth';
import GlobalStyle from './styles/global';
import PrivateRoute from './components/PrivateRoute';
import DashboardLayout from './components/Layout/DashboardLayout';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import UserPage from './pages/users';
import OperadorPage from './pages/Operador';
import { ToastContainer } from 'react-toastify'; // <-- ADICIONADO: Importa o ToastContainer

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyle />
        {/* ADICIONADO: Contêiner das notificações, para toda a aplicação */}
        <ToastContainer autoClose={3000} position="bottom-right" />
        
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route 
            element={
              <PrivateRoute allowedRoles={['administrador', 'analista de pcp', 'operador de máquina']} />
            }
          >
            <Route element={<DashboardLayout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/usuarios" element={<UserPage />} />
              <Route path="/operador" element={<OperadorPage />} />
            </Route>
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;