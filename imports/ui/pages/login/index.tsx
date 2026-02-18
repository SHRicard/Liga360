import React, { useState } from 'react';
import { Box, Typography, Divider, Link } from '@mui/material';
import logo from '../../assets/logo.png';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Meteor } from 'meteor/meteor';
import {
  Card,
  FieldEmail,
  FieldPassword,
  BtnGeneral,
  GoogleLogin,
  MercadoPagoLogin,
  BtnTheme,
} from '../../components';
import { APP_ROUTES } from '../../config';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true);
    Meteor.loginWithPassword(data.email, data.password, error => {
      if (error) {
        console.error('❌ Error al iniciar sesión:', error);
        setIsLoading(false);
      } else {
        navigate(APP_ROUTES.PRIVATE.DASHBOARD);
      }
    });
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    Meteor.loginWithGoogle(
      { requestPermissions: ['email', 'profile'], loginStyle: 'popup' },
      error => {
        if (error) {
          console.error('❌ Error al iniciar sesión con Google:', error);
          setIsLoading(false);
        } else {
          navigate(APP_ROUTES.PRIVATE.DASHBOARD);
        }
      }
    );
  };

  const handleGoogleError = (error: Error) => {
    console.error('❌ Error en Google Login:', error);
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 2,
        overflow: 'auto',
      }}
    >
      <Card sx={{ width: { xs: '100%', sm: '560px', md: '820px' } }}>
        {/* Header */}
        <Box sx={{ position: 'relative', mb: 3 }}>
          <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
            <BtnTheme />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Liga360"
              sx={{
                width: { xs: 90, sm: 110 },
                height: { xs: 90, sm: 110 },
                objectFit: 'contain',
                filter: 'drop-shadow(0px 4px 14px rgba(0,0,0,0.35))',
              }}
            />
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
                Inicio de Sesión
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ingresa tus credenciales para continuar
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Dos columnas */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 0,
          }}
        >
          {/* Columna izquierda — formulario */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              flex: '1 1 0',
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
              pr: { md: 4 },
              borderRight: { md: '1px solid' },
              borderColor: { md: 'divider' },
            }}
          >
            <FieldEmail
              name="email"
              control={control}
              label="Correo electrónico"
              placeholder="tu@email.com"
              fullWidth
              size="small"
            />

            <Box>
              <FieldPassword
                name="password"
                control={control}
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                fullWidth
                size="small"
              />
              <Box sx={{ mt: 1, textAlign: 'right' }}>
                <Link
                  component={RouterLink}
                  to="/recovery-password"
                  variant="body2"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                    fontSize: '0.8rem',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Box>
            </Box>

            <BtnGeneral
              type="primary"
              htmlType="submit"
              fullWidth
              loading={isLoading}
            >
              Iniciar sesión
            </BtnGeneral>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                ¿No tienes cuenta?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Regístrate
                </Link>
              </Typography>
            </Box>
          </Box>

          {/* Divisor horizontal en móvil */}
          <Divider sx={{ display: { xs: 'flex', md: 'none' }, my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              o inicia sesión con
            </Typography>
          </Divider>

          {/* Columna derecha — login social */}
          <Box
            sx={{
              flex: { md: '1 1 0' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              gap: 2,
              pl: { md: 4 },
            }}
          >
            {/* Bloque de presentación — solo desktop */}

            <GoogleLogin
              fullWidth
              loading={isLoading}
              onSuccess={handleGoogleLogin}
              onError={handleGoogleError}
            />
            <MercadoPagoLogin fullWidth />
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                textAlign: 'center',
                mb: 1,
                pt: 4,
              }}
            >
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Acceso rápido y seguro
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tu experiencia profesional empieza acá. Ingresá en segundos y
                llevá tu juego al siguiente nivel.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
