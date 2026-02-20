import { Meteor } from 'meteor/meteor';
import { z } from 'zod';
import { LogsCollection } from '../collections/logs.collections';
import { LogHelper } from '../helpers/log.helper';

const MAX_LOGS_LIMIT = 500;

// ── Schemas de validación ──
const GetUserLogsSchema = z.object({
  limit: z.number().int().positive().max(MAX_LOGS_LIMIT).optional(),
});

const GetLogsByActionSchema = z.object({
  action: z.string().min(1),
  limit: z.number().int().positive().max(MAX_LOGS_LIMIT).optional(),
});

const GetAllLogsSchema = z.object({
  limit: z.number().int().positive().max(MAX_LOGS_LIMIT).optional(),
  skip: z.number().int().nonnegative().optional(),
});

const CreateLogSchema = z.object({
  action: z.string().min(1),
  data: z.record(z.string(), z.unknown()).optional(),
});

Meteor.methods({
  async 'logs.getUserLogs'(args: unknown) {
    const { limit } = GetUserLogsSchema.parse(args);
    const finalLimit = Math.min(limit || 50, MAX_LOGS_LIMIT);

    if (!this.userId) {
      await LogHelper.logError(
        'SYSTEM',
        'logs.getUserLogs',
        'Usuario no autenticado'
      );
      throw new Meteor.Error('not-authorized', 'Debe estar autenticado');
    }

    const logs = await LogHelper.getUserLogs(this.userId, finalLimit);

    return logs;
  },

  async 'logs.getByAction'(args: unknown) {
    const { action, limit } = GetLogsByActionSchema.parse(args);
    const finalLimit = Math.min(limit || 50, MAX_LOGS_LIMIT);

    if (!this.userId) {
      await LogHelper.logError(
        'SYSTEM',
        'logs.getByAction',
        'Usuario no autenticado',
        { action }
      );
      throw new Meteor.Error('not-authorized', 'Debe estar autenticado');
    }

    const user = await Meteor.users.findOneAsync({ _id: this.userId });
    const userRole = (user as any)?.role;

    if (!['owner', 'super_admin'].includes(userRole)) {
      await LogHelper.logError(
        this.userId,
        'logs.getByAction',
        'Usuario sin permisos de administrador',
        { userRole, action }
      );
      throw new Meteor.Error(
        'forbidden',
        'No tiene permisos para realizar esta acción'
      );
    }

    const logs = await LogHelper.getLogsByAction(action, finalLimit);

    return logs;
  },

  async 'logs.getAll'(args: unknown) {
    const { limit, skip } = GetAllLogsSchema.parse(args);
    const finalLimit = Math.min(limit || 100, MAX_LOGS_LIMIT);
    const finalSkip = skip || 0;

    if (!this.userId) {
      await LogHelper.logError(
        'SYSTEM',
        'logs.getAll',
        'Usuario no autenticado'
      );
      throw new Meteor.Error('not-authorized', 'Debe estar autenticado');
    }

    const user = await Meteor.users.findOneAsync({ _id: this.userId });
    const userRole = (user as any)?.role;

    if (userRole !== 'super_admin') {
      await LogHelper.logError(
        this.userId,
        'logs.getAll',
        'Usuario no es super_admin',
        { userRole }
      );
      throw new Meteor.Error(
        'forbidden',
        'Solo los super administradores pueden ver todos los logs'
      );
    }

    const logs = await LogsCollection.find(
      {},
      { sort: { timestamp: -1 }, limit: finalLimit, skip: finalSkip }
    ).fetchAsync();

    return logs;
  },

  async 'logs.create'(args: unknown) {
    const { action, data } = CreateLogSchema.parse(args);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'Debe estar autenticado');
    }

    const logId = await LogHelper.logSuccess(this.userId, action, data);

    return logId;
  },
});
