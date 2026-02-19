import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

interface GoogleServiceData {
  id?: string;
  sub?: string;
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
}

interface UserProfile {
  nombre: string;
  apellido: string;
  avatar: string;
}

type TypeService = 'google' | 'mercadopago' | 'manual';

interface AppUser extends Omit<Meteor.User, 'profile'> {
  profile: UserProfile;
  createdAt: Date;
  typeService: TypeService;
  services: {
    google?: Partial<GoogleServiceData>;
    resume?: object;
    password?: object;
  };
}

export function useRegisterUser() {
  Accounts.onCreateUser((options, user) => {
    const typedUser = user as unknown as AppUser;
    const typedProfile = options.profile as UserProfile;

    if (typedUser.services?.google) {
      const googleData = typedUser.services.google as GoogleServiceData;
      const googleId = googleData.id || googleData.sub || '';

      typedUser.emails = [{ address: googleData.email, verified: true }];
      typedUser.profile = {
        nombre: googleData.given_name || '',
        apellido: googleData.family_name || '',
        avatar: googleData.picture || '',
      };
      typedUser.createdAt = new Date();
      typedUser.typeService = 'google';
      typedUser.services.google = { id: googleId };
    } else {
      typedUser.profile = {
        nombre: typedProfile?.nombre || '',
        apellido: typedProfile?.apellido || '',
        avatar: typedProfile?.avatar || '',
      };
      typedUser.createdAt = new Date();
      typedUser.typeService = 'manual';
    }
    return typedUser as unknown as Meteor.User;
  });
}
