import React, { useState } from 'react';
import { Button, CircularProgress, Box } from '@mui/material';
import { useTheme } from '@mui/material';

interface MercadoPagoLoginProps {
  onSuccess?: (userInfo: any) => void;
  onError?: (error: Error) => void;
  variant?: 'login' | 'register';
  fullWidth?: boolean;
}

export const MercadoPagoLogin: React.FC<MercadoPagoLoginProps> = ({
  onSuccess, // eslint-disable-line @typescript-eslint/no-unused-vars
  onError, // eslint-disable-line @typescript-eslint/no-unused-vars
  variant = 'login',
  fullWidth = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const isDark = theme.palette.mode === 'dark';

  const buttonText =
    variant === 'login'
      ? 'Continuar con Mercado Pago'
      : 'Regístrate con Mercado Pago';

  const handleMercadoPagoLogin = () => {
    setIsLoading(true);
    // TODO: Implementar lógica de autenticación con Mercado Pago
    setTimeout(() => {
      setIsLoading(false);
      alert('Funcionalidad de Mercado Pago próximamente');
    }, 1000);
  };
  const LOGO_SRC = '/mp.webp';
  const mercadoPagoLogo = (
    <Box
      component="img"
      src={LOGO_SRC}
      alt="Mercado Pago"
      sx={{
        width: '18px',
        height: '18px',
        objectFit: 'contain',
      }}
    />
  );

  return (
    <Button
      onClick={handleMercadoPagoLogin}
      disabled={isLoading}
      variant="outlined"
      fullWidth={fullWidth}
      startIcon={isLoading ? <CircularProgress size={18} /> : mercadoPagoLogo}
      sx={{
        position: 'relative',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 600,
        px: 2,
        gap: 1,
        pl: 4,
        height: '42px',
        borderWidth: '1.5px',
        borderColor: isDark ? '#5f6368' : '#dadce0',
        color: isDark ? '#e8eaed' : '#3c4043',
        backgroundColor: isDark ? '#2d2d2d' : '#fff',
        textTransform: 'none',
        fontSize: '0.875rem',
        boxShadow: isDark
          ? '0 1px 3px rgba(0, 0, 0, 0.3)'
          : '0 1px 2px rgba(60, 64, 67, 0.15)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '& .MuiButton-startIcon': {
          position: 'absolute',
          left: 12,
          marginRight: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
        },
        '&:hover': {
          backgroundColor: isDark ? '#3d3d3d' : '#fffef7',
          borderColor: isDark ? '#FFE600' : '#FFE600',
          borderWidth: '1.5px',
          boxShadow: isDark
            ? '0 2px 8px rgba(255, 230, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.4)'
            : '0 2px 8px rgba(255, 230, 0, 0.35), 0 1px 3px rgba(60, 64, 67, 0.2)',
          transform: 'translateY(-1px)',
        },
        '&:active': {
          transform: 'translateY(0)',
          boxShadow: isDark
            ? '0 1px 3px rgba(0, 0, 0, 0.3)'
            : '0 1px 2px rgba(60, 64, 67, 0.15)',
        },
        '&:disabled': {
          opacity: 0.6,
          cursor: 'not-allowed',
          boxShadow: 'none',
        },
      }}
    >
      {buttonText}
    </Button>
  );
};

export default MercadoPagoLogin;
