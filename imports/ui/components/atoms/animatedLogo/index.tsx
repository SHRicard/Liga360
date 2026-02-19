import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import logo from '../../../assets/logo.png';

interface AnimatedLogoProps {
  size?: number;
  showText?: boolean;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 90,
  showText = true,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const glowColor = isDark ? '255,213,0' : '37,99,235';
  const glowColorAlt = isDark ? '255,160,0' : '99,102,241';
  const textGradient = isDark
    ? 'linear-gradient(135deg, #FFD500 0%, #FF8C00 50%, #FFD500 100%)'
    : 'linear-gradient(135deg, #2563eb 0%, #6366f1 50%, #2563eb 100%)';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,

        // ── Keyframes globales ──
        '@keyframes spin-ring': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        '@keyframes spin-ring-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        '@keyframes pulse-glow': {
          '0%, 100%': {
            boxShadow: `0 0 20px rgba(${glowColor},0.25), 0 0 40px rgba(${glowColor},0.1)`,
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow: `0 0 30px rgba(${glowColor},0.45), 0 0 60px rgba(${glowColor},0.2), 0 0 90px rgba(${glowColor},0.08)`,
            transform: 'scale(1.03)',
          },
        },
        '@keyframes float-particle': {
          '0%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        },
        '@keyframes orbit-1': {
          '0%': {
            transform: 'rotate(0deg) translateX(var(--orbit-r)) rotate(0deg)',
          },
          '100%': {
            transform:
              'rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg)',
          },
        },
        '@keyframes orbit-2': {
          '0%': {
            transform:
              'rotate(120deg) translateX(var(--orbit-r)) rotate(-120deg)',
          },
          '100%': {
            transform:
              'rotate(480deg) translateX(var(--orbit-r)) rotate(-480deg)',
          },
        },
        '@keyframes orbit-3': {
          '0%': {
            transform:
              'rotate(240deg) translateX(var(--orbit-r)) rotate(-240deg)',
          },
          '100%': {
            transform:
              'rotate(600deg) translateX(var(--orbit-r)) rotate(-600deg)',
          },
        },
        '@keyframes orbit-4': {
          '0%': {
            transform:
              'rotate(60deg) translateX(var(--orbit-r)) rotate(-60deg)',
          },
          '100%': {
            transform:
              'rotate(420deg) translateX(var(--orbit-r)) rotate(-420deg)',
          },
        },
        '@keyframes orbit-5': {
          '0%': {
            transform:
              'rotate(180deg) translateX(var(--orbit-r)) rotate(-180deg)',
          },
          '100%': {
            transform:
              'rotate(540deg) translateX(var(--orbit-r)) rotate(-540deg)',
          },
        },
        '@keyframes orbit-6': {
          '0%': {
            transform:
              'rotate(300deg) translateX(var(--orbit-r)) rotate(-300deg)',
          },
          '100%': {
            transform:
              'rotate(660deg) translateX(var(--orbit-r)) rotate(-660deg)',
          },
        },
        '@keyframes text-shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        '@keyframes neon-flicker': {
          '0%, 100%': { opacity: 1 },
          '92%': { opacity: 1 },
          '93%': { opacity: 0.8 },
          '94%': { opacity: 1 },
          '96%': { opacity: 0.9 },
          '97%': { opacity: 1 },
        },
      }}
    >
      {/* ── Contenedor del logo con anillos y partículas ── */}
      <Box
        sx={
          {
            position: 'relative',
            width: size + 50,
            height: size + 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '--orbit-r': `${(size + 50) / 2 + 4}px`,
          } as any
        }
      >
        {/* Anillo exterior giratorio - Gradiente cónico */}
        <Box
          sx={{
            position: 'absolute',
            inset: -4,
            borderRadius: '50%',
            padding: '2.5px',
            background: `conic-gradient(
              from 0deg,
              transparent 0deg,
              rgba(${glowColor},0.8) 60deg,
              rgba(${glowColorAlt},0.6) 120deg,
              transparent 180deg,
              rgba(${glowColor},0.4) 240deg,
              transparent 360deg
            )`,
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            animation: 'spin-ring 4s linear infinite',
            filter: `blur(0.5px) drop-shadow(0 0 6px rgba(${glowColor},0.5))`,
          }}
        />

        {/* Segundo anillo - Gira en reversa, más sutil */}
        <Box
          sx={{
            position: 'absolute',
            inset: -10,
            borderRadius: '50%',
            padding: '1.5px',
            background: `conic-gradient(
              from 180deg,
              transparent 0deg,
              rgba(${glowColorAlt},0.4) 90deg,
              transparent 180deg,
              rgba(${glowColor},0.3) 270deg,
              transparent 360deg
            )`,
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            animation: 'spin-ring-reverse 6s linear infinite',
            opacity: 0.6,
          }}
        />

        {/* Aura de resplandor pulsante detrás del logo */}
        <Box
          sx={{
            position: 'absolute',
            width: size + 10,
            height: size + 10,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(${glowColor},0.15) 0%, transparent 70%)`,
            animation: 'pulse-glow 3s ease-in-out infinite',
          }}
        />

        {/* Partículas orbitantes */}
        {[
          {
            anim: 'orbit-1',
            dur: '3.5s',
            sz: 5,
            color: glowColor,
            opacity: 0.9,
          },
          {
            anim: 'orbit-2',
            dur: '4.2s',
            sz: 4,
            color: glowColorAlt,
            opacity: 0.7,
          },
          {
            anim: 'orbit-3',
            dur: '3.8s',
            sz: 3,
            color: glowColor,
            opacity: 0.8,
          },
          {
            anim: 'orbit-4',
            dur: '5s',
            sz: 3.5,
            color: glowColorAlt,
            opacity: 0.6,
          },
          {
            anim: 'orbit-5',
            dur: '4.5s',
            sz: 2.5,
            color: glowColor,
            opacity: 0.75,
          },
          {
            anim: 'orbit-6',
            dur: '3.2s',
            sz: 4.5,
            color: glowColorAlt,
            opacity: 0.85,
          },
        ].map((p, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: p.sz,
              height: p.sz,
              borderRadius: '50%',
              background: `rgba(${p.color},${p.opacity})`,
              boxShadow: `0 0 ${p.sz * 2}px rgba(${p.color},0.6), 0 0 ${p.sz * 4}px rgba(${p.color},0.3)`,
              animation: `${p.anim} ${p.dur} linear infinite, float-particle 2s ease-in-out infinite ${i * 0.3}s`,
            }}
          />
        ))}

        {/* Logo imagen con pulso */}
        <Box
          component="img"
          src={logo}
          alt="Liga360"
          sx={{
            width: size,
            height: size,
            objectFit: 'contain',
            position: 'relative',
            zIndex: 2,
            filter: isDark
              ? `drop-shadow(0 0 12px rgba(${glowColor},0.4))`
              : `drop-shadow(0 0 8px rgba(${glowColor},0.2))`,
            animation: 'pulse-glow 3s ease-in-out infinite',
            borderRadius: '50%',
            transition: 'transform 0.3s ease, filter 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1) rotate(5deg)',
              filter: isDark
                ? `drop-shadow(0 0 24px rgba(${glowColor},0.7))`
                : `drop-shadow(0 0 16px rgba(${glowColor},0.35))`,
            },
          }}
        />
      </Box>

      {/* ── Texto "Liga360" en CSS puro ── */}
      {showText && (
        <Box sx={{ textAlign: 'center', mt: 0.5 }}>
          <Typography
            variant="h5"
            component="span"
            sx={{
              fontWeight: 900,
              letterSpacing: 6,
              fontSize: { xs: '1.3rem', sm: '1.6rem' },
              textTransform: 'uppercase',
              background: `linear-gradient(
                90deg,
                rgba(${glowColor},0.6) 0%,
                rgba(${glowColor},1) 20%,
                rgba(${glowColorAlt},1) 40%,
                rgba(${glowColor},1) 60%,
                rgba(${glowColorAlt},1) 80%,
                rgba(${glowColor},0.6) 100%
              )`,
              backgroundSize: '200% auto',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation:
                'text-shimmer 4s linear infinite, neon-flicker 5s ease-in-out infinite',
              filter: `drop-shadow(0 0 8px rgba(${glowColor},0.4))`,
              display: 'block',
            }}
          >
            Liga360
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              letterSpacing: 8,
              fontSize: '0.55rem',
              fontWeight: 500,
              mt: 0.3,
              color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
              textTransform: 'uppercase',
            }}
          >
            Tu liga, tu pasión
          </Typography>
        </Box>
      )}
    </Box>
  );
};
