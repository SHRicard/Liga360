import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';
import { useRegisterUser } from '/imports/api';
import '/server/rateLimiter';
import '/server/cronJobs';
import '/server/publish';

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
    // ==========================================
    // Google OAuth
    // ==========================================
    console.log('🔑 Google OAuth configurado:', {
      clientId: googleClientId.slice(0, 8) + '****',
    });
  } else {
    console.warn(
      '⚠️  Google OAuth: faltan credenciales en settings.json (public.googleClientId / private.google.clientSecret)'
    );
  }

  // ==========================================
  // Cloudinary
  // ==========================================
  const cloudinarySettings = Meteor.settings?.private?.cloudinary;
  if (
    cloudinarySettings?.cloudName &&
    cloudinarySettings?.apiKey &&
    cloudinarySettings?.apiSecret
  ) {
    console.log('☁️  Cloudinary configurado:', {
      cloudName: cloudinarySettings.cloudName,
      apiKey: cloudinarySettings.apiKey.slice(0, 4) + '****',
    });
  } else {
    console.warn(
      '⚠️  Cloudinary: faltan credenciales en settings.json (private.cloudinary)'
    );
  }

  // ==========================================
  // Hooks de usuarios
  // ==========================================
  useRegisterUser();
});
