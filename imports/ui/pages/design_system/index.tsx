import { Box, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Delete from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import {
  FieldPassword,
  FieldEmail,
  FieldText,
  FieldArea,
  Loading,
  BtnGeneral,
  GoogleLogin,
  MercadoPagoLogin,
  Card,
  FieldForm,
  BtnTheme,
} from '../../components';
import { ThemeColorsDemo } from '../../components/ThemeColorsDemo';

export const DesignSystemPage = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      apellido: '',
      email: '',
      password: '',
      descripcion: '',
    },
  });

  const onSubmit = (_data: any) => {
    // TODO: handle form submit
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Typography variant="h3" component="h1">
          Sistema de Diseño
        </Typography>
        <BtnTheme />
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Card
          title="Formulario de Registro"
          subtitle="Completa los campos para crear tu cuenta"
          sx={{ width: { xs: '100%', md: '48%' }, mb: 4 }}
        >
          <FieldForm handleSubmit={handleSubmit} onSubmit={onSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FieldText
                name="username"
                control={control}
                label="Nombre de Usuario"
                placeholder="Ingresa tu nombre"
                icon={<AccountCircle />}
                minLength={3}
                required
              />
              <FieldText
                name="apellido"
                control={control}
                label="Apellido"
                placeholder="Ingresa tu apellido"
                icon={<AccountCircle />}
                minLength={3}
                required
              />
              <FieldEmail
                name="email"
                control={control}
                label="Email"
                placeholder="ejemplo@correo.com"
                required
              />

              <FieldPassword
                name="password"
                control={control}
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                required
              />

              <FieldArea
                name="descripcion"
                control={control}
                label="Descripción"
                placeholder="Escribe una descripción"
                rows={4}
                minLength={10}
              />

              <BtnGeneral
                size="medium"
                sx={{ mt: 2 }}
                variant="contained"
                type="primary"
                htmlType="submit"
              >
                Enviar
              </BtnGeneral>
            </Box>
          </FieldForm>
        </Card>

        <Card
          title="Colores Personalizados del Tema"
          sx={{
            width: { xs: '100%', md: '48%' },
          }}
        >
          <ThemeColorsDemo />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom>
              Este botón utiliza los colores personalizados definidos en el
              tema.
            </Typography>
            <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', mb: 2 }}>
              <BtnGeneral
                size="medium"
                sx={{ mt: 2 }}
                variant="contained"
                type="confirm"
              >
                medium
              </BtnGeneral>
              <BtnGeneral
                size="medium"
                sx={{ mt: 2 }}
                variant="contained"
                type="delete"
                icon={<Delete />}
              >
                medium
              </BtnGeneral>
              <BtnGeneral
                disabled={true}
                size="medium"
                sx={{ mt: 2 }}
                variant="contained"
                loading={true}
                type="cancel"
              >
                medium
              </BtnGeneral>
              <BtnGeneral
                size="medium"
                sx={{ mt: 2 }}
                variant="contained"
                type="primary"
              >
                medium
              </BtnGeneral>
            </Box>
            <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', mb: 2 }}>
              <BtnGeneral
                size="medium"
                sx={{ mt: 2 }}
                variant="contained"
                type="confirm"
              >
                medium
              </BtnGeneral>
              <BtnGeneral
                size="medium"
                sx={{ mt: 2 }}
                variant="contained"
                type="delete"
                icon={<Delete />}
              >
                medium
              </BtnGeneral>
              <BtnGeneral
                disabled={true}
                size="medium"
                sx={{ mt: 2 }}
                variant="contained"
                loading={true}
                type="cancel"
              >
                medium
              </BtnGeneral>
              <BtnGeneral
                size="medium"
                sx={{ mt: 2 }}
                variant="contained"
                type="primary"
              >
                medium
              </BtnGeneral>
            </Box>
            <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', mb: 2 }}>
              <BtnGeneral
                size="small"
                sx={{ mt: 2 }}
                variant="contained"
                type="confirm"
              >
                small
              </BtnGeneral>
              <BtnGeneral
                size="small"
                sx={{ mt: 2 }}
                variant="contained"
                type="delete"
                icon={<Delete />}
              >
                small
              </BtnGeneral>
              <BtnGeneral
                disabled={true}
                size="small"
                sx={{ mt: 2 }}
                loading={true}
                variant="contained"
                type="cancel"
              >
                small
              </BtnGeneral>
              <BtnGeneral
                size="small"
                sx={{ mt: 2 }}
                variant="contained"
                type="primary"
              >
                small
              </BtnGeneral>
            </Box>
            <Box
              sx={{ gap: 2, display: 'flex', flexDirection: 'column', mb: 2 }}
            >
              <Typography variant="h6" gutterBottom>
                Google Login
              </Typography>

              {/* Botón de Login */}
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Variante: Login
                </Typography>
                <GoogleLogin
                  variant="login"
                  onSuccess={userInfo => {
                    alert(`¡Bienvenido, ${userInfo.name}!`);
                  }}
                  onError={error => {
                    console.error('❌ Error en Google Login:', error);
                    alert('Error al iniciar sesión con Google');
                  }}
                />
              </Box>

              {/* Botón de Registro */}
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Variante: Registro
                </Typography>
                <GoogleLogin
                  variant="register"
                  onSuccess={userInfo => {
                    alert(`¡Cuenta creada para ${userInfo.name}!`);
                  }}
                  onError={error => {
                    console.error('❌ Error en Google Registro:', error);
                    alert('Error al registrarse con Google');
                  }}
                />
              </Box>

              {/* Separador */}
              <Box
                sx={{
                  my: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              />

              <Typography variant="h6" gutterBottom>
                Mercado Pago Login
              </Typography>

              {/* Botón de Login Mercado Pago */}
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Variante: Login
                </Typography>
                <MercadoPagoLogin
                  variant="login"
                  onSuccess={userInfo => {
                    alert(`¡Bienvenido desde Mercado Pago!`);
                  }}
                  onError={error => {
                    console.error('❌ Error en Mercado Pago Login:', error);
                    alert('Error al iniciar sesión con Mercado Pago');
                  }}
                />
              </Box>

              {/* Botón de Registro Mercado Pago */}
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Variante: Registro
                </Typography>
                <MercadoPagoLogin
                  variant="register"
                  onSuccess={userInfo => {
                    alert(`¡Cuenta creada en Mercado Pago!`);
                  }}
                  onError={error => {
                    console.error('❌ Error en Mercado Pago Registro:', error);
                    alert('Error al registrarse con Mercado Pago');
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>

      <Card
        title="Colores Personalizados del Loading"
        sx={{ width: { xs: '100%', md: '48%' }, mb: 2 }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Loading size="sm" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Loading size="md" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Loading size="lg" />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
