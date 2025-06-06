import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserPage from "./pages/users";
import PrivateRoute from "./components/PrivateRoute";
import DashboardLayout from "./components/Layout/DashboardLayout"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/usuarios",
            element: <UserPage />,
          },
        ],
      },
    ],
  },
]);

export default router;