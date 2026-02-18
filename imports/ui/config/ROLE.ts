export type Role = 'player' | 'admin' | 'tournament_admin' | 'super_admin';

export const ROLE = {
  SUPER_ADMIN: 'super_admin',
  TOURNAMENT_ADMIN: 'tournament_admin',
  ADMIN: 'admin',
  PLAYER: 'player',
} as const;
