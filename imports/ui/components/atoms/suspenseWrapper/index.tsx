import React, { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';

interface SuspenseWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const DefaultFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

export const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({
  children,
  fallback,
}) => (
  <Suspense fallback={fallback ?? <DefaultFallback />}>{children}</Suspense>
);
