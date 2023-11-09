import { Outlet, Navigate, useLocation } from 'react-router-dom'

const PrivateRoutes = (): JSX.Element => {
  const location = useLocation()

  //estatico
  const user = false

  return user ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default PrivateRoutes
