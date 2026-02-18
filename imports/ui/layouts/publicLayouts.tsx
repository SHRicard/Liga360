import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const PublicLayout = () => {
  const theme = useTheme();

  // Degradados más visibles según el tema
  const gradient =
    theme.palette.mode === 'light'
      ? 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 25%, #e3e3e3 75%, #d4d4d4 100%)'
      : 'linear-gradient(135deg, #1a1a1a 0%, #242424 25%, #0f0f0f 75%, #000000 100%)';

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
        background: gradient,
      }}
    >
      <Outlet />
    </Box>
  );
};
