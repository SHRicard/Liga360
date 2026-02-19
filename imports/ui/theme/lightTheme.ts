import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#fff',
    },
    success: {
      main: '#66bb6a',
      light: '#98ee99',
      dark: '#338a3e',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
    error: {
      main: '#fc0000',
      light: '#e57373',
      dark: '#d32f2f',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            '&:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 1000px #fff inset !important',
              WebkitTextFillColor: 'rgba(0, 0, 0, 0.87) !important',
              transition: 'background-color 5000s ease-in-out 0s',
              caretColor: 'rgba(0, 0, 0, 0.87)',
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.4)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0011ff',
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: '#fc0000',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#0011ff',
          },
          '&.Mui-error': {
            color: '#fc0000',
          },
        },
      },
    },
  },
});

// Aplicar colores personalizados al tema light
export const lightThemeExtended = createTheme(lightTheme, {
  custom: {
    input: {
      background: '#fff',
      border: 'rgba(0, 0, 0, 0.23)',
      borderFocus: '#0011ff',
      borderError: '#fc0000',
      text: 'rgba(0, 0, 0, 0.87)',
      placeholder: 'rgba(0, 0, 0, 0.6)',
      iconColor: 'rgba(0, 0, 0, 0.54)',
      iconColorError: '#fc0000',
    },
    card: {
      background: '#fff',
      border: 'rgba(0, 0, 0, 0.08)',
      shadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      shadowHover: '0 8px 24px rgba(0, 0, 0, 0.12)',
    },
    loading: {
      color: '#09069e',
    },
    BtnGeneral: {
      primary: {
        main: '#0011ff',
        contrastText: '#F9F9F9',
        hover: '#09069e',
      },
      confirm: {
        main: '#33db00',
        contrastText: '#F9F9F9',
        hover: '#73ff00',
      },
      cancel: {
        main: '#6B6B6B',
        contrastText: '#F9F9F9',
        hover: '#5f5f5f',
      },
      delete: {
        main: '#fc0000',
        contrastText: '#F9F9F9',
        hover: '#D50000',
      },
    },
    modalFullScreen: {
      headerBg: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
      headerTitle: '#ffffff',
      headerSubtitle: 'rgba(255,255,255,0.75)',
      headerOverline: 'rgba(255,255,255,0.6)',
      contentBg: '#f8fafc',
      cardBg: '#ffffff',
      cardBorder: '#e2e8f0',
      confirmBg: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
      confirmShadow: '0 4px 16px rgba(37,99,235,0.35)',
      roles: {
        player: { color: '#2563eb', bg: '#eff6ff' },
        owner: { color: '#16a34a', bg: '#f0fdf4' },
        manager: { color: '#d97706', bg: '#fffbeb' },
        referee: { color: '#7c3aed', bg: '#f5f3ff' },
      },
    },
  },
});
