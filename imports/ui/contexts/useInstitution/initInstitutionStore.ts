import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { InstitutionsCollection } from '/imports/api/collections/institutions.collections';
import { useInstitutionStore } from './institutionStore';

export const initInstitutionStore = () => {
  Tracker.autorun(() => {
    const userId = Meteor.userId();

    if (!userId) {
      useInstitutionStore.getState().clear();
      return;
    }

    const sub = Meteor.subscribe('institutions.owner');

    if (!sub.ready()) {
      useInstitutionStore.getState().setLoading(true);
      return;
    }

    const institutions = InstitutionsCollection.find(
      { ownerId: userId, active: true },
      { sort: { createdAt: -1 } }
    ).fetch();

    useInstitutionStore.getState().setInstitutions(institutions);
  });
};
