import React from 'react';
import { Box, Typography } from '@mui/material';

export const RecoveryPasswordPage = () => {
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
      <Typography variant="h4" component="h1" gutterBottom>
        Recuperar contraseña
      </Typography>
      <Typography variant="body1">
        Aquí va el formulario para recuperar la contraseña.
      </Typography>
    </Box>
  );
};
