import React from 'react';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
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
  tournament: {
    id: 'tournament',
    label: 'Torneos',
    icon: <EmojiEventsIcon />,
    path: APP_ROUTES.PRIVATE.TOURNAMENT,
  },
} as const satisfies Record<string, DockItem>;

/* ═══════════════════════════════════════════════════
   Mapeo rol → items del dock
   Por ahora todos comparten solo Inicio (Dashboard)
   ═══════════════════════════════════════════════════ */

export const DOCK_ITEMS_BY_ROLE: Record<Role, DockItem[]> = {
  player: [ITEMS.inicio, ITEMS.tournament],
  manager: [ITEMS.inicio, ITEMS.tournament],
  referee: [ITEMS.inicio, ITEMS.tournament],
  super_admin: [ITEMS.inicio, ITEMS.tournament],
};

/** Fallback cuando no hay rol asignado */
export const DEFAULT_DOCK_ITEMS: DockItem[] = [ITEMS.inicio];
