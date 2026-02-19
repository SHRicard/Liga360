import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export type LogAction = string;

export interface ILog {
  _id?: string;
  userId: string;
  action: LogAction;
  timestamp: Date;
  data?: any;
  ip?: string;
  userAgent?: string;
  status?: 'success' | 'error';
  errorMessage?: string;
}

export const LogsCollection = new Mongo.Collection<ILog>('logs');

if (Meteor.isServer) {
  LogsCollection.createIndexAsync({ userId: 1, timestamp: -1 });
  LogsCollection.createIndexAsync({ action: 1, timestamp: -1 });
  LogsCollection.createIndexAsync({ timestamp: -1 });
}
