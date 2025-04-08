import { useAuth } from "../contexts/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { signed, loading } = useAuth();

  if (loading) {
    return null; // ou algum <LoadingSpinner />
  }

  return signed ? children : <Navigate to="/" />;
};

export default PrivateRoute;

