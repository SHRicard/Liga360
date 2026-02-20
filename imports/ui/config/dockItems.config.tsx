import React from 'react';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { APP_ROUTES } from './APP_ROUTES';
import type { Role } from './ROLE';
import type { DockItem } from '../components/molecules/floatingDock';

/* ═══════════════════════════════════════════════════
   Catálogo de items del dock
   Se irán agregando a medida que se desarrollen páginas
   ═══════════════════════════════════════════════════ */

const ITEMS = {
  inicio: {
    id: 'inicio',
    label: 'Inicio',
    icon: <DashboardRoundedIcon />,
    path: APP_ROUTES.PRIVATE.DASHBOARD,
  },
  instituciones: {
    id: 'instituciones',
    label: 'Instituciones',
    icon: <AddLocationAltIcon />,
    path: APP_ROUTES.PRIVATE.INSTITUTIONS,
  },
} as const satisfies Record<string, DockItem>;

/* ═══════════════════════════════════════════════════
   Mapeo rol → items del dock
   Por ahora todos comparten solo Inicio (Dashboard)
   ═══════════════════════════════════════════════════ */

export const DOCK_ITEMS_BY_ROLE: Record<Role, DockItem[]> = {
  player: [ITEMS.inicio],
  owner: [ITEMS.inicio, ITEMS.instituciones],
  manager: [ITEMS.inicio],
  referee: [ITEMS.inicio],
  super_admin: [ITEMS.inicio],
};

/** Fallback cuando no hay rol asignado */
export const DEFAULT_DOCK_ITEMS: DockItem[] = [ITEMS.inicio];
