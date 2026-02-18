import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { useUserStore, AppUser } from './userStore';

export const initUserStore = () => {
  Tracker.autorun(() => {
    const userId = Meteor.userId();

    if (userId) {
      // Meteor gestiona automáticamente el ciclo de vida de esta suscripción
      const sub = Meteor.subscribe('users.currentRole');

      if (!sub.ready()) {
        useUserStore.getState().setLoading(true);
        return;
      }

      const user = Meteor.users.findOne({ _id: userId });

      if (user) {
        useUserStore.getState().setUser(user as unknown as AppUser);
      } else {
        useUserStore.getState().setLoading(false);
      }
    } else {
      useUserStore.getState().clearUser();
    }
  });
};
