import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LogsCollection, LogAction } from '../collections/logs.collections';
import { LogHelper } from '../helpers/log.helper';

export const getUserLogs = new ValidatedMethod({
  name: 'logs.getUserLogs',
  validate: null,
  async run({ limit }: { limit?: number }) {
    const finalLimit = limit || 50;

    if (!this.userId) {
      await LogHelper.logError(
        'SYSTEM',
        'logs.getUserLogs',
        'Usuario no autenticado'
      );
      throw new Meteor.Error('not-authorized', 'Debe estar autenticado');
    }

    const logs = await LogHelper.getUserLogs(this.userId, finalLimit);

    await LogHelper.logSuccess(this.userId, 'logs.getUserLogs', {
      logsCount: logs.length,
      limit: finalLimit,
    });

    return logs;
  },
});

export const getLogsByAction = new ValidatedMethod({
  name: 'logs.getByAction',
  validate: null,
  async run({ action, limit }: { action: LogAction; limit?: number }) {
    const finalLimit = limit || 50;

    if (!this.userId) {
      await LogHelper.logError(
        'SYSTEM',
        'logs.getByAction',
        'Usuario no autenticado',
        {
          action,
        }
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

    await LogHelper.logSuccess(this.userId, 'logs.getByAction', {
      action,
      logsCount: logs.length,
      limit: finalLimit,
    });

    return logs;
  },
});

export const getAllLogs = new ValidatedMethod({
  name: 'logs.getAll',
  validate: null,
  async run({ limit, skip }: { limit?: number; skip?: number }) {
    const finalLimit = limit || 100;
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

    await LogHelper.logSuccess(this.userId, 'logs.getAll', {
      logsCount: logs.length,
      limit: finalLimit,
      skip: finalSkip,
    });

    return logs;
  },
});

export const createLog = new ValidatedMethod({
  name: 'logs.create',
  validate: null,
  async run({ action, data }: { action: LogAction; data?: any }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'Debe estar autenticado');
    }

    const logId = await LogHelper.logSuccess(this.userId, action, data);

    return logId;
  },
});
