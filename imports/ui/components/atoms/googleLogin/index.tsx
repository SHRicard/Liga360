import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import { decodeGoogleCredential } from './googleSignIn';
import { useTheme } from '@mui/material';

interface GoogleLoginProps {
  onSuccess?: (userInfo: any) => void;
  onError?: (error: Error) => void;
  clientId?: string;
  variant?: 'login' | 'register';
  fullWidth?: boolean;
}

export const GoogleLogin: React.FC<GoogleLoginProps> = ({
  onSuccess,
  onError,
  clientId,
  variant = 'login',
  fullWidth = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const isDark = theme.palette.mode === 'dark';

  const buttonText =
    variant === 'login' ? 'Continuar con Google' : 'Regístrate con Google';

  const handleGoogleLogin = () => {
    if (!window.google) {
      console.error('Google Identity Services no está cargado');
      onError?.(new Error('Google Identity Services no está disponible'));
      return;
    }

    setIsLoading(true);

    const GOOGLE_CLIENT_ID =
      clientId || (Meteor.settings?.public as any)?.googleClientId || '';

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response: any) => {
        try {
          const userInfo = decodeGoogleCredential(response.credential);
          if (userInfo) {
            console.log('✅ Usuario autenticado con Google:', userInfo);
            onSuccess?.(userInfo);
          } else {
            throw new Error('No se pudo decodificar el credential de Google');
          }
        } catch (error) {
          console.error('❌ Error al procesar el credential:', error);
          onError?.(error as Error);
        } finally {
          setIsLoading(false);
        }
      },
    });

    window.google.accounts.id.prompt();
  };

  const googleLogo = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );

  return (
    <Button
      onClick={handleGoogleLogin}
      disabled={isLoading}
      variant="outlined"
      fullWidth={fullWidth}
      startIcon={isLoading ? <CircularProgress size={18} /> : googleLogo}
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
          backgroundColor: isDark ? '#3d3d3d' : '#f8f9fa',
          borderColor: isDark ? '#8ab4f8' : '#4285f4',
          borderWidth: '1.5px',
          boxShadow: isDark
            ? '0 2px 8px rgba(138, 180, 248, 0.3), 0 1px 3px rgba(0, 0, 0, 0.4)'
            : '0 2px 8px rgba(66, 133, 244, 0.25), 0 1px 3px rgba(60, 64, 67, 0.2)',
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
