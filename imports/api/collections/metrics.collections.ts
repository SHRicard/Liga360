import { Mongo } from 'meteor/mongo';

export interface PlayerMetrics {
  matches: {
    played: number;
    won: number;
    lost: number;
    draw: number;
  };
  offensive: {
    goals: number;
    assists: number;
    shots: number;
  };
  defensive: {
    tackles: number;
    interceptions: number;
    cleanSheets: number;
  };
  discipline: {
    yellowCards: number;
    redCards: number;
    foulsCommitted: number;
  };
  achievements: {
    mvpAwards: number;
    tournamentsWon: number;
  };
}

export interface AdminMetrics {
  moderation: {
    usersReviewed: number;
    bansIssued: number;
    warningsIssued: number;
  };
  tournaments: {
    approved: number;
    rejected: number;
    suspended: number;
  };
  reports: {
    handled: number;
    resolved: number;
    escalated: number;
  };
  system: {
    manualAdjustments: number;
    criticalActions: number;
  };
}

export interface TournamentAdminMetrics {
  tournaments: {
    created: number;
    published: number;
    finished: number;
    cancelled: number;
    suspended: number;
  };
  teams: {
    totalRegistered: number;
    averagePerTournament: number;
  };
  matches: {
    organized: number;
    rescheduled: number;
    suspended: number;
  };
  financial: {
    totalRevenue: number;
    totalPrizePaid: number;
    platformFeesGenerated: number;
  };
  reputation: {
    ratingAverage: number;
    ratingsCount: number;
    reportsReceived: number;
  };
}

export type RoleMetricsMap = {
  player: PlayerMetrics;
  admin: AdminMetrics;
  tournament_admin: TournamentAdminMetrics;
};
export type MetricsRole = keyof RoleMetricsMap;

export interface IMetrics<R extends MetricsRole = MetricsRole> {
  _id?: string;
  userId: string;
  role: R;
  stats: RoleMetricsMap[R];
  performance?: {
    rating: number;
    level: number;
    experience: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export const MetricsCollection = new Mongo.Collection<IMetrics>('metrics');
