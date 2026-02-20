import React, { useState, useCallback } from 'react';
import { Box, Tooltip, useTheme, useMediaQuery, Zoom } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

export interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface FloatingDockProps {
  items: DockItem[];
}

export const DOCK_HEIGHT = 68;

export const FloatingDock: React.FC<FloatingDockProps> = React.memo(
  ({ items }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const location = useLocation();
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const handleClick = useCallback(
      (path: string) => {
        navigate(path);
      },
      [navigate]
    );

    const isActive = useCallback(
      (path: string) =>
        location.pathname === path || location.pathname.startsWith(path + '/'),
      [location.pathname]
    );

    const iconSize = isMobile ? 38 : 44;
    const l = theme.custom.layout;
    const d = l.dock;

    return (
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          bottom: { xs: 12, md: 18 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: theme.zIndex.appBar + 1,
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 0.5, md: 1 },
          px: { xs: 1.5, md: 2.5 },
          py: 1,
          // Glass-morphism dock
          backgroundColor: d.background,
          backdropFilter: 'blur(24px) saturate(200%)',
          WebkitBackdropFilter: 'blur(24px) saturate(200%)',
          borderRadius: '22px',
          border: `1px solid ${d.border}`,
          boxShadow: d.shadow,
        }}
      >
        {items.map(item => {
          const active = isActive(item.path);
          const hovered = hoveredId === item.id;

          return (
            <Tooltip
              key={item.id}
              title={item.label}
              placement="top"
              arrow
              TransitionComponent={Zoom}
              slotProps={{
                tooltip: {
                  sx: {
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    backgroundColor: l.tooltip.background,
                    color: l.tooltip.color,
                    borderRadius: '8px',
                    px: 1.5,
                    py: 0.5,
                  },
                },
                arrow: {
                  sx: {
                    color: l.tooltip.background,
                  },
                },
              }}
            >
              <Box
                onClick={() => handleClick(item.path)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                sx={{
                  position: 'relative',
                  width: iconSize,
                  height: iconSize,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: hovered
                    ? 'scale(1.25) translateY(-8px)'
                    : 'scale(1) translateY(0)',
                  backgroundColor: active ? d.activeBg : 'transparent',
                  color: active ? d.activeColor : theme.palette.text.secondary,
                  '&:hover': {
                    backgroundColor: d.hoverBg,
                    color: theme.palette.text.primary,
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: isMobile ? '1.3rem' : '1.5rem',
                    transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  },
                }}
              >
                {item.icon}

                {/* Indicador activo (dot) */}
                {active && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 2,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      backgroundColor: d.activeDot,
                      boxShadow: d.activeDotGlow,
                    }}
                  />
                )}
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    );
  }
);
