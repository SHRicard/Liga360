export const APP_ROUTES = {
  PUBLIC: {
    LANDING: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    RECOVERY_PASSWORD: '/recovery-password',
    DESIGN_SYSTEM: '/design-system',
  },
  PRIVATE: {
    DASHBOARD: '/dashboard',
  },
} as const;
