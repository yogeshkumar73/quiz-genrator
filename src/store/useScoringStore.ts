import { create } from 'zustand';
import { UserStats, UserTier, AppEvent } from '../types';
import { storage } from '../services/storage';

interface ScoringState {
  userStats: Record<string, UserStats>;
  calculateScore: (username: string, events: AppEvent[]) => void;
  getTier: (score: number) => UserTier;
  loadStats: () => void;
}

export const useScoringStore = create<ScoringState>((set, get) => ({
  userStats: {},
  getTier: (score: number): UserTier => {
    if (score >= 200) return 'VIP';
    if (score >= 50) return 'Active';
    return 'Normal';
  },
  calculateScore: (username: string, events: AppEvent[]) => {
    const userEvents = events.filter(e => e.userId === username);
    
    let score = 0;
    let totalClicks = 0;
    let pageViews = 0;
    
    userEvents.forEach(event => {
      switch (event.eventType) {
        case 'CLICK':
          score += 1;
          totalClicks += 1;
          break;
        case 'VIEW':
          score += 2;
          pageViews += 1;
          break;
        case 'ACTION':
          score += 5;
          break;
      }
    });

    // Time-based scoring (dummy calculation for now based on session events)
    const sessionTimeMinutes = Math.floor(userEvents.length / 2); // Simple proxy
    score += Math.floor(sessionTimeMinutes / 5) * 3;

    const stats: UserStats = {
      score,
      tier: get().getTier(score),
      totalClicks,
      pageViews,
      sessionTimeMinutes
    };

    storage.saveStats(username, stats);
    set((state) => ({
      userStats: { ...state.userStats, [username]: stats }
    }));
  },
  loadStats: () => {
    const stats = storage.getAllStats();
    set({ userStats: stats });
  }
}));
