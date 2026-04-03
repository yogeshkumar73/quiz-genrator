import { UserSession, AppEvent, UserStats } from '../types';

const STORAGE_KEYS = {
  SESSIONS: 'ai_quiz_sessions', // List of all users who have logged in
  CURRENT_USER: 'ai_quiz_current_user',
  EVENTS: 'ai_quiz_events',
  STATS: 'ai_quiz_stats', // Map of username to stats
};

export const storage = {
  // Session Management
  setCurrentUser: (username: string) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, username);
    const sessions = storage.getSessions();
    if (!sessions.includes(username)) {
      storage.saveSessions([...sessions, username]);
    }
  },

  getCurrentUser: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  },

  clearCurrentUser: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getSessions: (): string[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return data ? JSON.parse(data) : [];
  },

  saveSessions: (sessions: string[]) => {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  },

  // Events Management
  saveEvent: (event: AppEvent) => {
    const events = storage.getEvents();
    events.push(event);
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  },

  getEvents: (): AppEvent[] => {
    const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return data ? JSON.parse(data) : [];
  },

  getUserEvents: (username: string): AppEvent[] => {
    return storage.getEvents().filter(e => e.userId === username);
  },

  // Stats Management
  saveStats: (username: string, stats: UserStats) => {
    const allStats = storage.getAllStats();
    allStats[username] = stats;
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(allStats));
  },

  getUserStats: (username: string): UserStats | null => {
    const allStats = storage.getAllStats();
    return allStats[username] || null;
  },

  getAllStats: (): Record<string, UserStats> => {
    const data = localStorage.getItem(STORAGE_KEYS.STATS);
    return data ? JSON.parse(data) : {};
  },

  resetAll: () => {
    localStorage.clear();
  }
};
