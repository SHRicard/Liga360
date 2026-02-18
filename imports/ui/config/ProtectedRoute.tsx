import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
// import { useAuth } from '../../hooks';
import { APP_ROUTES } from './APP_ROUTES';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const { user, isAuthenticated } = useAuth();

  // No mostrar loading aquí, se maneja en AppLayout
  // if (!isAuthenticated || !user || !user.role) {
  //   return <Navigate to={APP_ROUTES.PUBLIC.LOGIN} replace />;
  // }

  return <>{children}</>;
};
