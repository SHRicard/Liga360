import React, { useState, useCallback, useRef } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Popover,
  Divider,
  useTheme,
  Fade,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LogoutIcon from '@mui/icons-material/Logout';
import { useUserStore } from '../../../contexts';
import type { Role } from '../../../config';

/* ── Mapeo de roles a colores y labels ── */
const ROLE_CONFIG: Record<Role, { label: string; color: string; bg: string }> =
  {
    player: { label: 'Jugador', color: '#2563eb', bg: 'rgba(37,99,235,0.1)' },
    owner: {
      label: 'Institución',
      color: '#16a34a',
      bg: 'rgba(22,163,74,0.1)',
    },
    manager: { label: 'Manager', color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
    referee: { label: 'Árbitro', color: '#7c3aed', bg: 'rgba(124,58,237,0.1)' },
    super_admin: {
      label: 'Admin',
      color: '#dc2626',
      bg: 'rgba(220,38,38,0.1)',
    },
  };

interface AvatarPillProps {
  onProfile?: () => void;
  onChangeRole?: () => void;
  onLogout?: () => void;
}

export const AvatarPill: React.FC<AvatarPillProps> = React.memo(
  ({ onProfile, onChangeRole, onLogout }) => {
    const theme = useTheme();
    const { user } = useUserStore();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const pillRef = useRef<HTMLDivElement>(null);
    const l = theme.custom.layout;

    const open = Boolean(anchorEl);

    const handleOpen = useCallback(() => {
      setAnchorEl(pillRef.current);
    }, []);

    const handleClose = useCallback(() => {
      setAnchorEl(null);
    }, []);

    const nombre = user?.profile?.nombre || 'Usuario';
    const apellido = user?.profile?.apellido || '';
    const email = user?.emails?.[0]?.address || '';
    const avatarUrl = user?.profile?.avatar || '';
    const role = user?.role;
    const roleConfig = role ? ROLE_CONFIG[role] : null;

    // Iniciales para el avatar fallback
    const initials = `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();

    const menuItems = [
      {
        icon: <PersonOutlineIcon sx={{ fontSize: '1.1rem' }} />,
        label: 'Mi perfil',
        action: onProfile,
      },
      {
        icon: <SwapHorizIcon sx={{ fontSize: '1.1rem' }} />,
        label: 'Cambiar rol',
        action: onChangeRole,
      },
    ];

    return (
      <>
        {/* ── Pill ── */}
        <Box
          ref={pillRef}
          onClick={handleOpen}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            pl: 0.5,
            pr: 1.5,
            py: 0.4,
            borderRadius: '20px',
            cursor: 'pointer',
            backgroundColor: open ? l.activeBg : 'transparent',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: l.hoverBg,
            },
          }}
        >
          <Avatar
            src={avatarUrl}
            sx={{
              width: 30,
              height: 30,
              fontSize: '0.75rem',
              fontWeight: 700,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              border: `2px solid ${l.popover.border}`,
              transition: 'border-color 0.2s ease',
            }}
          >
            {initials}
          </Avatar>
          <Typography
            sx={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: theme.palette.text.primary,
              maxWidth: 100,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {nombre}
          </Typography>
        </Box>

        {/* ── Dropdown ── */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={Fade}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                borderRadius: '14px',
                minWidth: 200,
                overflow: 'hidden',
                backgroundColor: l.popover.background,
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: `1px solid ${l.popover.border}`,
                boxShadow: l.popover.shadow,
              },
            },
          }}
        >
          {/* Header: avatar + info */}
          <Box sx={{ px: 2, pt: 2, pb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <Avatar
                src={avatarUrl}
                sx={{
                  width: 28,
                  height: 28,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                }}
              >
                {initials}
              </Avatar>
              <Box sx={{ overflow: 'hidden' }}>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    lineHeight: 1.3,
                  }}
                >
                  {nombre} {apellido}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.65rem',
                    color: theme.palette.text.secondary,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {email}
                </Typography>
              </Box>
            </Box>

            {/* Role badge */}
            {roleConfig && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    px: 1,
                    py: 0.25,
                    borderRadius: '6px',
                    backgroundColor: roleConfig.bg,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: roleConfig.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {roleConfig.label}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

          <Divider sx={{ opacity: 0.5 }} />

          {/* Menu items */}
          <Box sx={{ py: 0.5, px: 0.8 }}>
            {menuItems.map((item, i) => (
              <Box
                key={i}
                onClick={() => {
                  item.action?.();
                  handleClose();
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.2,
                  py: 0.7,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: theme.palette.text.primary,
                  transition: 'background-color 0.15s ease',
                  '&:hover': {
                    backgroundColor: l.hoverBg,
                  },
                }}
              >
                <Box
                  sx={{ color: theme.palette.text.secondary, display: 'flex' }}
                >
                  {item.icon}
                </Box>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ opacity: 0.5 }} />

          {/* Logout */}
          <Box sx={{ py: 0.5, px: 0.8, pb: 0.8 }}>
            <Box
              onClick={() => {
                onLogout?.();
                handleClose();
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 1.2,
                py: 0.7,
                borderRadius: '8px',
                cursor: 'pointer',
                color: theme.palette.error.main,
                transition: 'background-color 0.15s ease',
                '&:hover': {
                  backgroundColor: l.logoutHoverBg,
                },
              }}
            >
              <LogoutIcon sx={{ fontSize: '1rem' }} />
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                Cerrar sesión
              </Typography>
            </Box>
          </Box>
        </Popover>
      </>
    );
  }
);
