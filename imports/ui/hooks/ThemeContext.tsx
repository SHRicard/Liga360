import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  ReactNode,
} from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '../theme';
import { storeHelper } from '../helpers';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedTheme = storeHelper.get<ThemeMode>('theme');
    return savedTheme || 'light';
  });

  const toggleTheme = () => {
    setMode(prevMode => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      storeHelper.set('theme', newMode);
      return newMode;
    });
  };

  // Aplicar el tema al body para estilos globales como scrollbar
  useEffect(() => {
    document.body.setAttribute('data-theme', mode);
  }, [mode]);

  const theme = useMemo(() => {
    return mode === 'light' ? lightTheme : darkTheme;
  }, [mode]);

  const contextValue = useMemo(
    () => ({
      mode,
      toggleTheme,
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
