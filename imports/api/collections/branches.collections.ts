import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

/**
 */
export interface IBranch {
  _id?: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
  /** Horario de atención (ej: "Lun–Vie 08:00–22:00") */
  hours?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const BranchesCollection = new Mongo.Collection<IBranch>('branches');
