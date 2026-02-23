import { create } from 'zustand';
import type { IInstitution } from '/imports/api/collections/institutions.collections';

interface InstitutionState {
  institutions: IInstitution[];
  isLoading: boolean;

  // Acciones
  setInstitutions: (institutions: IInstitution[]) => void;
  setLoading: (isLoading: boolean) => void;
  clear: () => void;
}

export const useInstitutionStore = create<InstitutionState>(set => ({
  institutions: [],
  isLoading: true,

  setInstitutions: institutions =>
    set({
      institutions,
      isLoading: false,
    }),

  setLoading: isLoading => set({ isLoading }),

  clear: () =>
    set({
      institutions: [],
      isLoading: false,
    }),
}));
