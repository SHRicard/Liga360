import { Role } from '../config';

interface RoleInfo {
  value: Role;
  label: string;
  description: string;
}

export const AVAILABLE_ROLES: RoleInfo[] = [
  {
    value: 'player',
    label: 'Jugador',
    description:
      'Podrás participar en torneos, unirte a equipos y gestionar tu perfil de jugador.',
  },
  {
    value: 'admin',
    label: 'Propietario',
    description:
      'Podrás gestionar tus canchas, horarios, reservas y configuraciones de tu establecimiento.',
  },
  {
    value: 'tournament_admin',
    label: 'Creador de Torneos',
    description:
      'Podrás crear y administrar torneos, gestionar equipos participantes y controlar el desarrollo de competiciones.',
  },
];

export const translateRole = (role: Role): string => {
  const roleMap: Record<Role, string> = {
    player: 'Jugador',
    admin: 'Propietario',
    tournament_admin: 'Creador de Torneos',
    super_admin: 'Super Administrador',
  };

  return roleMap[role] || role;
};

export const getRoleInfo = (role: Role): RoleInfo | undefined => {
  return AVAILABLE_ROLES.find(r => r.value === role);
};
