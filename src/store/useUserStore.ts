import { create } from 'zustand';
import { storage } from '../services/storage';

interface UserState {
  username: string | null;
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
  checkSession: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  username: null,
  isAuthenticated: false,
  login: (username: string) => {
    storage.setCurrentUser(username);
    set({ username, isAuthenticated: true });
  },
  logout: () => {
    storage.clearCurrentUser();
    set({ username: null, isAuthenticated: false });
  },
  checkSession: () => {
    const username = storage.getCurrentUser();
    if (username) {
      set({ username, isAuthenticated: true });
    }
  },
}));
