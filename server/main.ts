import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';
import { useRegisterUser } from '/imports/api';

// Publica el campo `role` del usuario autenticado al cliente
Meteor.publish('users.currentRole', function () {
  if (!this.userId) {
    return this.ready();
  }
  return Meteor.users.find({ _id: this.userId }, { fields: { role: 1 } });
});

Meteor.startup(async () => {
  const googleClientId = Meteor.settings?.public?.googleClientId;
  const googleClientSecret = Meteor.settings?.private?.google?.clientSecret;

  const green = '\x1b[32m';
  const red = '\x1b[31m';
  const cyan = '\x1b[36m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';
  const ok = `${green} correcto${reset}`;
  const err = `${red} faltante${reset}`;

  console.log(`${cyan}==========================================${reset}`);
  console.log(`${green}Variables de entorno${reset}`);
  console.log(`${cyan}==========================================${reset}`);
  console.log(`${yellow}Google -${reset}`);
  console.log(`  ID_CLIENTE     : ${googleClientId ? ok : err}`);
  console.log(`  SECRETO_CLIENTE: ${googleClientSecret ? ok : err}`);
  console.log(`${cyan}==========================================${reset}`);
  if (googleClientId && googleClientSecret) {
    await ServiceConfiguration.configurations.upsertAsync(
      { service: 'google' },
      {
        $set: {
          clientId: googleClientId,
          secret: googleClientSecret,
          loginStyle: 'popup',
        },
      }
    );
  }

  // ==========================================
  // Hooks de usuarios
  // ==========================================
  useRegisterUser();
});
