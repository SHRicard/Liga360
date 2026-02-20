import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

/**
 * IBranch — Sede deportiva perteneciente a una Institution.
 *
 * Relación: one-to-many con Institution (via institutionId).
 * Preparada para relacionarse con Fields (canchas) mediante branchId.
 */
export interface IBranch {
  _id?: string;
  /** Referencia obligatoria a la Institution propietaria */
  institutionId: string;
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

if (Meteor.isServer) {
  BranchesCollection.createIndexAsync({ institutionId: 1 });
  BranchesCollection.createIndexAsync({ active: 1 });
}
