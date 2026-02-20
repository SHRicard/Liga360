import React from 'react';
import { createLazyComponent } from '../../performance/lazyLoader';
import { SuspenseWrapper } from '../../components';
import { ROLE } from '../../config';
import { useUserStore } from '../../contexts/useStore/userStore';

// Lazy-load: solo se descarga el dashboard del rol activo
const OwnerDashboard = createLazyComponent(() =>
  import('./owner').then(m => ({ default: m.OwnerDashboard }))
);
const PlayerDashboard = createLazyComponent(() =>
  import('./player').then(m => ({ default: m.PlayerDashboard }))
);
const SuperAdminDashboard = createLazyComponent(() =>
  import('./super_admin').then(m => ({ default: m.SuperAdminDashboard }))
);
const ManagerDashboard = createLazyComponent(() =>
  import('./manager').then(m => ({ default: m.ManagerDashboard }))
);
const RefereeDashboard = createLazyComponent(() =>
  import('./referee').then(m => ({ default: m.RefereeDashboard }))
);

export const DashboardPage = () => {
  const user = useUserStore(state => state.user);

  const renderDashboardContent = () => {
    switch (user?.role) {
      case ROLE.SUPER_ADMIN:
        return <SuperAdminDashboard />;

      case ROLE.OWNER:
        return <OwnerDashboard />;

      case ROLE.MANAGER:
        return <ManagerDashboard />;

      case ROLE.REFEREE:
        return <RefereeDashboard />;

      case ROLE.PLAYER:
        return <PlayerDashboard />;

      default:
        return null;
    }
  };

  return <SuspenseWrapper>{renderDashboardContent()}</SuspenseWrapper>;
};
