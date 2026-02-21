import React from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Card, BtnGeneral } from '../../../components';

interface WelcomeCardProps {
  onStart: () => void;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({ onStart }) => {
  return (
    <Box sx={{ maxWidth: 520, width: '100%' }}>
      <Card>
        <Stack spacing={2} alignItems="center">
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            <AddLocationAltIcon sx={{ fontSize: 28 }} />
          </Box>

          <Stack spacing={0.25} alignItems="center">
            <Typography variant="h6" fontWeight={700} textAlign="center">
              Creá tu Institución
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              textAlign="center"
            >
              Gestioná canchas, torneos y equipos desde un solo lugar.
            </Typography>
          </Stack>

          <Divider flexItem />

          <Stack spacing={0.75} sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SportsSoccerIcon
                sx={{ fontSize: '1.1rem', color: 'primary.main' }}
              />
              <Typography variant="caption">
                Registrá tus canchas y gestioná la disponibilidad
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <GroupsIcon sx={{ fontSize: '1.1rem', color: 'primary.main' }} />
              <Typography variant="caption">
                Organizá torneos y conectá con jugadores
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmojiEventsIcon
                sx={{ fontSize: '1.1rem', color: 'primary.main' }}
              />
              <Typography variant="caption">
                Llevá el control de resultados y estadísticas
              </Typography>
            </Box>
          </Stack>

          <Divider flexItem />

          <BtnGeneral
            type="primary"
            icon={<AddLocationAltIcon />}
            sx={{ width: '100%' }}
            onClick={onStart}
          >
            Comenzar
          </BtnGeneral>
        </Stack>
      </Card>
    </Box>
  );
};
