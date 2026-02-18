import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import StadiumIcon from '@mui/icons-material/Stadium';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Meteor } from 'meteor/meteor';
import { Role } from '../../../config';
import { AVAILABLE_ROLES } from '../../../helpers';
import { useUserStore } from '../../../contexts/useStore/userStore';

interface ModalRoleProps {
  open: boolean;
  onClose: () => void;
}

const ROLE_ICONS: Record<string, React.ReactElement> = {
  player: <PersonIcon sx={{ fontSize: 36 }} />,
  admin: <StadiumIcon sx={{ fontSize: 36 }} />,
  tournament_admin: <EmojiEventsIcon sx={{ fontSize: 36 }} />,
};

export const ModalFullScreen: React.FC<ModalRoleProps> = ({
  open,
  onClose,
}) => {
  const theme = useTheme();
  const t = (theme as any).custom?.modalFullScreen;

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Role | null>(null);
  const [error, setError] = useState<string | null>(null);
  const updateRole = useUserStore(state => state.updateRole);

  const handleConfirm = async () => {
    if (!selected) return;
    setLoading(true);
    setError(null);

    try {
      await Meteor.callAsync('users.updateRole', selected);
      updateRole(selected);
      onClose();
    } catch (err: any) {
      setError(err.reason || 'Error al actualizar el rol. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} fullScreen>
      {/* Header */}
      <Box
        sx={{
          background: t?.headerBg,
          px: { xs: 3, md: 6 },
          py: { xs: 4, md: 5 },
          textAlign: 'center',
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: t?.headerOverline,
            letterSpacing: 3,
            fontSize: '0.75rem',
          }}
        >
          Liga360
        </Typography>
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{ color: t?.headerTitle, mt: 0.5, mb: 1 }}
        >
          ¿Cómo usarás la plataforma?
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: t?.headerSubtitle, maxWidth: 480, mx: 'auto' }}
        >
          Elige el rol que mejor describe tu actividad. Esto define qué
          funciones tendrás disponibles.
        </Typography>
      </Box>

      <DialogContent
        sx={{
          bgcolor: t?.contentBg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: { xs: 2, md: 4 },
          py: 4,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 780 }}>
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 3, borderRadius: 2 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          <Stack spacing={2}>
            {AVAILABLE_ROLES.map(role => {
              const roleColors = t?.roles?.[role.value] ?? {
                color: '#2563eb',
                bg: '#eff6ff',
              };
              const isSelected = selected === role.value;

              return (
                <Paper
                  key={role.value}
                  onClick={() => !loading && setSelected(role.value)}
                  elevation={0}
                  sx={{
                    p: 3,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    border: '2px solid',
                    borderColor: isSelected ? roleColors.color : t?.cardBorder,
                    borderRadius: 3,
                    bgcolor: isSelected ? roleColors.bg : t?.cardBg,
                    transition: 'all 0.2s ease',
                    '&:hover': loading
                      ? {}
                      : {
                          borderColor: roleColors.color,
                          boxShadow: `0 4px 20px ${roleColors.color}33`,
                          transform: 'translateY(-2px)',
                        },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                    {/* Ícono */}
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 2.5,
                        bgcolor: isSelected ? roleColors.color : t?.cardBorder,
                        color: isSelected ? '#fff' : roleColors.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {ROLE_ICONS[role.value]}
                    </Box>

                    {/* Texto */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight={700}>
                          {role.label}
                        </Typography>
                        {isSelected && (
                          <Chip
                            label="Seleccionado"
                            size="small"
                            sx={{
                              bgcolor: roleColors.color,
                              color: '#fff',
                              fontWeight: 600,
                              height: 22,
                              fontSize: '0.7rem',
                            }}
                          />
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {role.description}
                      </Typography>
                    </Box>

                    {/* Check */}
                    <CheckCircleIcon
                      sx={{
                        fontSize: 28,
                        color: isSelected ? roleColors.color : t?.cardBorder,
                        flexShrink: 0,
                        transition: 'color 0.2s ease',
                      }}
                    />
                  </Box>
                </Paper>
              );
            })}
          </Stack>

          {/* Botón confirmar */}
          <Button
            variant="contained"
            size="large"
            fullWidth
            disabled={!selected || loading}
            onClick={handleConfirm}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{
              mt: 4,
              py: 1.5,
              borderRadius: 2.5,
              fontWeight: 700,
              fontSize: '1rem',
              textTransform: 'none',
              background: selected ? t?.confirmBg : undefined,
              boxShadow: selected ? t?.confirmShadow : undefined,
            }}
          >
            {loading ? 'Guardando...' : 'Confirmar y continuar'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
