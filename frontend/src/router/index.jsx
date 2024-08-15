import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import About from "../pages/About";
import Contact from "../pages/Contact";
import Create from "../pages/Create";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : '/',
                element : <Home/>
            }, 
            {
                path : '/about',
                element : <About/>
            },
            {
                path : '/contact',
                element : <Contact/>
            },
            {
                path : '/create',
                element : <Create />
            }
        ]
    },
    {
        path : '*',
        element : <NotFound />
    }
])

export default router;