import { useMemo } from 'react';
import { useUserStore } from '../contexts';
import { DOCK_ITEMS_BY_ROLE, DEFAULT_DOCK_ITEMS } from '../config/dockItems.config';
import type { DockItem } from '../components/molecules/floatingDock';

/**
 * Devuelve los items del dock según el rol del usuario logueado.
 * Si no hay rol asignado, retorna solo "Inicio".
 */
export const useDockItems = (): DockItem[] => {
  const role = useUserStore(state => state.user?.role);

  return useMemo(() => {
    if (!role) return DEFAULT_DOCK_ITEMS;
    return DOCK_ITEMS_BY_ROLE[role] ?? DEFAULT_DOCK_ITEMS;
  }, [role]);
};
