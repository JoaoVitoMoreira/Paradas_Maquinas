import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import Global from "./styles/global.js";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Global />
    </>
  );
}

export default App;