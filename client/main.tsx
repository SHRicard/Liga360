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
});
