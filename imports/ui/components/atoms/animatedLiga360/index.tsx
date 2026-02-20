import React from 'react';
import { Box } from '@mui/material';

const LOGO_SRC = '/linial360.webp';

interface AnimatedLiga360Props {
  maxWidth?: number;
}

export const AnimatedLiga360: React.FC<AnimatedLiga360Props> = ({
  maxWidth = 150,
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        width: '100%',
        maxWidth,
        overflow: 'hidden',
        cursor: 'pointer',
        userSelect: 'none',
        borderRadius: '6px',
        // Respiración muy suave: escala casi imperceptible
        animation: 'logoBreathe 5s ease-in-out infinite',
        transition: 'transform 0.35s ease, filter 0.35s ease',
        '@keyframes logoBreathe': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.022)' },
          '100%': { transform: 'scale(1)' },
        },
        // Shine sweep: destello que cruza el logo cada 5s
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '-10%',
          left: '-80%',
          width: '50%',
          height: '120%',
          background:
            'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.38) 50%, transparent 80%)',
          transform: 'skewX(-15deg)',
          animation: 'logoShine 5s ease-in-out infinite',
          pointerEvents: 'none',
        },
        '@keyframes logoShine': {
          '0%': { left: '-80%', opacity: 0 },
          '10%': { opacity: 1 },
          '45%': { left: '160%', opacity: 0 },
          '100%': { left: '160%', opacity: 0 },
        },
        // Hover: escala limpia + brillo leve
        '&:hover': {
          transform: 'scale(1.05)',
          filter: 'brightness(1.08)',
          '&::after': { animationDuration: '1.5s' },
        },
      }}
    >
      <Box
        component="img"
        src={LOGO_SRC}
        alt="Liga360"
        sx={{
          display: 'block',
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </Box>
  );
};
