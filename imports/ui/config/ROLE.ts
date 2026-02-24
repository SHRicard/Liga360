export type Role = 'player' | 'manager' | 'referee' | 'super_admin';

export const ROLE = {
  SUPER_ADMIN: 'super_admin',
  MANAGER: 'manager',
  REFEREE: 'referee',
  PLAYER: 'player',
} as const;
