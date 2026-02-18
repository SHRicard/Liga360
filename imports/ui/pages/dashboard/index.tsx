import React from 'react';
import { AdminDashboard } from './admin';
import { PlayerDashboard } from './player';
import { SuperAdminDashboard } from './super_admin';
import { TournamentAdminDashboard } from './tournament_admin';
import { ROLE } from '../../config';
import { useUserStore } from '../../contexts/useStore/userStore';

export const DashboardPage = () => {
  const user = useUserStore(state => state.user);

  const renderDashboardContent = () => {
    switch (user?.role) {
      case ROLE.SUPER_ADMIN:
        return <SuperAdminDashboard />;

      case ROLE.ADMIN:
        return <AdminDashboard />;

      case ROLE.TOURNAMENT_ADMIN:
        return <TournamentAdminDashboard />;

      case ROLE.PLAYER:
        return <PlayerDashboard />;

      default:
        return null;
    }
  };

  return <>{renderDashboardContent()}</>;
};
