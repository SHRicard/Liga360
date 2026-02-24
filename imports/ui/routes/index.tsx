import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute, APP_ROUTES } from '../config';
import { createLazyComponent } from '../performance/lazyLoader';
import { PublicLayout, BannedLayouts, PrivateLayouts } from '../layouts';
import { SuspenseWrapper } from '../components';

const DesignSystemPage = createLazyComponent(() =>
  import('../pages/design_system').then(m => ({ default: m.DesignSystemPage }))
);

const LandingPage = createLazyComponent(() =>
  import('../pages/landing').then(m => ({ default: m.LandingPage }))
);
const LoginPage = createLazyComponent(() =>
  import('../pages/login').then(m => ({ default: m.LoginPage }))
);
const RegisterPage = createLazyComponent(() =>
  import('../pages/register').then(m => ({ default: m.RegisterPage }))
);

const RecoveryPasswordPage = createLazyComponent(() =>
  import('../pages/recovery_password').then(m => ({
    default: m.RecoveryPasswordPage,
  }))
);

const DashboardPage = createLazyComponent(() =>
  import('../pages/dashboard').then(m => ({ default: m.DashboardPage }))
);

const SelectRolePage = createLazyComponent(() =>
  import('../pages/select_role').then(m => ({ default: m.SelectRolePage }))
);

const TournamentPage = createLazyComponent(() =>
  import('../pages/tournament').then(m => ({ default: m.TournamentPage }))
);

export const router = createBrowserRouter([
  {
    // Layout público con rutas anidadas
    element: <PublicLayout />,
    children: [
      {
        path: APP_ROUTES.PUBLIC.DESIGN_SYSTEM,
        element: (
          <SuspenseWrapper>
            <DesignSystemPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: APP_ROUTES.PUBLIC.LANDING,
        element: (
          <SuspenseWrapper>
            <LandingPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: APP_ROUTES.PUBLIC.LOGIN,
        element: (
          <SuspenseWrapper>
            <LoginPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: APP_ROUTES.PUBLIC.REGISTER,
        element: (
          <SuspenseWrapper>
            <RegisterPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: APP_ROUTES.PUBLIC.RECOVERY_PASSWORD,
        element: (
          <SuspenseWrapper>
            <RecoveryPasswordPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    // Ruta privada - selección de rol (sin necesidad de rol asignado)
    path: APP_ROUTES.PRIVATE.SELECT_ROLE,
    element: (
      <ProtectedRoute requireRole={false}>
        <SuspenseWrapper>
          <BannedLayouts>
            <SelectRolePage />
          </BannedLayouts>
        </SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    // Ruta privada - dashboard
    path: APP_ROUTES.PRIVATE.DASHBOARD,
    element: (
      <ProtectedRoute>
        <SuspenseWrapper>
          <PrivateLayouts>
            <DashboardPage />
          </PrivateLayouts>
        </SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    // Ruta privada - torneos (solo super_admin)
    path: APP_ROUTES.PRIVATE.TOURNAMENT,
    element: (
      <ProtectedRoute>
        <SuspenseWrapper>
          <PrivateLayouts>
            <TournamentPage />
          </PrivateLayouts>
        </SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to={APP_ROUTES.PUBLIC.LOGIN} replace />,
  },
]);
