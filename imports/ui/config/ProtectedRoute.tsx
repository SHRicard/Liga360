import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useUserStore } from '../contexts';
import { Loading } from '../components';
import { APP_ROUTES } from './APP_ROUTES';

interface ProtectedRouteProps {
  children: ReactNode;
  requireRole?: boolean;
}

export const ProtectedRoute = ({ children, requireRole = true }: ProtectedRouteProps) => {
  const { isLoggedIn, isLoading, user } = useUserStore();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Loading size="lg" message="Verificando autenticación..." />
      </Box>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to={APP_ROUTES.PUBLIC.LOGIN} replace />;
  }

  if (!user?.role && requireRole) {
    return <Navigate to={APP_ROUTES.PRIVATE.SELECT_ROLE} replace />;
  }

  return <>{children}</>;
};
