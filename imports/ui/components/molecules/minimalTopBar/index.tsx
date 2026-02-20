import React from 'react';
import { Box, useTheme, useMediaQuery, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AnimatedLiga360, BtnTheme } from '../../atoms';
import { SpotlightSearch } from '../spotlightSearch';
import { NotificationBell } from '../notificationBell';
import type { NotificationItem } from '../notificationBell';
import { AvatarPill } from '../avatarPill';

interface MinimalTopBarProps {
  /** Acciones extra custom entre las notificaciones y el avatar */
  actions?: React.ReactNode;
  onMobileMenuClick?: () => void;
  /** Callback del Spotlight Search */
  onSearch?: (query: string) => void;
  /** Notificaciones para el bell */
  notifications?: NotificationItem[];
  onNotificationClick?: (notification: NotificationItem) => void;
  onMarkAllRead?: () => void;
  /** Avatar pill callbacks */
  onProfile?: () => void;
  onChangeRole?: () => void;
  onLogout?: () => void;
}

export const TOPBAR_HEIGHT = 52;

export const MinimalTopBar: React.FC<MinimalTopBarProps> = React.memo(
  ({
    actions,
    onMobileMenuClick,
    onSearch,
    notifications,
    onNotificationClick,
    onMarkAllRead,
    onProfile,
    onChangeRole,
    onLogout,
  }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const l = theme.custom.layout;

    return (
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: `${TOPBAR_HEIGHT}px`,
          zIndex: theme.zIndex.appBar,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 1.5, md: 3 },
          // Glass-morphism effect
          backgroundColor: l.topBar.background,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: `1px solid ${l.topBar.border}`,
          transition: 'background-color 0.3s ease',
        }}
      >
        {/* ── Izquierda: Logo + menú mobile ── */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            minWidth: { md: 160 },
          }}
        >
          {isMobile && onMobileMenuClick && (
            <IconButton
              onClick={onMobileMenuClick}
              size="small"
              sx={{
                color: theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: l.hoverBg,
                },
              }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          )}
          <AnimatedLiga360 maxWidth={110} />
        </Box>

        {/* ── Centro: Spotlight Search (solo desktop) ── */}
        {!isMobile && (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              mx: 4,
            }}
          >
            <SpotlightSearch onSearch={onSearch} />
          </Box>
        )}

        {/* ── Derecha: Search (mobile) + Notificaciones + acciones + Theme + Avatar ── */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 0.5, md: 0.8 },
          }}
        >
          {isMobile && <SpotlightSearch onSearch={onSearch} />}
          <NotificationBell
            notifications={notifications}
            onNotificationClick={onNotificationClick}
            onMarkAllRead={onMarkAllRead}
          />
          {actions}
          <BtnTheme />
          <AvatarPill
            onProfile={onProfile}
            onChangeRole={onChangeRole}
            onLogout={onLogout}
          />
        </Box>
      </Box>
    );
  }
);
