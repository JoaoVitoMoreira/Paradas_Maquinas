import {createBrowserRouter} from "react-router-dom"
import User from "./pages/users";
import Home from "./pages/Home"
import Login from "./pages/Login/index"
import useAuth from "./contexts/hooks/useAuth";

const Private = ({Item}) => {
    const {logado} = useAuth();

    return logado > 0 ? <Item /> : <Login />
}

const router = createBrowserRouter([
   
    {
        path:"/",
        element: <Login />
    },
    
    {
        path:"/home",
        element: <Private Item={Home}/>
    },
    
    {
        path:"/usuarios",
        element: <User />,
    }
  
]);

export default router;