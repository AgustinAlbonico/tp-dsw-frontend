import { Outlet, Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

interface PrivateRoutesProps {
  authorizationLevel: string
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({
  authorizationLevel,
}) => {
  const location = useLocation()
  const { user, isLoading } = useAuth()

  return user?.rol === authorizationLevel ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default PrivateRoutes
