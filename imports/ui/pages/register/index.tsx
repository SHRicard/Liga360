import React, { useState } from 'react';
import { Box, Typography, Divider, Stack, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
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
import {
  Person,
  Badge,
  VerifiedUser,
  Lock,
  Speed,
  CheckCircle,
} from '@mui/icons-material';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const RegisterPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const { control, handleSubmit, trigger } = useForm<RegisterFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const formValues = useWatch({ control });

  const onSubmit = (data: RegisterFormData) => {
    console.log('Register attempt:', data);
    // Aquí irá la lógica de registro
  };

  const handleNext = async () => {
    let isValid = false;

    // Validar campos según el paso actual
    if (activeStep === 0) {
      // Paso 1: Validar nombre y apellido
      isValid = await trigger(['firstName', 'lastName']);
    } else if (activeStep === 1) {
      // Paso 2: Validar email y password
      isValid = await trigger(['email', 'password']);
    } else {
      // Paso 3: Confirmación, no requiere validación adicional
      isValid = true;
    }

    // Solo avanzar si la validación es exitosa
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
            name="firstName"
            control={control}
            label="Nombre"
            placeholder="Tu nombre"
            fullWidth
            size="small"
            icon={<Person />}
            required
          />
          <FieldText
            name="lastName"
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
                  {formValues?.firstName || '-'} {formValues?.lastName || '-'}
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
              <Divider />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Contraseña
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {formValues?.password
                    ? '•'.repeat(formValues.password.length)
                    : '-'}
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
                <GoogleLogin fullWidth variant="register" />
                <MercadoPagoLogin fullWidth variant="register" />
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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <VerifiedUser
                      sx={{ fontSize: '2.5rem', color: 'primary.main' }}
                    />
                    <Box>
                      <Typography
                        variant="body1"
                        fontWeight={700}
                        color="text.primary"
                      >
                        100% Seguro y Confiable
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Tu información siempre protegida
                      </Typography>
                    </Box>
                  </Box>

                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Lock
                        sx={{ fontSize: '1.2rem', color: 'primary.main' }}
                      />
                      <Typography variant="body2" color="text.primary">
                        Encriptación de datos de alto nivel
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Speed
                        sx={{ fontSize: '1.2rem', color: 'primary.main' }}
                      />
                      <Typography variant="body2" color="text.primary">
                        Acceso rápido en un solo clic
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle
                        sx={{ fontSize: '1.2rem', color: 'primary.main' }}
                      />
                      <Typography variant="body2" color="text.primary">
                        Sin necesidad de recordar contraseñas
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
