import React, { useMemo } from 'react';
import { Box, Typography, Skeleton, alpha, useTheme } from '@mui/material';

/* ═══════════════════════════════════════════════════════════════
   CardInstitucion360
   FIFA Ultimate Team — Card vertical premium.
   Diseño exclusivo tipo carta coleccionable con gradientes
   oscuros, acentos dorados y efecto holográfico sutil.
   ═══════════════════════════════════════════════════════════════ */

/* Colores centralizados en theme.custom.cards360 */

export interface CardInstitucion360Props {
  institutionName?: string;
  description?: string;
  phone?: string;
  logo?: File | string | null;
  skeleton?: boolean;
}

/* ── Skeleton helpers ── */
const Skel: React.FC<{
  w?: string | number;
  h?: number;
  round?: boolean;
  bg?: string;
}> = ({ w = '60%', h = 14, round, bg = 'rgba(255,255,255,0.06)' }) => (
  <Skeleton
    variant={round ? 'circular' : 'rounded'}
    animation="wave"
    width={w}
    height={h}
    sx={{
      bgcolor: bg,
      borderRadius: round ? '50%' : 0.5,
    }}
  />
);

/* ── SVG hexagonal pattern background ── */
const HexPattern: React.FC<{
  opacity: number;
  stroke: string;
  strokeW: string;
}> = ({ opacity: op, stroke, strokeW }) => (
  <Box
    sx={{
      position: 'absolute',
      inset: 0,
      opacity: op,
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
    }}
  >
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="hex"
          width="56"
          height="100"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(0.5)"
        >
          <polygon
            points="28,2 52,15 52,40 28,53 4,40 4,15"
            fill="none"
            stroke={stroke}
            strokeWidth={strokeW}
          />
          <polygon
            points="28,52 52,65 52,90 28,103 4,90 4,65"
            fill="none"
            stroke={stroke}
            strokeWidth={strokeW}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" />
    </svg>
  </Box>
);

/* ── Holographic shimmer overlay ── */
const HoloShimmer: React.FC<{
  accentLight: string;
  accentShine: string;
}> = ({ accentLight, accentShine }) => (
  <Box
    sx={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 3,
      opacity: 0,
      transition: 'opacity 0.5s ease',
      background: `linear-gradient(
        105deg,
        transparent 20%,
        ${alpha(accentLight, 0.06)} 35%,
        ${alpha(accentShine, 0.12)} 50%,
        ${alpha(accentLight, 0.06)} 65%,
        transparent 80%
      )`,
      backgroundSize: '200% 100%',
      '.fifa-card:hover &': {
        opacity: 0.3,
        animation: 'holoSlide 6s ease-in-out infinite',
      },
      '@keyframes holoSlide': {
        '0%': { backgroundPosition: '200% 0' },
        '100%': { backgroundPosition: '-200% 0' },
      },
    }}
  />
);

/* ══════════════════════════════════════════════════
   COMPONENTE PRINCIPAL — FIFA UT CARD
   ══════════════════════════════════════════════════ */
export const CardInstitucion360: React.FC<CardInstitucion360Props> = ({
  institutionName,
  description,
  phone,
  logo,
  skeleton: skel = true,
}) => {
  const theme = useTheme();
  const c360 = theme.custom.cards360;

  const logoUrl = useMemo(() => {
    if (logo instanceof File) return URL.createObjectURL(logo);
    if (typeof logo === 'string' && logo) return logo;
    return null;
  }, [logo]);

  const hasName = !!institutionName;
  const hasPhone = !!phone;

  return (
    <Box sx={{ width: '100%', maxWidth: 340, mx: 'auto' }}>
      {/* ── Card Container ── */}
      <Box
        className="fifa-card"
        sx={{
          position: 'relative',
          width: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          background: `linear-gradient(165deg, ${c360.bg.elevated} 0%, ${c360.bg.primary} 40%, ${c360.bg.gradientEnd} 100%)`,
          border: `1.5px solid ${c360.bg.border}`,
          boxShadow: c360.shadow,
        }}
      >
        <HexPattern
          opacity={c360.hexPattern.opacity}
          stroke={c360.accent.main}
          strokeW={c360.hexPattern.strokeWidth}
        />
        <HoloShimmer
          accentLight={c360.accent.light}
          accentShine={c360.accent.shine}
        />

        {/* ── Borde interior sutil ── */}
        <Box
          sx={{
            position: 'absolute',
            inset: 4,
            borderRadius: '13px',
            border: `1px solid ${c360.innerBorder}`,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* ═══════════════════════════════
            HEADER — Rating badge + Brand
           ═══════════════════════════════ */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            px: 2.5,
            pt: 2,
            pb: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Badge L360 */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.2,
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Bebas Neue","Anton","DIN Condensed",sans-serif',
                fontSize: 28,
                fontWeight: 900,
                color: c360.accent.main,
                lineHeight: 1,
                textShadow: `0 0 20px ${alpha(c360.accent.main, 0.3)}`,
              }}
            >
              360
            </Typography>
            <Typography
              sx={{
                fontSize: 6.5,
                fontWeight: 800,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: c360.accent.muted,
                lineHeight: 1,
              }}
            >
              LIGA
            </Typography>
          </Box>

          {/* Nombre Institución - Header */}
          <Box sx={{ textAlign: 'right', flex: 1, ml: 2, minWidth: 0 }}>
            {hasName ? (
              <Typography
                sx={{
                  fontFamily: '"Bebas Neue","Anton","DIN Condensed",sans-serif',
                  fontSize: 13,
                  fontWeight: 900,
                  letterSpacing: 2.5,
                  textTransform: 'uppercase',
                  color: c360.headerName,
                  lineHeight: 1.2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {institutionName}
              </Typography>
            ) : skel ? (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Skel w="65%" h={13} bg={c360.skeletonBg} />
              </Box>
            ) : null}
            <Box
              sx={{
                height: '1px',
                mt: 0.5,
                background: `linear-gradient(90deg, transparent, ${alpha(c360.accent.main, 0.3)}, ${alpha(c360.accent.main, 0.5)})`,
              }}
            />
          </Box>
        </Box>

        {/* ═══════════════════════════════
            LOGO — Centro de la card (Shield Design)
           ═══════════════════════════════ */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 1.5,
            pb: 3,
          }}
        >
          {/* ── Rayos de luz detrás del logo ── */}
          <Box
            sx={{
              position: 'absolute',
              top: '42%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 220,
              height: 220,
              pointerEvents: 'none',
              opacity: 0.5,
            }}
          >
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                return (
                  <line
                    key={i}
                    x1={100 + 30 * Math.cos(angle)}
                    y1={100 + 30 * Math.sin(angle)}
                    x2={100 + 98 * Math.cos(angle)}
                    y2={100 + 98 * Math.sin(angle)}
                    stroke={c360.accent.main}
                    strokeWidth={i % 3 === 0 ? '1.5' : '0.5'}
                    opacity={i % 3 === 0 ? 0.2 : 0.08}
                  />
                );
              })}
              {/* Anillos concéntricos */}
              {[90, 70, 50].map(r => (
                <circle
                  key={r}
                  cx="100"
                  cy="100"
                  r={r}
                  fill="none"
                  stroke={c360.accent.main}
                  strokeWidth="0.5"
                  opacity={0.08}
                  strokeDasharray={r === 70 ? '4 4' : 'none'}
                />
              ))}
            </svg>
          </Box>

          {/* ── Glow pulsante ── */}
          <Box
            sx={{
              position: 'absolute',
              top: '42%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${alpha(c360.accent.main, 0.1)} 0%, ${alpha(c360.accent.main, 0.03)} 40%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          {/* ── Shield / Escudo decorativo (detrás, abajo) ── */}
          <Box
            sx={{
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 130,
              height: 145,
              pointerEvents: 'none',
              opacity: 0.25,
              zIndex: 0,
            }}
          >
            <svg
              viewBox="0 0 130 145"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
            >
              <defs>
                <linearGradient
                  id="shieldGrad"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor={c360.accent.light}
                    stopOpacity="0.8"
                  />
                  <stop
                    offset="50%"
                    stopColor={c360.accent.main}
                    stopOpacity="0.5"
                  />
                  <stop
                    offset="100%"
                    stopColor={c360.accent.dark}
                    stopOpacity="0.2"
                  />
                </linearGradient>
              </defs>
              {/* Shield shape */}
              <path
                d="M65 3 L122 25 L122 80 Q122 120 65 142 Q8 120 8 80 L8 25 Z"
                fill="none"
                stroke="url(#shieldGrad)"
                strokeWidth="1.5"
              />
              {/* Inner shield line */}
              <path
                d="M65 10 L116 30 L116 78 Q116 114 65 135 Q14 114 14 78 L14 30 Z"
                fill="none"
                stroke={c360.accent.main}
                strokeWidth="0.5"
                opacity="0.3"
              />
              {/* Decorative top crown accent */}
              <path
                d="M45 22 L65 12 L85 22"
                fill="none"
                stroke={c360.accent.main}
                strokeWidth="1"
                opacity="0.5"
              />
              {/* Small diamond at top */}
              <polygon
                points="65,6 69,12 65,18 61,12"
                fill={c360.accent.main}
                opacity="0.4"
              />
            </svg>
          </Box>

          {/* ── Logo limpio en primer plano ── */}
          <Box
            sx={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${alpha(c360.accent.main, 0.25)}`,
              bgcolor: c360.logoBg,
              boxShadow: `0 0 30px ${alpha(c360.accent.main, 0.12)}`,
              overflow: 'hidden',
            }}
          >
            {logoUrl ? (
              <Box
                component="img"
                src={logoUrl}
                alt="Logo"
                sx={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  animation: 'fifaLogoIn 0.7s cubic-bezier(0.34,1.56,0.64,1)',
                  '@keyframes fifaLogoIn': {
                    from: {
                      opacity: 0,
                      transform: 'scale(0.4)',
                    },
                    to: { opacity: 1, transform: 'scale(1)' },
                  },
                }}
              />
            ) : skel ? (
              <Skel w={84} h={84} round bg={c360.skeletonBg} />
            ) : null}
          </Box>

          {/* Nombre principal debajo del logo */}
          <Box sx={{ mt: 1.8, textAlign: 'center', px: 2, width: '100%' }}>
            {hasName ? (
              <Typography
                sx={{
                  fontFamily: '"Bebas Neue","Anton","DIN Condensed",sans-serif',
                  fontSize: 22,
                  fontWeight: 900,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: c360.title.color,
                  lineHeight: 1.1,
                  textShadow: c360.title.shadow,
                  animation: 'fifaNameIn 0.5s ease',
                  '@keyframes fifaNameIn': {
                    from: { opacity: 0, transform: 'translateY(8px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                  },
                }}
              >
                {institutionName}
              </Typography>
            ) : skel ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Skel w="55%" h={22} bg={c360.skeletonBg} />
              </Box>
            ) : null}

            {/* Línea separadora dorada */}
            <Box
              sx={{
                width: 60,
                height: '2px',
                mx: 'auto',
                mt: 0.8,
                borderRadius: 1,
                background: `linear-gradient(90deg, transparent, ${c360.accent.main}, transparent)`,
              }}
            />

            {/* Descripción */}
            {description ? (
              <Typography
                sx={{
                  fontSize: 9,
                  fontWeight: 400,
                  color: c360.description,
                  lineHeight: 1.5,
                  mt: 0.8,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{description}&rdquo;
              </Typography>
            ) : null}
          </Box>
        </Box>

        {/* ═══════════════════════════════
            CONTACTO — Teléfono (mini)
           ═══════════════════════════════ */}
        {hasPhone && (
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              mx: 2,
              mb: 0.5,
              px: 1.8,
              py: 0.8,
              borderRadius: '10px',
              bgcolor: c360.panelBg,
              border: `1px solid ${alpha(c360.accent.main, 0.15)}`,
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.6,
            }}
          >
            <Typography
              sx={{
                fontSize: 8,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: c360.accent.main,
              }}
            >
              Contacto
            </Typography>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 600,
                color: c360.statValue,
                letterSpacing: 0.5,
              }}
            >
              {phone}
            </Typography>
          </Box>
        )}

        {/* ═══════════════════════════════
            FOOTER — Branding
           ═══════════════════════════════ */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            px: 2.5,
            py: 1.2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              flex: 1,
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${c360.footer.line})`,
            }}
          />
          <Typography
            sx={{
              fontSize: 7,
              fontWeight: 800,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: c360.footer.text,
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            Liga 360
          </Typography>
          <Box
            sx={{
              flex: 1,
              height: '1px',
              background: `linear-gradient(90deg, ${c360.footer.line}, transparent)`,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
