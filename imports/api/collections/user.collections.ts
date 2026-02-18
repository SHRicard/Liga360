import { Mongo } from 'meteor/mongo';

export type UserRole = 'player' | 'admin' | 'tournament_admin' | 'super_admin';
export type UserStatus = 'activo' | 'suspendido' | 'bloqueado';

export interface IUser {
  _id?: string;
  emails?: Array<{
    address: string;
    verified: boolean;
  }>;
  roles?: UserRole[];
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

export const UsersCollection = new Mongo.Collection<IUser>('users');
