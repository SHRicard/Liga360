// Declaración de tipos para Google Identity Services
import { Meteor } from 'meteor/meteor';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleIdConfiguration) => void;
          renderButton: (
            parent: HTMLElement,
            options: GsiButtonConfiguration
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}

interface GoogleIdConfiguration {
  client_id: string;
  callback: (response: CredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
}

interface CredentialResponse {
  credential: string;
  select_by?: string;
}

interface GsiButtonConfiguration {
  type?: 'standard' | 'icon';
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  logo_alignment?: 'left' | 'center';
  width?: string;
  locale?: string;
}

interface InitGoogleSignInProps {
  callback: (credential: string) => void;
  clientId?: string;
}

/**
 * Inicializa Google Sign-In con la configuración proporcionada
 */
export const initGoogleSignIn = ({
  callback,
  clientId,
}: InitGoogleSignInProps): void => {
  if (!window.google) {
    console.error('Google Identity Services no está cargado');
    return;
  }

  // CLIENT_ID debe ser configurado en las variables de entorno o settings
  // Para propósitos de desarrollo, puedes obtener tu CLIENT_ID de:
  // https://console.cloud.google.com/apis/credentials
  const GOOGLE_CLIENT_ID =
    clientId ||
    (Meteor.settings?.public as any)?.googleClientId ||
    'TU_GOOGLE_CLIENT_ID_AQUI';

  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: (response: CredentialResponse) => {
      callback(response.credential);
    },
    auto_select: false,
    cancel_on_tap_outside: true,
  });
};

/**
 * Renderiza el botón de Google en el contenedor especificado
 */
export const renderGoogleButton = (
  container: HTMLElement,
  options?: GsiButtonConfiguration
): void => {
  if (!window.google) {
    console.error('Google Identity Services no está cargado');
    return;
  }

  const defaultOptions: GsiButtonConfiguration = {
    type: 'standard',
    theme: 'outline',
    size: 'large',
    text: 'continue_with',
    shape: 'pill',
    logo_alignment: 'left',
    width: '100%',
  };

  window.google.accounts.id.renderButton(container, {
    ...defaultOptions,
    ...options,
  });
};

/**
 * Decodifica el JWT token de Google para obtener la información del usuario
 */
export const decodeGoogleCredential = (credential: string): any => {
  try {
    const base64Url = credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error al decodificar el credential de Google:', error);
    return null;
  }
};
