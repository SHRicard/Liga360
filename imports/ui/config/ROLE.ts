export type Role = 'player' | 'owner' | 'manager' | 'referee' | 'super_admin';

export const ROLE = {
  SUPER_ADMIN: 'super_admin',
  MANAGER: 'manager',
  REFEREE: 'referee',
  OWNER: 'owner',
  PLAYER: 'player',
} as const;
