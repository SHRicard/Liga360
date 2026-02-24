import { Meteor } from 'meteor/meteor';
import { z } from 'zod';
import { UsersCollection } from '../collections/user.collections';
import { LogHelper } from '../helpers/log.helper';

// ── Schemas de validación ──
const UpdateRoleSchema = z.object({
  role: z.enum(['player', 'manager', 'referee']),
});

Meteor.methods({
  async 'users.updateRole'(args: unknown) {
    // Zod valida ANTES de ejecutar cualquier lógica
    const { role } = UpdateRoleSchema.parse(args);

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
