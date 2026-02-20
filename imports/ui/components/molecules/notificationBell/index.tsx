import React, { useState, useCallback, useRef } from 'react';
import {
  Box,
  Badge,
  Popover,
  Typography,
  useTheme,
  Fade,
  Divider,
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationBellProps {
  notifications?: NotificationItem[];
  onNotificationClick?: (notification: NotificationItem) => void;
  onMarkAllRead?: () => void;
}

export const NotificationBell: React.FC<NotificationBellProps> = React.memo(
  ({ notifications = [], onNotificationClick, onMarkAllRead }) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const bellRef = useRef<HTMLDivElement>(null);
    const l = theme.custom.layout;

    const open = Boolean(anchorEl);
    const unreadCount = notifications.filter(n => !n.read).length;

    const handleOpen = useCallback(() => {
      setAnchorEl(bellRef.current);
    }, []);

    const handleClose = useCallback(() => {
      setAnchorEl(null);
    }, []);

    return (
      <>
        {/* ── Bell icon ── */}
        <Box
          ref={bellRef}
          onClick={handleOpen}
          sx={{
            width: 34,
            height: 34,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            cursor: 'pointer',
            backgroundColor: open ? l.activeBg : 'transparent',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: l.hoverBg,
            },
          }}
        >
          <Badge
            badgeContent={unreadCount}
            max={9}
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '0.6rem',
                height: 16,
                minWidth: 16,
                fontWeight: 700,
                backgroundColor: l.notification.badgeBg,
                color: '#fff',
                boxShadow:
                  unreadCount > 0 ? l.notification.badgeShadow : 'none',
                animation:
                  unreadCount > 0
                    ? 'bellPulse 2s ease-in-out infinite'
                    : 'none',
                '@keyframes bellPulse': {
                  '0%, 100%': { transform: 'scale(1) translate(50%, -50%)' },
                  '50%': { transform: 'scale(1.15) translate(50%, -50%)' },
                },
              },
            }}
          >
            <NotificationsNoneIcon
              sx={{
                fontSize: '1.25rem',
                color: theme.palette.text.secondary,
                transition: 'color 0.2s ease',
              }}
            />
          </Badge>
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
                borderRadius: '16px',
                width: 320,
                maxHeight: 400,
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
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2.5,
              py: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: '0.9rem',
                fontWeight: 700,
                color: theme.palette.text.primary,
              }}
            >
              Notificaciones
            </Typography>
            {unreadCount > 0 && (
              <Typography
                onClick={() => {
                  onMarkAllRead?.();
                }}
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Marcar todas leídas
              </Typography>
            )}
          </Box>

          <Divider sx={{ opacity: 0.5 }} />

          {/* Lista de notificaciones */}
          <Box sx={{ maxHeight: 300, overflow: 'auto', py: 0.5 }}>
            {notifications.length === 0 ? (
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <NotificationsNoneIcon
                  sx={{
                    fontSize: '2.5rem',
                    color: theme.palette.text.secondary,
                    opacity: 0.3,
                    mb: 1,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '0.85rem',
                    color: theme.palette.text.secondary,
                    opacity: 0.6,
                  }}
                >
                  Sin notificaciones
                </Typography>
              </Box>
            ) : (
              notifications.map(notification => (
                <Box
                  key={notification.id}
                  onClick={() => {
                    onNotificationClick?.(notification);
                    handleClose();
                  }}
                  sx={{
                    display: 'flex',
                    gap: 1.5,
                    px: 2.5,
                    py: 1.5,
                    cursor: 'pointer',
                    backgroundColor: notification.read
                      ? 'transparent'
                      : l.notification.unreadBg,
                    transition: 'background-color 0.15s ease',
                    '&:hover': {
                      backgroundColor: l.hoverBg,
                    },
                  }}
                >
                  {/* Dot indicador */}
                  <Box
                    sx={{
                      mt: 0.7,
                      width: 7,
                      height: 7,
                      minWidth: 7,
                      borderRadius: '50%',
                      backgroundColor: notification.read
                        ? 'transparent'
                        : theme.palette.primary.main,
                      boxShadow: notification.read
                        ? 'none'
                        : `0 0 6px ${theme.palette.primary.main}`,
                    }}
                  />
                  <Box sx={{ overflow: 'hidden', flexGrow: 1 }}>
                    <Typography
                      sx={{
                        fontSize: '0.82rem',
                        fontWeight: notification.read ? 500 : 700,
                        color: theme.palette.text.primary,
                        lineHeight: 1.3,
                      }}
                    >
                      {notification.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        color: theme.palette.text.secondary,
                        lineHeight: 1.4,
                        mt: 0.2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {notification.message}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.68rem',
                        color: theme.palette.text.secondary,
                        opacity: 0.6,
                        mt: 0.4,
                      }}
                    >
                      {notification.time}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Popover>
      </>
    );
  }
);
