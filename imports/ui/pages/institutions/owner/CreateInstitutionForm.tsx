import React from 'react';
import { Box, Typography, Stack, alpha, useTheme } from '@mui/material';
import { useForm, useWatch } from 'react-hook-form';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Card,
  FieldText,
  FieldArea,
  FieldLogo,
  BtnGeneral,
  CardInstitucion360,
} from '../../../components';

interface ICreateInstitutionForm {
  institutionName: string;
  description: string;
  logo: File | null;
}

interface CreateInstitutionFormProps {
  onFinish: (data: ICreateInstitutionForm) => void;
}

export const CreateInstitutionForm: React.FC<CreateInstitutionFormProps> = ({
  onFinish,
}) => {
  const theme = useTheme();

  const { control, handleSubmit } = useForm<ICreateInstitutionForm>({
    defaultValues: {
      institutionName: '',
      description: '',
      logo: null,
    },
    mode: 'onChange',
  });

  const formValues = useWatch({ control });

  return (
    <Stack spacing={1.5} sx={{ width: '100%' }}>
      <Card padding={1.5}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              lineHeight: 1.6,
              flex: 1,
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            Empezá creando tu <strong>institución</strong>. Una vez creada,
            podrás agregar <strong>sedes</strong> y dentro de cada sede
            configurar las <strong>canchas</strong> disponibles.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              flexShrink: 0,
              px: 2,
              py: 0.8,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            {[
              {
                icon: <AccountBalanceIcon sx={{ fontSize: 20 }} />,
                label: 'Institución',
                active: true,
              },
              {
                icon: <MapsHomeWorkIcon sx={{ fontSize: 20 }} />,
                label: 'Sedes',
                active: false,
              },
              {
                icon: <SportsSoccerIcon sx={{ fontSize: 20 }} />,
                label: 'Canchas',
                active: false,
              },
            ].map((item, i) => (
              <React.Fragment key={item.label}>
                {i > 0 && (
                  <ArrowForwardIcon
                    sx={{
                      fontSize: 12,
                      color: alpha(theme.palette.text.disabled, 0.5),
                    }}
                  />
                )}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.3,
                    opacity: item.active ? 1 : 0.45,
                  }}
                >
                  <Box
                    sx={{
                      color: item.active ? 'primary.main' : 'text.secondary',
                      display: 'flex',
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="caption"
                    fontWeight={item.active ? 800 : 600}
                    color={item.active ? 'primary.main' : 'text.secondary'}
                    sx={{ fontSize: 9, letterSpacing: 0.5 }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Card>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          width: '100%',
          alignItems: 'stretch',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onFinish)}
          sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          <Card
            padding={2}
            sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            <Typography
              variant="caption"
              fontWeight={700}
              color="primary.main"
              sx={{
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                mb: 1.5,
                display: 'block',
              }}
            >
              Tu Institución
            </Typography>
            <Stack spacing={1.5} sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: { xs: 2, sm: 4 },
                  alignItems: 'center',
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box sx={{ flexShrink: 0 }}>
                  <FieldLogo
                    name="logo"
                    control={control}
                    label=""
                    size="medium"
                    previewSize={120}
                  />
                </Box>
                <Stack spacing={3} sx={{ flex: 1, minWidth: 0 }}>
                  <FieldText
                    name="institutionName"
                    control={control}
                    label="Nombre"
                    placeholder="Ej: Club Deportivo Norte"
                    fullWidth
                    size="small"
                    icon={<BusinessIcon />}
                    required
                    minLength={3}
                    maxLength={60}
                  />
                  <FieldArea
                    name="description"
                    control={control}
                    label="Descripción (opcional)"
                    placeholder="Contanos sobre tu institución..."
                    size="small"
                    rows={4}
                    maxLength={200}
                  />
                </Stack>
              </Box>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 1.5,
                mt: 2,
              }}
            >
              <BtnGeneral
                type="confirm"
                variant="contained"
                size="small"
                htmlType="submit"
                icon={<AccountBalanceIcon sx={{ fontSize: 18 }} />}
              >
                Crear Institución
              </BtnGeneral>
            </Box>
          </Card>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: 'center',
            flexShrink: 0,
            minWidth: 350,
          }}
        >
          <CardInstitucion360
            institutionName={formValues?.institutionName}
            description={formValues?.description}
            logo={formValues?.logo}
            skeleton
          />
        </Box>
      </Box>
    </Stack>
  );
};
