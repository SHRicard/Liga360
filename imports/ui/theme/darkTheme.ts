import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#e3f2fd',
      dark: '#42a5f5',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
      main: '#ce93d8',
      light: '#f3e5f5',
      dark: '#ab47bc',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    success: {
      main: '#66bb6a',
      light: '#98ee99',
      dark: '#338a3e',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
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
              WebkitBoxShadow: '0 0 0 1000px #1e1e1e inset !important',
              WebkitTextFillColor: '#fff !important',
              transition: 'background-color 5000s ease-in-out 0s',
              caretColor: '#fff',
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.23)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.4)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#26C6DA',
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
            color: '#26C6DA',
          },
          '&.Mui-error': {
            color: '#fc0000',
          },
        },
      },
    },
  },
});

// Extensión de colores personalizados
declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      loading: {
        color: string;
      };
      input: {
        background: string;
        border: string;
        borderFocus: string;
        borderError: string;
        text: string;
        placeholder: string;
        iconColor: string;
        iconColorError: string;
      };
      card: {
        background: string;
        border: string;
        shadow: string;
        shadowHover: string;
      };
      BtnGeneral: {
        primary: { main: string; contrastText: string; hover?: string };
        confirm: { main: string; contrastText: string; hover?: string };
        cancel: { main: string; contrastText: string; hover?: string };
        delete: { main: string; contrastText: string; hover?: string };
      };
      modalFullScreen: {
        headerBg: string;
        headerTitle: string;
        headerSubtitle: string;
        headerOverline: string;
        contentBg: string;
        cardBg: string;
        cardBorder: string;
        confirmBg: string;
        confirmShadow: string;
        roles: {
          player: { color: string; bg: string };
          owner: { color: string; bg: string };
          manager: { color: string; bg: string };
          referee: { color: string; bg: string };
        };
      };
    };
  }
  interface ThemeOptions {
    custom?: {
      input?: {
        background?: string;
        border?: string;
        borderFocus?: string;
        borderError?: string;
        text?: string;
        placeholder?: string;
        iconColor?: string;
        iconColorError?: string;
      };
      card?: {
        background?: string;
        border?: string;
        shadow?: string;
        shadowHover?: string;
      };
      loading?: {
        color: string;
      };
      BtnGeneral?: {
        primary?: { main?: string; contrastText?: string; hover?: string };
        confirm?: { main?: string; contrastText?: string; hover?: string };
        cancel?: { main?: string; contrastText?: string; hover?: string };
        delete?: { main?: string; contrastText?: string; hover?: string };
      };
      modalFullScreen?: {
        headerBg?: string;
        headerTitle?: string;
        headerSubtitle?: string;
        headerOverline?: string;
        contentBg?: string;
        cardBg?: string;
        cardBorder?: string;
        confirmBg?: string;
        confirmShadow?: string;
        roles?: {
          player?: { color?: string; bg?: string };
          owner?: { color?: string; bg?: string };
          manager?: { color?: string; bg?: string };
          referee?: { color?: string; bg?: string };
        };
      };
    };
  }
}

// Aplicar colores personalizados al tema dark
export const darkThemeExtended = createTheme(darkTheme, {
  custom: {
    input: {
      background: '#1e1e1e',
      border: 'rgba(255, 255, 255, 0.23)',
      borderFocus: '#26C6DA',
      borderError: '#fc0000',
      text: '#fff',
      placeholder: 'rgba(255, 255, 255, 0.5)',
      iconColor: 'rgba(255, 255, 255, 0.7)',
      iconColorError: '#fc0000',
    },
    card: {
      background: '#1e1e1e',
      border: 'rgba(255, 255, 255, 0.08)',
      shadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      shadowHover: '0 8px 24px rgba(0, 0, 0, 0.4)',
    },
    loading: {
      color: '#00ACC1',
    },
    BtnGeneral: {
      primary: {
        main: '#26C6DA',
        contrastText: '#F9F9F9',
        hover: '#00ACC1',
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
      headerBg: 'linear-gradient(135deg, #0d1b2a 0%, #1a2744 100%)',
      headerTitle: '#ffffff',
      headerSubtitle: 'rgba(255,255,255,0.65)',
      headerOverline: 'rgba(144,202,249,0.7)',
      contentBg: '#121212',
      cardBg: '#1e1e1e',
      cardBorder: 'rgba(255,255,255,0.08)',
      confirmBg: 'linear-gradient(135deg, #0d1b2a 0%, #1565c0 100%)',
      confirmShadow: '0 4px 16px rgba(144,202,249,0.25)',
      roles: {
        player: { color: '#90caf9', bg: 'rgba(144,202,249,0.08)' },
        owner: { color: '#81c784', bg: 'rgba(129,199,132,0.08)' },
        manager: { color: '#ffb74d', bg: 'rgba(255,183,77,0.08)' },
        referee: { color: '#b39ddb', bg: 'rgba(179,157,219,0.08)' },
      },
    },
  },
});
