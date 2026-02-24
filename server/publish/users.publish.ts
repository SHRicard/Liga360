import { Meteor } from 'meteor/meteor';

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
