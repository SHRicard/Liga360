import React from 'react';
import { Box, Typography, Stack, Chip } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import { Card, BtnGeneral } from '../../../components';

interface InstitutionDashboardProps {
  institutionName: string;
  branchName: string;
}

export const InstitutionDashboard: React.FC<InstitutionDashboardProps> = ({
  institutionName,
  branchName,
}) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <BusinessIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6" fontWeight={700}>
            {institutionName}
          </Typography>
          <Chip
            label="Activa"
            size="small"
            color="success"
            variant="outlined"
          />
        </Stack>
      </Box>

      {/* Sedes */}
      <Card
        title="Sedes"
        subtitle="Administrá las ubicaciones de tu institución"
      >
        <Stack spacing={1.5}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 1.5,
              borderRadius: 1,
              bgcolor: 'action.hover',
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOnIcon
                sx={{ fontSize: '1.2rem', color: 'primary.main' }}
              />
              <Typography variant="body2" fontWeight={600}>
                {branchName}
              </Typography>
            </Stack>
            <Chip
              label="Principal"
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>

          <BtnGeneral
            type="primary"
            variant="outlined"
            size="small"
            icon={<AddIcon />}
          >
            Agregar sede
          </BtnGeneral>
        </Stack>
      </Card>

      {/* Placeholder canchas */}
      <Card
        title="Canchas"
        subtitle="Próximamente podrás cargar tus canchas acá"
      >
        <Box
          sx={{
            p: 3,
            textAlign: 'center',
            borderRadius: 1,
            border: '1px dashed',
            borderColor: 'divider',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Todavía no tenés canchas cargadas. Esta sección se habilitará
            próximamente.
          </Typography>
        </Box>
      </Card>
    </Stack>
  );
};
