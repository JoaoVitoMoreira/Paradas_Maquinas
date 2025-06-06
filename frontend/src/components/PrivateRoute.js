import { useAuth } from "../contexts/useAuth";
import { Navigate, Outlet } from "react-router-dom"; 

const PrivateRoute = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }
  return signed ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;