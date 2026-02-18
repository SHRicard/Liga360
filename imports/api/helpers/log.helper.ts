import { Meteor } from 'meteor/meteor';
import {
  LogsCollection,
  LogAction,
  ILog,
} from '../collections/logs.collections';

interface LogOptions {
  action: LogAction;
  data?: any;
  status?: 'success' | 'error';
  errorMessage?: string;
}

export class LogHelper {
  static async log(
    userId: string,
    options: LogOptions
  ): Promise<string | undefined> {
    if (!Meteor.isServer) {
      console.warn('LogHelper.log solo debe ejecutarse en el servidor');
      return;
    }

    try {
      const logEntry: ILog = {
        userId,
        action: options.action,
        timestamp: new Date(),
        data: options.data,
        status: options.status || 'success',
        errorMessage: options.errorMessage,
      };

      const logId = await LogsCollection.insertAsync(logEntry);
      return logId;
    } catch (error) {
      console.error('Error al registrar log:', error);
    }
  }

  static async logSuccess(
    userId: string,
    action: LogAction,
    data?: any
  ): Promise<string | undefined> {
    return this.log(userId, { action, data, status: 'success' });
  }
  static async logError(
    userId: string,
    action: LogAction,
    errorMessage: string,
    data?: any
  ): Promise<string | undefined> {
    return this.log(userId, { action, data, status: 'error', errorMessage });
  }
  static async getUserLogs(userId: string, limit = 50): Promise<ILog[]> {
    if (!Meteor.isServer) {
      throw new Meteor.Error(
        'server-only',
        'Este método solo está disponible en el servidor'
      );
    }

    return await LogsCollection.find(
      { userId },
      { sort: { timestamp: -1 }, limit }
    ).fetchAsync();
  }
  static async getLogsByAction(action: LogAction, limit = 50): Promise<ILog[]> {
    if (!Meteor.isServer) {
      throw new Meteor.Error(
        'server-only',
        'Este método solo está disponible en el servidor'
      );
    }

    return await LogsCollection.find(
      { action },
      { sort: { timestamp: -1 }, limit }
    ).fetchAsync();
  }

  static async cleanOldLogs(daysOld = 90): Promise<number> {
    if (!Meteor.isServer) {
      throw new Meteor.Error(
        'server-only',
        'Este método solo está disponible en el servidor'
      );
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    return await LogsCollection.removeAsync({ timestamp: { $lt: cutoffDate } });
  }
}
