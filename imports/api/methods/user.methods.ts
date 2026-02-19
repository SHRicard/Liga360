import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { UsersCollection, UserRole } from '../collections/user.collections';
import { LogHelper } from '../helpers/log.helper';

export const updateUserRole = new ValidatedMethod({
  name: 'users.updateRole',
  validate: null,
  async run({ role }: { role: UserRole }) {
    if (!this.userId) {
      await LogHelper.logError(
        'SYSTEM',
        'users.updateRole',
        'Usuario no autenticado',
        { attemptedRole: role }
      );
      throw new Meteor.Error(
        'not-authorized',
        'Debe estar autenticado para realizar esta acción'
      );
    }

    const validRoles: UserRole[] = [
      'player',
      'owner',
      'manager',
      'referee',
      'super_admin',
    ];
    if (!validRoles.includes(role)) {
      await LogHelper.logError(
        this.userId,
        'users.updateRole',
        'Rol no válido',
        { attemptedRole: role, validRoles }
      );
      throw new Meteor.Error(
        'invalid-role',
        'El rol proporcionado no es válido'
      );
    }

    const allowedRoles: UserRole[] = ['player', 'owner', 'manager', 'referee'];
    if (!allowedRoles.includes(role)) {
      await LogHelper.logError(
        this.userId,
        'users.updateRole',
        'No tiene permisos para asignar este rol',
        { attemptedRole: role, allowedRoles }
      );
      throw new Meteor.Error(
        'forbidden-role',
        'No tiene permisos para asignar este rol'
      );
    }

    try {
      await UsersCollection.updateAsync(
        { _id: this.userId },
        {
          $set: {
            role: role,
            updatedAt: new Date(),
          },
        }
      );

      await LogHelper.logSuccess(this.userId, 'users.updateRole', {
        newRole: role,
        timestamp: new Date(),
      });

      return { success: true, role };
    } catch (error) {
      await LogHelper.logError(
        this.userId,
        'users.updateRole',
        error instanceof Error ? error.message : 'Error desconocido',
        { attemptedRole: role }
      );

      throw new Meteor.Error(
        'update-failed',
        'Error al actualizar el rol del usuario'
      );
    }
  },
});
