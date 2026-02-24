import React, { ReactNode, useCallback } from 'react';
import { Box, useTheme } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import {
  MinimalTopBar,
  TOPBAR_HEIGHT,
} from '../components/molecules/minimalTopBar';
import {
  FloatingDock,
  DOCK_HEIGHT,
} from '../components/molecules/floatingDock';
import type { DockItem } from '../components/molecules/floatingDock';
import { useDockItems } from '../hooks/useDockItems';
import { useUserStore } from '../contexts/useStore/userStore';
import { APP_ROUTES } from '../config';
import { storeHelper } from '../helpers/store.helper';
import './layouts.css';

interface PrivateLayoutsProps {
  children?: ReactNode;
  topBarActions?: React.ReactNode;
  customDockItems?: DockItem[];
}

export const PrivateLayouts: React.FC<PrivateLayoutsProps> = ({
  children,
  topBarActions,
  customDockItems,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const clearUser = useUserStore(s => s.clearUser);
  const roleDockItems = useDockItems();

  const handleLogout = useCallback(() => {
    Meteor.logout(() => {
      clearUser();
      storeHelper.clear();
      navigate(APP_ROUTES.PUBLIC.LOGIN, { replace: true });
    });
  }, [clearUser, navigate]);

  const gradientClass =
    theme.palette.mode === 'light'
      ? 'layout-gradient-light'
      : 'layout-gradient-dark';

  return (
    <Box
      className={gradientClass}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <MinimalTopBar actions={topBarActions} onLogout={handleLogout} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          marginTop: `${TOPBAR_HEIGHT}px`,
          pb: `${DOCK_HEIGHT + 28}px`,
          px: { xs: 2, sm: 3, md: 5 },
          pt: { xs: 0.8, md: 1 },
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background:
              theme.palette.mode === 'light'
                ? 'rgba(0,0,0,0.15)'
                : 'rgba(255,255,255,0.12)',
            borderRadius: 3,
          },
        }}
      >
        {children || <Outlet />}
      </Box>

      <FloatingDock items={customDockItems || roleDockItems} />
    </Box>
  );
};
