import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import About from "../pages/About";
import Contact from "../pages/Contact";
import ReceipeForm from "../components/ReceipeForm";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Index() {
    const { user } = useContext(AuthContext);
    const router = createBrowserRouter([
        {
            path : "/",
            element : <App/>,
            children : [
                {
                    path : '/',
                    element : user ? <Home/> : <Navigate to={'/login'} />
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
                    element : <ReceipeForm />
                }, 
                {
                    path : '/edit/:id',
                    element : <ReceipeForm />
                }
            ]
        },
        {
            path: '/register',
            element : !user ? <Register/> : <Navigate to={'/'} />
        },
        {
            path: '/login',
            element : !user ? <Login/> : <Navigate to={'/'} />
        },
        {
            path : '*',
            element : <NotFound />
        }
    ])

  return (
    <RouterProvider router={router}/>
  )
}