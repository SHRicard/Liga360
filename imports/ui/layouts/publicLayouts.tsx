import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import './layouts.css';

export const PublicLayout = () => {
  const theme = useTheme();
  const gradientClass =
    theme.palette.mode === 'light' ? 'layout-gradient-light' : 'layout-gradient-dark';

  return (
    <Box
      className={gradientClass}
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Outlet />
    </Box>
  );
};
