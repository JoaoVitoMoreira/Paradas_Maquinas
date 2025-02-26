import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import Global from "./styles/global.js";
import { AuthProvider } from "./contexts/auth.js";

function App() {
  return (
    <AuthProvider> 
      <RouterProvider router={router} />
      <Global />
    </AuthProvider>
  );
}

export default App;