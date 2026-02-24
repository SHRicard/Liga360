import React, { useMemo } from 'react';
import { Box, Typography, Skeleton, alpha, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SignpostIcon from '@mui/icons-material/Signpost';

/* Colores centralizados en theme.custom.cards360 */

export interface CardSede360Props {
  branchName?: string;
  address?: string;
  betweenStreets?: string;
  zipCode?: string;
  district?: string;
  city?: string;
  phone?: string;
  logo?: File | string | null;
  skeleton?: boolean;
}

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
          id="hexSede"
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
      <rect width="100%" height="100%" fill="url(#hexSede)" />
    </svg>
  </Box>
);

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
      '.fifa-sede-card:hover &': {
        opacity: 0.3,
        animation: 'holoSlideSede 6s ease-in-out infinite',
      },
      '@keyframes holoSlideSede': {
        '0%': { backgroundPosition: '200% 0' },
        '100%': { backgroundPosition: '-200% 0' },
      },
    }}
  />
);

const StatItem: React.FC<{
  label: string;
  value?: string;
  icon?: React.ReactNode;
  skeleton?: boolean;
  accentMain: string;
  labelColor: string;
  valueColor: string;
  skeletonBg: string;
}> = ({
  label,
  value,
  icon,
  skeleton: skel = true,
  accentMain,
  labelColor,
  valueColor,
  skeletonBg,
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
      {icon && (
        <Box
          sx={{
            color: accentMain,
            display: 'flex',
            fontSize: 13,
            opacity: 0.8,
          }}
        >
          {icon}
        </Box>
      )}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 7,
            fontWeight: 800,
            letterSpacing: 1.8,
            textTransform: 'uppercase',
            color: labelColor,
            lineHeight: 1,
          }}
        >
          {label}
        </Typography>
        {value ? (
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 600,
              color: valueColor,
              lineHeight: 1.4,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              animation: 'fifaFadeInSede 0.4s ease',
              '@keyframes fifaFadeInSede': {
                from: { opacity: 0, transform: 'translateY(3px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            {value}
          </Typography>
        ) : skel ? (
          <Box sx={{ mt: 0.3 }}>
            <Skel w="75%" h={11} bg={skeletonBg} />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

/* ══════════════════════════════════════════════════
   COMPONENTE PRINCIPAL — FIFA UT SEDE CARD
   ══════════════════════════════════════════════════ */
export const CardSede360: React.FC<CardSede360Props> = ({
  branchName,
  address,
  betweenStreets,
  zipCode,
  district,
  city,
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

  const hasBranch = !!branchName;
  const hasCity = !!city;
  const hasDistrict = !!district;
  const hasAddress = !!address;
  const hasPhone = !!phone;
  const hasZip = !!zipCode;

  const locationLine = [city, district].filter(Boolean).join(', ');
  const addressFull = [address, betweenStreets ? `e/ ${betweenStreets}` : '']
    .filter(Boolean)
    .join(' · ');

  return (
    <Box sx={{ width: '100%', maxWidth: 340, mx: 'auto' }}>
      {/* ── Card Container ── */}
      <Box
        className="fifa-sede-card"
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
            HEADER — Sede badge
           ═══════════════════════════════ */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            px: 2.5,
            pt: 2,
            pb: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Icono de sede + mini logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.8,
            }}
          >
            {logoUrl ? (
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: `1.5px solid ${alpha(c360.accent.main, 0.25)}`,
                  bgcolor: c360.logoBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
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
                  }}
                />
              </Box>
            ) : (
              <HomeWorkIcon
                sx={{
                  fontSize: 22,
                  color: c360.accent.main,
                  filter: `drop-shadow(0 0 8px ${alpha(c360.accent.main, 0.3)})`,
                }}
              />
            )}
            <Box>
              <Typography
                sx={{
                  fontFamily: '"Bebas Neue","Anton","DIN Condensed",sans-serif',
                  fontSize: 10,
                  fontWeight: 900,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: c360.accent.muted,
                  lineHeight: 1,
                }}
              >
                SEDE
              </Typography>
            </Box>
          </Box>

          {/* Nombre de la sede */}
          <Box sx={{ textAlign: 'right', flex: 1, ml: 2, minWidth: 0 }}>
            {hasBranch ? (
              <Typography
                sx={{
                  fontFamily: '"Bebas Neue","Anton","DIN Condensed",sans-serif',
                  fontSize: 16,
                  fontWeight: 900,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: c360.title.color,
                  lineHeight: 1.2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {branchName}
              </Typography>
            ) : skel ? (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Skel w="65%" h={16} bg={c360.skeletonBg} />
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
            STATS — Info de la sede
           ═══════════════════════════════ */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            mx: 2,
            mb: 0.5,
            borderRadius: '10px',
            bgcolor: c360.panelBg,
            border: `1px solid ${alpha(c360.accent.main, 0.15)}`,
            backdropFilter: 'blur(10px)',
            overflow: 'hidden',
          }}
        >
          {/* Header de stats */}
          <Box
            sx={{
              px: 1.8,
              py: 0.6,
              borderBottom: `1px solid ${alpha(c360.accent.main, 0.15)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontSize: 8,
                fontWeight: 800,
                letterSpacing: 2.5,
                textTransform: 'uppercase',
                color: c360.accent.main,
                lineHeight: 1,
              }}
            >
              Información
            </Typography>

            {hasZip ? (
              <Typography
                sx={{
                  fontSize: 8,
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: c360.headerName,
                  fontFamily: 'monospace',
                }}
              >
                CP {zipCode}
              </Typography>
            ) : skel ? (
              <Skel w={35} h={8} bg={c360.skeletonBg} />
            ) : null}
          </Box>

          {/* Stats grid */}
          <Box
            sx={{
              px: 1.8,
              py: 1.2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <StatItem
              label="Sede"
              value={hasBranch ? branchName : undefined}
              icon={<HomeWorkIcon sx={{ fontSize: 13 }} />}
              skeleton={skel}
              accentMain={c360.accent.main}
              labelColor={c360.statLabel}
              valueColor={c360.statValue}
              skeletonBg={c360.skeletonBg}
            />
            <StatItem
              label="Ciudad"
              value={hasCity || hasDistrict ? locationLine : undefined}
              icon={<LocationOnIcon sx={{ fontSize: 13 }} />}
              skeleton={skel}
              accentMain={c360.accent.main}
              labelColor={c360.statLabel}
              valueColor={c360.statValue}
              skeletonBg={c360.skeletonBg}
            />
            <StatItem
              label="Dirección"
              value={hasAddress ? addressFull : undefined}
              icon={<SignpostIcon sx={{ fontSize: 13 }} />}
              skeleton={skel}
              accentMain={c360.accent.main}
              labelColor={c360.statLabel}
              valueColor={c360.statValue}
              skeletonBg={c360.skeletonBg}
            />
            <StatItem
              label="Contacto"
              value={hasPhone ? phone : undefined}
              icon={<PhoneIcon sx={{ fontSize: 13 }} />}
              skeleton={skel}
              accentMain={c360.accent.main}
              labelColor={c360.statLabel}
              valueColor={c360.statValue}
              skeletonBg={c360.skeletonBg}
            />
          </Box>
        </Box>
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
