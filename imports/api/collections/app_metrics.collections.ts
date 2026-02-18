import { Mongo } from 'meteor/mongo';

export interface IAppMetrics {
  _id?: string;
  users: {
    total: number;
    players: number;
    admins: number;
    tournamentAdmins: number;
    superAdmins: number;
    online: number;
    suspended: number;
    blocked: number;
  };

  tournaments: {
    total: number;
    active: number;
    finished: number;
    cancelled: number;
    suspended: number;
  };

  matches: {
    total: number;
    scheduled: number;
    played: number;
    suspended: number;
  };

  financial: {
    totalRevenue: number;
    platformEarnings: number;
    prizePaid: number;
  };

  reports: {
    total: number;
    pending: number;
    resolved: number;
    escalated: number;
  };

  activity: {
    dailyActiveUsers: number;
    monthlyActiveUsers: number;
    newUsersToday: number;
    newUsersThisMonth: number;
  };

  updatedAt?: Date;
}

export const AppMetricsCollection = new Mongo.Collection<IAppMetrics>(
  'app_metrics'
);
