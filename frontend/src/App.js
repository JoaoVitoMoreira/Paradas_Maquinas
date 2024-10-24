import "react-toastify/dist/ReactToastify.css";
import {RouterProvider} from "react-router-dom"
import router from "./router"

function App(){

  return <RouterProvider router={router} />
  
}

export default App;