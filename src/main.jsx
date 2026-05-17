import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import './index.css'
import App from './App.jsx'
import { router } from './routes/router.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster/>
      </AuthProvider>
    </ThemeProvider>
  </>,
)
