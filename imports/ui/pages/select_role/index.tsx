import React, { useState } from 'react';
import {
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
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Role, APP_ROUTES } from '../../config';
import { AVAILABLE_ROLES } from '../../helpers';
import { useUserStore } from '../../contexts/useStore/userStore';

const ROLE_ICONS: Record<string, React.ReactElement> = {
  player: <PersonIcon sx={{ fontSize: 36 }} />,
  admin: <StadiumIcon sx={{ fontSize: 36 }} />,
  tournament_admin: <EmojiEventsIcon sx={{ fontSize: 36 }} />,
};

export const SelectRolePage = () => {
  const theme = useTheme();
  const t = (theme as any).custom?.modalFullScreen;
  const navigate = useNavigate();
  const updateRole = useUserStore(state => state.updateRole);

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Role | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!selected) return;
    setLoading(true);
    setError(null);

    try {
      await Meteor.callAsync('users.updateRole', { role: selected });
      updateRole(selected);
      navigate(APP_ROUTES.PRIVATE.DASHBOARD, { replace: true });
    } catch (err: any) {
      setError(err.reason || 'Error al actualizar el rol. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          p: { xs: 3, sm: 4 },
          mb: 2,
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
        }}
      >
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            px: 2.5,
            py: 0.4,
            mb: 1.5,
            borderRadius: '20px',
            background:
              'linear-gradient(135deg, rgba(255,213,0,0.18) 0%, rgba(255,180,0,0.08) 50%, rgba(255,213,0,0.18) 100%)',
            border: '1px solid rgba(255,213,0,0.45)',
            backdropFilter: 'blur(8px)',
            boxShadow:
              '0 0 12px rgba(255,200,0,0.25), inset 0 1px 0 rgba(255,230,100,0.3)',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.08)' },
            },
            animation: 'pulse 2.4s ease-in-out infinite',
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              letterSpacing: 4,
              fontSize: '0.6rem',
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            Liga360
          </Typography>
        </Box>
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{ color: t?.headerTitle, mt: 0.5, mb: 1 }}
        >
          ¿Cómo usarás la plataforma?
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: t?.headerSubtitle, maxWidth: 'auto', mx: 'auto' }}
        >
          Elige el rol que mejor describe tu actividad. Esto define qué
          funciones tendrás disponibles.
        </Typography>
      </Box>

      {/* Contenido */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: 2,
          pb: 4,
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

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems="stretch"
          >
            {AVAILABLE_ROLES.map(role => {
              const roleColors = t?.roles?.[role.value] ?? {
                color: '#2563eb',
                bg: '#eff6ff',
              };
              const isSelected = selected === role.value;

              return (
                <Box
                  key={role.value}
                  onClick={() => !loading && setSelected(role.value)}
                  sx={{
                    p: 3,
                    flex: 1,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: isSelected
                      ? roleColors.color
                      : 'rgba(255,255,255,0.1)',
                    background: isSelected
                      ? `linear-gradient(135deg, ${roleColors.color}22 0%, ${roleColors.color}0a 100%)`
                      : 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: isSelected
                      ? `0 0 20px ${roleColors.color}33, inset 0 1px 0 rgba(255,255,255,0.1)`
                      : '0 2px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.06)',
                    transition: 'all 0.25s ease',
                    '&:hover': loading
                      ? {}
                      : {
                          borderColor: roleColors.color,
                          boxShadow: `0 4px 20px ${roleColors.color}33`,
                          transform: isSelected ? 'none' : 'translateY(-2px)',
                          background: `linear-gradient(135deg, ${roleColors.color}18 0%, ${roleColors.color}08 100%)`,
                        },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2.5,
                        background: isSelected
                          ? roleColors.color
                          : 'rgba(255,255,255,0.08)',
                        border: '1px solid',
                        borderColor: isSelected
                          ? roleColors.color
                          : 'rgba(255,255,255,0.12)',
                        color: isSelected ? '#fff' : roleColors.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.25s ease',
                      }}
                    >
                      {ROLE_ICONS[role.value]}
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight={700}
                          sx={{
                            color: isSelected
                              ? roleColors.color
                              : 'text.primary',
                          }}
                        >
                          {role.label}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.4 }}
                      >
                        {role.description}
                      </Typography>
                    </Box>

                    {isSelected && (
                      <Chip
                        label="Seleccionado"
                        size="small"
                        sx={{
                          bgcolor: roleColors.color,
                          color: '#fff',
                          fontWeight: 600,
                          height: 20,
                          fontSize: '0.65rem',
                        }}
                      />
                    )}
                  </Box>
                </Box>
              );
            })}
          </Stack>

          <Button
            variant="contained"
            size="large"
            fullWidth
            disabled={!selected || loading}
            onClick={handleConfirm}
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
            sx={{
              mt: 3,
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
      </Box>
    </Box>
  );
};
