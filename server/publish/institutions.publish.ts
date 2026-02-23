import { Meteor } from 'meteor/meteor';
import { InstitutionsCollection } from '/imports/api';

Meteor.publish('institutions.owner', function () {
  if (!this.userId) {
    this.ready();
    return;
  }
  this.onStop(() => {});
  return InstitutionsCollection.find(
    { ownerId: this.userId, active: true },
    { limit: 10 }
  );
});
