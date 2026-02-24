export const APP_ROUTES = {
  PUBLIC: {
    LANDING: '/',
    LOGIN: '/iniciar-sesion',
    REGISTER: '/registro',
    RECOVERY_PASSWORD: '/recuperar-contrasena',
    DESIGN_SYSTEM: '/sistema-diseno',
  },
  PRIVATE: {
    DASHBOARD: '/panel',
    SELECT_ROLE: '/seleccionar-rol',
    TOURNAMENT: '/torneos',
  },
} as const;
