import { useAuth } from "../contexts/hooks/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { signed } = useAuth();

  if (signed === undefined) {
    return null; // Ou um spinner/carregando
  }

  return signed ? children : <Navigate to="/" />;
};

export default PrivateRoute;
