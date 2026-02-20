import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';
import { useRegisterUser } from '/imports/api';
import '/server/rateLimiter';
import '/server/cronJobs';

Meteor.publish('users.currentRole', function () {
  if (!this.userId) {
    this.ready();
    return;
  }
  this.onStop(() => {});
  return Meteor.users.find(
    { _id: this.userId },
    { fields: { role: 1 }, limit: 1 }
  );
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
