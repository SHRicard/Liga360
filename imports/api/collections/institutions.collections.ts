import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export interface MediaAsset {
  publicId: string;
  version: number;
}

export interface IInstitution {
  _id?: string;

  ownerId: string;
  name: string;
  description?: string;
  logo?: MediaAsset;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const InstitutionsCollection = new Mongo.Collection<IInstitution>(
  'institutions'
);

if (Meteor.isServer) {
  InstitutionsCollection.createIndexAsync({ ownerId: 1 });
  InstitutionsCollection.createIndexAsync({ active: 1 });
  InstitutionsCollection.createIndexAsync({ name: 1 });
}
