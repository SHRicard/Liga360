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
    menu: {
      background: '#ffffff',
      backgroundImage: 'none',
      text: 'rgba(0,0,0,0.87)',
      border: 'rgba(0,0,0,0.12)',
      divider: 'rgba(0,0,0,0.1)',
      shadow: '0 2px 8px rgba(0,0,0,0.08)',
    },
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
      background: '#e8e8e8',
      border: 'rgba(0, 0, 0, 0.06)',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      shadowHover: '0 8px 24px rgba(0, 0, 0, 0.10)',
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
        manager: { color: '#d97706', bg: '#fffbeb' },
        referee: { color: '#7c3aed', bg: '#f5f3ff' },
      },
    },
    layout: {
      topBar: {
        background: 'rgba(255, 255, 255, 0.72)',
        border: 'rgba(0, 0, 0, 0.06)',
      },
      dock: {
        background: 'rgba(255, 255, 255, 0.65)',
        border: 'rgba(0, 0, 0, 0.08)',
        shadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)',
        activeBg: 'rgba(0, 137, 123, 0.12)',
        activeColor: '#00897B',
        activeDot: '#00897B',
        activeDotGlow: '0 0 8px rgba(0, 137, 123, 0.6)',
        hoverBg: 'rgba(0, 0, 0, 0.06)',
      },
      tooltip: {
        background: 'rgba(0, 0, 0, 0.85)',
        color: '#fff',
      },
      popover: {
        background: 'rgba(255, 255, 255, 0.88)',
        border: 'rgba(0, 0, 0, 0.08)',
        shadow: '0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)',
      },
      overlay: {
        background: 'rgba(255, 255, 255, 0.92)',
      },
      spotlight: {
        pillBg: 'rgba(0, 0, 0, 0.04)',
        pillBorder: 'rgba(0, 0, 0, 0.06)',
        pillHoverBg: 'rgba(0, 0, 0, 0.06)',
        pillHoverBorder: 'rgba(0, 0, 0, 0.12)',
        barBg: 'rgba(255, 255, 255, 0.85)',
        barBorder: 'rgba(0, 0, 0, 0.1)',
        barShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        kbdBg: 'rgba(0, 0, 0, 0.06)',
        kbdBorder: 'rgba(0, 0, 0, 0.08)',
      },
      hoverBg: 'rgba(0, 0, 0, 0.04)',
      activeBg: 'rgba(0, 0, 0, 0.07)',
      notification: {
        badgeBg: '#ef4444',
        badgeShadow: '0 0 8px rgba(239, 68, 68, 0.4)',
        unreadBg: 'rgba(25, 118, 210, 0.04)',
      },
      logoutHoverBg: 'rgba(220, 38, 38, 0.06)',
    },
    cards360: {
      accent: {
        light: '#9a7b1a',
        main: '#7a5c10',
        dark: '#5c4508',
        shine: '#b08a20',
        text: '#7a5c10',
        muted: 'rgba(92,69,8,0.65)',
      },
      bg: {
        primary: '#e8e8ec',
        surface: '#f0f0f4',
        elevated: '#f8f8fb',
        border: 'rgba(0,0,0,0.45)',
        gradientEnd: '#d8d8dc',
      },
      shadow:
        '0 2px 8px rgba(0,0,0,0.1), 0 12px 40px rgba(0,0,0,0.12), inset 0 1px 0 rgba(122,92,16,0.12)',
      innerBorder: 'rgba(0,0,0,0.10)',
      skeletonBg: 'rgba(0,0,0,0.08)',
      hexPattern: { opacity: 0.22, strokeWidth: '1.5' },
      title: { color: '#0a0a0a', shadow: 'none' },
      headerName: '#5c4508',
      description: 'rgba(0,0,0,0.5)',
      statLabel: 'rgba(92,69,8,0.65)',
      statValue: '#1a1a1a',
      panelBg: 'rgba(255,255,255,0.5)',
      logoBg: '#f0f0f4',
      footer: {
        line: 'rgba(0,0,0,0.15)',
        text: 'rgba(0,0,0,0.30)',
      },
    },
  },
});
