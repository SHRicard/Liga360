import React, { useState } from 'react';
import { Box, Typography, Alert, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import StadiumIcon from '@mui/icons-material/Stadium';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsIcon from '@mui/icons-material/Sports';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Role, APP_ROUTES } from '../../config';
import { AVAILABLE_ROLES } from '../../helpers';
import { useUserStore } from '../../contexts/useStore/userStore';
import { BtnGeneral } from '../../components/atoms/btnGeneral';
import { AnimatedLogo } from '../../components/atoms/animatedLogo';

const ROLE_ICONS: Record<string, React.ReactElement> = {
  player: <PersonIcon sx={{ fontSize: 36 }} />,
  owner: <StadiumIcon sx={{ fontSize: 36 }} />,
  manager: <EmojiEventsIcon sx={{ fontSize: 36 }} />,
  referee: <SportsIcon sx={{ fontSize: 36 }} />,
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
          textAlign: 'center',
          p: { xs: 3, sm: 4 },
          mx: { xs: 2, sm: 3, md: 4 },
          mt: { xs: 2, sm: 3 },
          mb: 2,
          borderRadius: 1,
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
        }}
      >
        <AnimatedLogo size={80} />
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{ color: 'text.primary', mt: 0.5, mb: 1 }}
        >
          ¿Cómo usarás la plataforma?
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', maxWidth: 'auto', mx: 'auto' }}
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
          px: { xs: 2, sm: 3, md: 4 },
          pb: 4,
        }}
      >
        <Box sx={{ width: '100%' }}>
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 3, borderRadius: 1 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: 2,
            }}
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
                    p: { xs: 2, sm: 3 },
                    cursor: loading ? 'not-allowed' : 'pointer',
                    borderRadius: 1,
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
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: { xs: 180, sm: 220 },
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
                      gap: 1.5,
                      textAlign: 'center',
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 48, sm: 56 },
                        height: { xs: 48, sm: 56 },
                        borderRadius: 1,
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
                      <Typography
                        variant="subtitle2"
                        fontWeight={700}
                        sx={{
                          color: isSelected ? roleColors.color : 'text.primary',
                          mb: 0.5,
                        }}
                      >
                        {role.label}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.4,
                          display: { xs: 'none', sm: 'block' },
                        }}
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
                          mt: 'auto',
                        }}
                      />
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <BtnGeneral
              type="primary"
              loading={loading}
              disabled={!selected}
              onClick={handleConfirm}
            >
              {loading ? 'Guardando...' : 'Confirmar y continuar'}
            </BtnGeneral>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
