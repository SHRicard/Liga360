import { ThemeProvider } from './theme';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

export const App = () => (
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
