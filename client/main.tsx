import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { App } from '/imports/ui/App';
import { initUserStore } from '/imports/ui/contexts';

Meteor.startup(() => {
  // Inicializa el store global del usuario (Tracker.autorun, fuera de React)
  initUserStore();

  const container = document.getElementById('react-target');
  const root = createRoot(container!);
  root.render(<App />);

  // Registrar Service Worker para cache de assets y navegación offline
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(reg => console.log('[SW] Registrado:', reg.scope))
      .catch(err => console.warn('[SW] Error al registrar:', err));
  }
});
