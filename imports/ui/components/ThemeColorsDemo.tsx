import { Box, Typography, useTheme } from '@mui/material';

export const ThemeColorsDemo = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      {/* Input Colors */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Input Colors
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="caption">Background</Typography>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: theme.custom.input.background,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            />
            <Typography variant="caption" display="block">
              {theme.custom.input.background}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption">Border Focus</Typography>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: theme.custom.input.borderFocus,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            />
            <Typography variant="caption" display="block">
              {theme.custom.input.borderFocus}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption">Border Error</Typography>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: theme.custom.input.borderError,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            />
            <Typography variant="caption" display="block">
              {theme.custom.input.borderError}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Card Colors */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Card Colors
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="caption">Background</Typography>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: theme.custom.card.background,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            />
            <Typography variant="caption" display="block">
              {theme.custom.card.background}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption">Shadow</Typography>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: theme.custom.card.background,
                boxShadow: theme.custom.card.shadow,
                borderRadius: 1,
              }}
            />
            <Typography variant="caption" display="block">
              shadow
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption">Shadow Hover</Typography>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: theme.custom.card.background,
                boxShadow: theme.custom.card.shadowHover,
                borderRadius: 1,
              }}
            />
            <Typography variant="caption" display="block">
              shadowHover
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
