import React, { useState } from 'react';
import { Box, Typography, Divider, Stack, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {
  Person,
  Badge,
  SportsSoccer,
  Groups,
  TrendingUp,
} from '@mui/icons-material';
import {
  Card,
  FieldText,
  FieldEmail,
  FieldPassword,
  GoogleLogin,
  MercadoPagoLogin,
  Stepper,
} from '../../components';
import type { StepItem } from '../../components';
import { IRegisterData } from '../../interface';
import { APP_ROUTES } from '../../config';

export const RegisterPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { control, handleSubmit, trigger, getValues } = useForm<IRegisterData>({
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const formValues = useWatch({ control });

  const onSubmit = (data: IRegisterData) => {
    setIsLoading(true);
    Accounts.createUser(
      {
        email: data.email,
        password: data.password,
        profile: {
          nombre: data.nombre,
          apellido: data.apellido,
          avatar: '',
        },
      },
      error => {
        if (error) {
          console.error('❌ Error al crear usuario:', error);
          setIsLoading(false);
        } else {
          console.log('✅ Usuario creado exitosamente');
          navigate(APP_ROUTES.PRIVATE.DASHBOARD);
        }
      }
    );
  };

  const handleGoogleRegister = () => {
    setIsLoading(true);
    Meteor.loginWithGoogle(
      {
        requestPermissions: ['email', 'profile'],
        loginStyle: 'popup',
      },
      error => {
        if (error) {
          console.error('❌ Error en registro con Google:', error);
          setIsLoading(false);
        } else {
          console.log('✅ Usuario autenticado con Google');
          navigate(APP_ROUTES.PRIVATE.DASHBOARD);
        }
      }
    );
  };

  const handleGoogleError = (error: Error) => {
    console.error('❌ Error en registro con Google:', error);
    setIsLoading(false);
  };

  const handleMercadoPagoRegister = (userInfo: any) => {
    console.log('MercadoPago userInfo:', userInfo);
  };

  const handleMercadoPagoError = (error: Error) => {
    console.error('❌ Error en registro con Mercado Pago:', error);
  };

  const handleNext = async () => {
    let isValid = false;
    if (activeStep === 0) {
      isValid = await trigger(['nombre', 'apellido']);
    } else if (activeStep === 1) {
      isValid = await trigger(['email', 'password', 'confirmPassword']);
    } else {
      isValid = true;
    }
    if (isValid) {
      setActiveStep(prev => Math.min(prev + 1, 2));
    }
  };

  const handleBack = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  };

  const handleFinish = () => {
    handleSubmit(onSubmit)();
  };

  const steps: StepItem[] = [
    {
      label: 'Datos Personales',
      description: 'Ingresa tu nombre y apellido',
      content: (
        <Stack spacing={2.5}>
          <FieldText
            name="nombre"
            control={control}
            label="Nombre"
            placeholder="Tu nombre"
            fullWidth
            size="small"
            icon={<Person />}
            required
          />
          <FieldText
            name="apellido"
            control={control}
            label="Apellido"
            placeholder="Tu apellido"
            fullWidth
            size="small"
            icon={<Badge />}
            required
          />
        </Stack>
      ),
    },
    {
      label: 'Credenciales',
      description: 'Crea tu cuenta de acceso',
      content: (
        <Stack spacing={2.5}>
          <FieldEmail
            name="email"
            control={control}
            label="Correo electrónico"
            placeholder="tu@email.com"
            fullWidth
            size="small"
            required
          />
          <FieldPassword
            name="password"
            control={control}
            label="Contraseña"
            placeholder="Crea una contraseña segura"
            fullWidth
            size="small"
            minLength={6}
            required
          />
          <FieldPassword
            name="confirmPassword"
            control={control}
            label="Repetir contraseña"
            placeholder="Repite tu contraseña"
            fullWidth
            size="small"
            minLength={6}
            required
            validate={value =>
              value === getValues('password') || 'Las contraseñas no coinciden'
            }
          />
        </Stack>
      ),
    },
    {
      label: 'Confirmación',
      description: 'Revisa tus datos antes de continuar',
      content: (
        <Stack spacing={2}>
          <Box
            sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: 'action.hover',
            }}
          >
            <Stack spacing={1.5}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Nombre completo
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {formValues?.nombre || '-'} {formValues?.apellido || '-'}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Correo electrónico
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {formValues?.email || '-'}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 2,
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ maxWidth: '900px', width: '100%' }}
      >
        {/* Card de Registro Social */}
        <Box sx={{ flex: 1 }}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Stack spacing={3}>
              <Stack spacing={0.5}>
                <Divider>
                  <Typography variant="h6" fontWeight={700}>
                    Registro Rápido
                  </Typography>
                </Divider>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'center' }}
                >
                  Accede de forma segura
                </Typography>
              </Stack>

              {/* Botones de login social */}
              <Stack spacing={2}>
                <GoogleLogin
                  fullWidth
                  variant="register"
                  loading={isLoading}
                  onSuccess={handleGoogleRegister}
                  onError={handleGoogleError}
                />
                <MercadoPagoLogin
                  fullWidth
                  variant="register"
                  onSuccess={handleMercadoPagoRegister}
                  onError={handleMercadoPagoError}
                />
              </Stack>

              {/* Leyenda de seguridad */}
              <Divider />
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: 2.5,
                    borderRadius: 1,
                    bgcolor: 'action.hover',
                    border: 1,
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ textAlign: 'center', pb: 1 }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={800}
                      color="primary.main"
                      letterSpacing={1}
                      sx={{ textTransform: 'uppercase' }}
                    >
                      Tu experiencia comienza en 360°
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Únete a la plataforma de gestión deportiva
                    </Typography>
                  </Box>

                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SportsSoccer
                        sx={{ fontSize: '1.2rem', color: 'primary.main' }}
                      />
                      <Typography variant="body2" color="text.primary">
                        Participá en torneos y ligas oficiales
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Groups
                        sx={{ fontSize: '1.2rem', color: 'primary.main' }}
                      />
                      <Typography variant="body2" color="text.primary">
                        Conectá con equipos, jugadores y organizadores
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TrendingUp
                        sx={{ fontSize: '1.2rem', color: 'primary.main' }}
                      />
                      <Typography variant="body2" color="text.primary">
                        Seguí tu progreso y estadísticas en tiempo real
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Stack>

              {/* Enlace a login */}
              <Box sx={{ textAlign: 'center', mt: 'auto' }}>
                <Typography variant="body2" color="text.secondary">
                  ¿Ya tienes cuenta?{' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    sx={{
                      textDecoration: 'none',
                      color: 'primary.main',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Inicia sesión
                  </Link>
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Box>

        {/* Card de Registro con Correo */}
        <Box sx={{ flex: 1 }}>
          <Card>
            <Stack spacing={3}>
              <Stack spacing={0.5}>
                <Divider>
                  <Typography variant="h6" fontWeight={700}>
                    Registro con Correo
                  </Typography>
                </Divider>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'center' }}
                >
                  Completa el proceso en 3 pasos
                </Typography>
              </Stack>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Stepper
                  steps={steps}
                  activeStep={activeStep}
                  onNext={handleNext}
                  onBack={handleBack}
                  onFinish={handleFinish}
                  nextButtonText="Siguiente"
                  backButtonText="Atrás"
                  finishButtonText="Registrarse"
                />
              </form>
            </Stack>
          </Card>
        </Box>
      </Stack>
    </Box>
  );
};
