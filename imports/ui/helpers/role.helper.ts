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
    value: 'manager',
    label: 'Creador de Torneos',
    description:
      'Podrás crear y administrar torneos, gestionar equipos participantes y controlar el desarrollo de competiciones.',
  },
  {
    value: 'referee',
    label: 'Árbitro',
    description:
      'Podrás dirigir partidos, registrar incidencias, tarjetas y goles durante los encuentros.',
  },
];

export const translateRole = (role: Role): string => {
  const roleMap: Record<Role, string> = {
    player: 'Jugador',
    manager: 'Creador de Torneos',
    referee: 'Árbitro',
    super_admin: 'Super Administrador',
  };

  // Eliminado owner
  return roleMap[role] || role;
};

export const getRoleInfo = (role: Role): RoleInfo | undefined => {
  // Eliminado owner
  return AVAILABLE_ROLES.find(r => r.value === role);
};
