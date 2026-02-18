import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute, APP_ROUTES } from '../config';
import { createLazyComponent } from '../performance/lazyLoader';
import { PublicLayout } from '../layouts';

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

export const router = createBrowserRouter([
  {
    // Layout público con rutas anidadas
    element: <PublicLayout />,
    children: [
      {
        path: APP_ROUTES.PUBLIC.DESIGN_SYSTEM,
        element: <DesignSystemPage />,
      },
      {
        path: APP_ROUTES.PUBLIC.LANDING,
        element: <LandingPage />,
      },
      {
        path: APP_ROUTES.PUBLIC.LOGIN,
        element: <LoginPage />,
      },
      {
        path: APP_ROUTES.PUBLIC.REGISTER,
        element: <RegisterPage />,
      },
      {
        path: APP_ROUTES.PUBLIC.RECOVERY_PASSWORD,
        element: <RecoveryPasswordPage />,
      },
      {
        path: '*',
        element: <Navigate to={APP_ROUTES.PUBLIC.LOGIN} replace />,
      },
    ],
  },
]);
