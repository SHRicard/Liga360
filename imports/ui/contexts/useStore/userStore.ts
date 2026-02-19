import { create } from 'zustand';
import { Role } from '../../config';

export interface UserProfile {
  nombre: string;
  apellido: string;
  avatar: string;
}

export type TypeService = 'google' | 'mercadopago' | 'manual';

export interface AppUser {
  _id: string;
  emails: { address: string; verified: boolean }[];
  profile: UserProfile;
  typeService: TypeService;
  createdAt: Date;
  role?: Role;
}

interface UserState {
  user: AppUser | null;
  userId: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;

  // Acciones
  setUser: (user: AppUser | null) => void;
  setUserId: (userId: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  updateRole: (role: Role) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>(set => ({
  user: null,
  userId: null,
  isLoggedIn: false,
  isLoading: true,

  setUser: user =>
    set({
      user,
      userId: user?._id ?? null,
      isLoggedIn: !!user,
      isLoading: false,
    }),

  setUserId: userId => set({ userId }),

  setLoading: isLoading => set({ isLoading }),

  updateProfile: profile =>
    set(state => ({
      user: state.user
        ? { ...state.user, profile: { ...state.user.profile, ...profile } }
        : null,
    })),

  updateRole: role =>
    set(state => ({
      user: state.user ? { ...state.user, role } : null,
    })),

  clearUser: () =>
    set({
      user: null,
      userId: null,
      isLoggedIn: false,
      isLoading: false,
    }),
}));
