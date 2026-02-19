import React from 'react';
import { OwnerDashboard } from './owner';
import { PlayerDashboard } from './player';
import { SuperAdminDashboard } from './super_admin';
import { ManagerDashboard } from './manager';
import { RefereeDashboard } from './referee';
import { ROLE } from '../../config';
import { useUserStore } from '../../contexts/useStore/userStore';

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

  return <>{renderDashboardContent()}</>;
};
