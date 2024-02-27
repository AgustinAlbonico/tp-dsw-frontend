import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Canchas from './pages/Canchas'
import ForgottenPassword from './pages/ForgottenPassword'
import ValidateEmail from './pages/ValidateEmail'
import PrivateRoutes from './components/privateRoutes'
import App from './App'
import Profile from './pages/Profile'
import Reservas from './pages/Reservas'
import DetalleReserva from './pages/DetalleReserva'
import AdminPanel from './pages/AdminPanel'
import Reservar from './pages/Reservar'
import AdminReservasHoy from './pages/AdminReservasHoy'
import CargarCancha from './pages/CargarCancha'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgottenPassword />} />
      <Route path='/verify/:token' element={<ValidateEmail />} />
      <Route path='' element={<PrivateRoutes authorizationLevel='USUARIO' />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/canchas' element={<Canchas />} />
        <Route path='/mis-reservas' element={<Reservas />}>
          <Route path='detalles' element={<h1>asdad</h1>} />
        </Route>
        <Route path='/reservar' element={<Reservar />} />
      </Route>
      <Route path='' element={<PrivateRoutes authorizationLevel='ADMIN' />}>
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='/reservas/hoy' element={<AdminReservasHoy />} />
        <Route path='/cancha/cargar' element={<CargarCancha />} />
      </Route>
    </Route>
  )
)
