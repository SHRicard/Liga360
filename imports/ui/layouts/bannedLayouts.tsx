import React, { ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';
import './layouts.css';

interface BannedLayoutsProps {
  children: ReactNode;
}

export const BannedLayouts: React.FC<BannedLayoutsProps> = ({ children }) => {
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
      {children}
    </Box>
  );
};
