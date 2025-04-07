import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/index";
import User from "./pages/users";
import PrivateRoute from "./components/PrivateRoute"; // novo import

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    )
  },
  {
    path: "/usuarios",
    element: (
      <PrivateRoute>
        <User />
      </PrivateRoute>
    )
  }
]);

export default router;
