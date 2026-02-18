import React from 'react';
import { Box, Tooltip } from '@mui/material';
import { WbSunny, DarkMode } from '@mui/icons-material';
import { useThemeContext } from '../../../hooks/ThemeContext';

export const BtnTheme = () => {
  const { mode, toggleTheme } = useThemeContext();
  const isDark = mode === 'dark';

  return (
    <Tooltip title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}>
      <Box
        onClick={toggleTheme}
        sx={{
          position: 'relative',
          width: 64,
          height: 32,
          borderRadius: '16px',
          background: isDark
            ? 'linear-gradient(135deg, #2c2c2c 0%, #0a0a0a 100%)'
            : 'linear-gradient(135deg, #ffd54f 0%, #ff6f00 100%)',
          cursor: 'pointer',
          padding: '3px',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isDark
            ? '0 2px 8px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.05)'
            : '0 2px 8px rgba(255, 111, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: isDark
              ? '0 4px 12px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.1)'
              : '0 4px 12px rgba(255, 111, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.4)',
          },
        }}
      >
        <Box
          sx={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '3px',
            left: '3px',
            transform: isDark ? 'translateX(32px)' : 'translateX(0)',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {isDark ? (
            <DarkMode
              sx={{
                fontSize: 16,
                color: '#424242',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          ) : (
            <WbSunny
              sx={{
                fontSize: 16,
                color: '#ff6f00',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          )}
        </Box>
      </Box>
    </Tooltip>
  );
};
