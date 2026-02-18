import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { ButtonProps } from '@mui/material';

type BtnSize = 'small' | 'medium';

export interface BtnGeneralProps extends Omit<
  ButtonProps,
  'color' | 'size' | 'type'
> {
  size?: BtnSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  type?: 'confirm' | 'cancel' | 'delete' | 'primary'; // Tipo de estilo del botón
  htmlType?: 'button' | 'submit' | 'reset'; // Tipo HTML del botón
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // onClick explícito
}

export const BtnGeneral = React.forwardRef<HTMLButtonElement, BtnGeneralProps>(
  (
    {
      size = 'medium',
      loading = false,
      disabled = false,
      icon,
      children,
      variant = 'contained',
      type = 'primary',
      htmlType = 'button',
      onClick,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const theme: any = useTheme();

    // Extract sx from rest to merge it properly
    const { sx: userSx, ...restProps } = rest as any;

    const btnColors = theme?.custom?.BtnGeneral?.[type];

    const variants: any = btnColors
      ? {
          contained: {
            backgroundColor: btnColors.main,
            color: btnColors.contrastText,
            '&:hover': { backgroundColor: btnColors.hover || btnColors.main },
          },
          outlined: {
            borderColor: btnColors.main,
            color: btnColors.main,
            '&:hover': {
              backgroundColor: 'transparent',
              borderColor: btnColors.hover || btnColors.main,
            },
          },
          text: {
            color: btnColors.main,
            '&:hover': { backgroundColor: 'transparent' },
          },
        }
      : {};

    const hasIcon = !!icon || loading;
    const startIcon = loading ? (
      <CircularProgress color="inherit" size={16} />
    ) : (
      (icon as React.ReactNode)
    );

    const baseStyles: any = {
      position: 'relative',
      justifyContent: 'center',
      textAlign: 'center',
      fontWeight: 600,
      px: 2,
      gap: 1,
      pl: hasIcon ? 4 : 2,
      '& .MuiButton-startIcon': {
        position: 'absolute',
        left: 12,
        marginRight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    };

    return (
      <Button
        ref={ref}
        size={size}
        variant={variant}
        disabled={isDisabled}
        startIcon={startIcon}
        type={htmlType}
        onClick={onClick}
        sx={[baseStyles, variants[variant] || {}, userSx || {}]}
        {...restProps}
      >
        {children}
      </Button>
    );
  }
);

export default BtnGeneral;
