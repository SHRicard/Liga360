import React from 'react';
import { Box, Typography } from '@mui/material';

export const SuperAdminTournamentPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Torneos Super Admin
      </Typography>
      <Typography variant="body1">
        Aquí podrás crear y gestionar los torneos. (Interfaz en construcción)
      </Typography>
    </Box>
  );
};
