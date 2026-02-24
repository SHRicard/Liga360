import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export type UserRole = 'player' | 'manager' | 'referee' | 'super_admin';
export type UserStatus = 'activo' | 'suspendido' | 'bloqueado';

export interface IUser {
  _id?: string;
  emails?: Array<{
    address: string;
    verified: boolean;
  }>;
  role?: UserRole;
  profile?: {
    nombre?: string;
    apellido?: string;
    telefono?: string;
    avatar?: string;
    address?: {
      provincia?: string;
      partido?: string;
      barrio?: string;
      calle?: string;
      altura?: string;
      codigoPostal?: string;
      geo?: {
        lat: number;
        lng: number;
      };
    };
  };
  createdAt?: Date;
  updatedAt?: Date;
  status?: UserStatus;
  activity?: {
    isOnline: boolean;
    lastLoginAt?: Date;
    lastLogoutAt?: Date;
    lastSeenAt?: Date;
    totalLogins?: number;
  };
}

// Usar la colección interna de Meteor en lugar de crear una nueva
// para evitar el error "There is already a collection named 'users'"
export const UsersCollection =
  Meteor.users as unknown as Mongo.Collection<IUser>;
