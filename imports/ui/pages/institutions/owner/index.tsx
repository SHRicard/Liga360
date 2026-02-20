import React from 'react';
import { Box, Typography } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

export const OwnerInstitutions = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        gap: 2,
      }}
    >
      <AddLocationAltIcon sx={{ fontSize: 64, color: 'primary.main' }} />
      <Typography variant="h4" fontWeight={700}>
        Crear Institución
      </Typography>
    </Box>
  );
};
