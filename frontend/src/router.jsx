import {createBrowserRouter} from "react-router-dom"
import User from "./pages/users";
import Home from "./pages/Home"

const router = createBrowserRouter([
    {
        path:"/",
        element:<Home />,
    },
    
    {
        path:"/usuarios",
        element: <User />
    }
]);

export default router;