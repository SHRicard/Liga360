import React from 'react';
import { Box, Typography } from '@mui/material';

export const LandingPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Bienvenido a Liga360
      </Typography>
      <Typography variant="body1">Página de aterrizaje pública.</Typography>
    </Box>
  );
};
