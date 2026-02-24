import React from 'react';
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  CardProps as MuiCardProps,
  Typography,
  Box,
} from '@mui/material';

interface CardProps extends Omit<MuiCardProps, 'title'> {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
  elevation?: number;
  padding?: number | string;
  noPadding?: boolean;
  logo?: string;
  logoPosition?: 'start' | 'center' | 'end';
  logoSize?: number | string;
}

export const Card: React.FC<CardProps> = React.memo(
  ({
    title,
    subtitle,
    children,
    headerAction,
    elevation = 3,
    padding = 3,
    noPadding = false,
    logo,
    logoPosition = 'start',
    logoSize = 48,
    sx,
    ...props
  }) => {
    const getLogoJustifyContent = () => {
      switch (logoPosition) {
        case 'center':
          return 'center';
        case 'end':
          return 'flex-end';
        default:
          return 'flex-start';
      }
    };

    return (
      <MuiCard
        elevation={elevation}
        sx={{
          borderRadius: 1,
          backgroundColor: theme => theme.custom.card.background,
          backgroundImage: 'none',
          border: theme => `1px solid ${theme.custom.card.border}`,
          boxShadow: theme => theme.custom.card.shadow,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: theme => theme.custom.card.shadowHover,
          },
          ...sx,
        }}
        {...props}
      >
        {logo && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: getLogoJustifyContent(),
              alignItems: 'center',
              p: 2,
              borderBottom: theme =>
                title || subtitle || headerAction
                  ? 'none'
                  : `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width:
                  typeof logoSize === 'number' ? `${logoSize}px` : logoSize,
                height:
                  typeof logoSize === 'number' ? `${logoSize}px` : logoSize,
                objectFit: 'contain',
              }}
            />
          </Box>
        )}
        {(title || subtitle || headerAction) && (
          <CardHeader
            title={
              title && (
                <Typography variant="h6" component="h2" fontWeight={600}>
                  {title}
                </Typography>
              )
            }
            subheader={
              subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              )
            }
            action={headerAction}
            sx={{
              borderBottom: theme =>
                `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
              pb: 2,
            }}
          />
        )}
        <CardContent
          sx={{
            p: noPadding ? 0 : padding,
            '&:last-child': {
              pb: noPadding ? 0 : padding,
            },
          }}
        >
          {children}
        </CardContent>
      </MuiCard>
    );
  }
);
