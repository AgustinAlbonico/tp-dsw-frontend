import {
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Canchas from './pages/Canchas'
import Reservas from './pages/Reservas'
import Detalles from './pages/DetallesReserva'
import ForgottenPassword from './pages/ForgottenPassword'
import ValidateEmail from './pages/ValidateEmail'
import PrivateRoutes from './components/privateRoutes'
import App from './App'
import Profile from './pages/Profile'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgottenPassword />} />
      <Route path='/verify/:token' element={<ValidateEmail />} />
      <Route path='' element={<PrivateRoutes />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/canchas' element={<Canchas />} />
        <Route path='/reservas' element={<Reservas />} />
        <Route path='/detalles' element={<Detalles />} />
      </Route>
    </Route>
  )
)
