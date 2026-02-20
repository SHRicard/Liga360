import React from 'react';
import { MoonLoader } from 'react-spinners';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

interface LoadingProps {
  size?: number | 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = React.memo(({
  size = 'md',
  message = 'Cargando...',
  className = '',
}: LoadingProps) => {
  const theme = useTheme();
  const resolvedSize =
    typeof size === 'number'
      ? size
      : size === 'sm'
        ? 25
        : size === 'lg'
          ? 100
          : 50;

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      role="status"
      aria-live="polite"
      className={className}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <MoonLoader
          color={theme.custom?.loading?.color}
          size={resolvedSize}
          speedMultiplier={1}
        />
        {message && (
          <Box
            component="p"
            sx={{
              mt: 2,
              fontSize: '1rem',
              color: theme =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.8)'
                  : 'rgba(15,23,42,0.8)',
              fontWeight: 500,
            }}
          >
            {message}
          </Box>
        )}
      </Box>
    </Box>
  );
});
