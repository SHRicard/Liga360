import React from 'react';
import { Box, Typography } from '@mui/material';

export const AdminDashboard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h3" fontWeight={700}>
        Hola, soy Admin
      </Typography>
    </Box>
  );
};
