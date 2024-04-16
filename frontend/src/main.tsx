import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Error from './components/Error.tsx'
import Login from './pages/Login.tsx'
import { AuthProvider } from './context/AuthProvider.tsx';

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <Error />,
    },
    {
      path: '/login',
      element: <Login />,
      errorElement: <Error />,
    }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider >
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
