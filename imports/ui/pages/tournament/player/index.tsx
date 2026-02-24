import React from 'react';
import { Box, Typography } from '@mui/material';

export const PlayerTournamentPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Torneos Player
      </Typography>
      <Typography variant="body1">
        Aquí podrás crear y gestionar los torneos. (Interfaz en construcción)
      </Typography>
    </Box>
  );
};
