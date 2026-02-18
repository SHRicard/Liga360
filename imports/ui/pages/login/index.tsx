import React from 'react';
import { Box, Typography, Divider, Stack, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Card,
  FieldEmail,
  FieldPassword,
  BtnGeneral,
  GoogleLogin,
  MercadoPagoLogin,
} from '../../components';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Login attempt:', data);
    // Aquí irá la lógica de login
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
      <Card
        sx={{
          width: { xs: '100%', sm: '450px', md: '400px' },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Inicio de Sesión
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ingresa tus credenciales para continuar
              </Typography>
            </Box>

            <Stack spacing={2.5}>
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
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Box>
              </Box>
            </Stack>

            {/* Botón de iniciar sesión */}
            <BtnGeneral type="primary" htmlType="submit" fullWidth>
              Iniciar sesión
            </BtnGeneral>

            {/* Divisor con texto */}
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                o inicia sesión con
              </Typography>
            </Divider>

            {/* Botones de login social */}
            <Stack spacing={2}>
              <GoogleLogin fullWidth />
              <MercadoPagoLogin fullWidth />
            </Stack>

            {/* Enlace a registro */}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                ¿No tienes cuenta?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Regístrate
                </Link>
              </Typography>
            </Box>
          </Stack>
        </form>
      </Card>
    </Box>
  );
};
