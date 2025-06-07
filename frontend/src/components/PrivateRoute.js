import { useAuth } from "../contexts/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const { signed, loading, user } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  const userRole = user?.func_usua?.toLowerCase() || '';

  const isAuthorized = signed && allowedRoles.includes(userRole);

  return isAuthorized ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;