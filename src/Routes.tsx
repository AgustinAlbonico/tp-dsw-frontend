import {
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import Home from './pages/Home'   //Se importan componentes que representan las páginas y funcionalidades de la app
import Login from './pages/Login'
import Register from './pages/Register'
import Canchas from './pages/Canchas'
import ForgottenPassword from './pages/ForgottenPassword'
import ValidateEmail from './pages/ValidateEmail'
import PrivateRoutes from './components/privateRoutes'
import App from './App'
import Profile from './pages/Profile'
import AdminReservasCliente from './pages/AdminReservasCliente'  // New
import AdminReservasHoy from './pages/AdminReservasHoy'  // New


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path="/AdminReservasCliente" element={<AdminReservasCliente />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgottenPassword />} />
      <Route path='/verify/:token' element={<ValidateEmail />} />
      <Route path='' element={<PrivateRoutes />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/canchas' element={<Canchas />} />
        <Route path="/AdminReservasHoy" element={<AdminReservasHoy />} />
      </Route>
    </Route>
  )
)

