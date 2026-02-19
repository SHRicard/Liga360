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
