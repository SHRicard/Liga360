import React from 'react';
import { createLazyComponent } from '../../performance/lazyLoader';
import { SuspenseWrapper } from '../../components';
import { ROLE } from '../../config';
import { useUserStore } from '../../contexts/useStore/userStore';
import { Box, Typography } from '@mui/material';

const OwnerInstitutions = createLazyComponent(() =>
  import('./owner').then(m => ({ default: m.OwnerInstitutions }))
);

export const InstitutionsPage = () => {
  const user = useUserStore(state => state.user);

  const renderContent = () => {
    switch (user?.role) {
      case ROLE.OWNER:
        return <OwnerInstitutions />;

      default:
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '60vh',
            }}
          >
            <Typography variant="h5" fontWeight={600}>
              No tienes acceso a esta sección
            </Typography>
          </Box>
        );
    }
  };

  return <SuspenseWrapper>{renderContent()}</SuspenseWrapper>;
};
