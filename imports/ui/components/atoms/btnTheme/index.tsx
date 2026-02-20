import React from 'react';
import { Box, Tooltip } from '@mui/material';
import WbSunny from '@mui/icons-material/WbSunny';
import DarkMode from '@mui/icons-material/DarkMode';
import { useThemeContext } from '../../../hooks/ThemeContext';

export const BtnTheme = () => {
  const { mode, toggleTheme } = useThemeContext();
  const isDark = mode === 'dark';

  return (
    <Tooltip title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}>
      <Box onClick={toggleTheme} sx={{ cursor: 'pointer' }}>
        <Box
          sx={{
            display: 'flex',
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: isDark
              ? 'linear-gradient(135deg, #2c2c2c 0%, #0a0a0a 100%)'
              : 'linear-gradient(135deg, #ffd54f 0%, #ff6f00 100%)',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isDark
              ? '0 2px 8px rgba(0, 0, 0, 0.6)'
              : '0 2px 8px rgba(255, 111, 0, 0.4)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: isDark
                ? '0 4px 12px rgba(0, 0, 0, 0.8)'
                : '0 4px 12px rgba(255, 111, 0, 0.6)',
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
            }}
          >
            {isDark ? (
              <DarkMode sx={{ fontSize: 15, color: '#424242' }} />
            ) : (
              <WbSunny sx={{ fontSize: 15, color: '#ff6f00' }} />
            )}
          </Box>
        </Box>
      </Box>
    </Tooltip>
  );
};
