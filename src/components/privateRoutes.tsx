import { Outlet, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoutes = (): JSX.Element => {
  const location = useLocation();

  const { user } = useAuth();
  console.log('asd');
  console.log(user);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
