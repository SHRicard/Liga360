import React from 'react';
import { createLazyComponent } from '../../performance/lazyLoader';
import { SuspenseWrapper } from '../../components';
import { ROLE } from '../../config';
import { useUserStore } from '../../contexts/useStore/userStore';

const PlayerTournamentPage = createLazyComponent(() =>
  import('./player').then(m => ({ default: m.PlayerTournamentPage }))
);
const SuperAdminTournamentPage = createLazyComponent(() =>
  import('./super_admin').then(m => ({ default: m.SuperAdminTournamentPage }))
);
const ManagerTournamentPage = createLazyComponent(() =>
  import('./manager').then(m => ({ default: m.ManagerTournamentPage }))
);
const RefereeTournamentPage = createLazyComponent(() =>
  import('./referee').then(m => ({ default: m.RefereeTournamentPage }))
);

export const TournamentPage = () => {
  const user = useUserStore(state => state.user);

  const renderDashboardContent = () => {
    switch (user?.role) {
      case ROLE.SUPER_ADMIN:
        return <SuperAdminTournamentPage />;

      case ROLE.MANAGER:
        return <ManagerTournamentPage />;

      case ROLE.REFEREE:
        return <RefereeTournamentPage />;

      case ROLE.PLAYER:
        return <PlayerTournamentPage />;

      default:
        return null;
    }
  };

  return <SuspenseWrapper>{renderDashboardContent()}</SuspenseWrapper>;
};
