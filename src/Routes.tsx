import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Canchas from './pages/Canchas'
import ForgottenPassword from './pages/ForgottenPassword'
import ValidateEmail from './pages/ValidateEmail'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgottenPassword />,
  },
  {
    path: '/verify/:token',
    element: <ValidateEmail />,
  },
  {
    path: '/canchas',
    element: <Canchas />,
  },
])
