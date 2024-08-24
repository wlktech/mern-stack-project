import { createRoot } from 'react-dom/client'
import './index.css'
import Routes from "./router/index";

import { AuthContextProvider } from '../contexts/AuthContext';

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <Routes />
  </AuthContextProvider>
)
