import { create } from 'zustand';
import { AppEvent, EventType } from '../types';
import { storage } from '../services/storage';

interface EventState {
  events: AppEvent[];
  addEvent: (userId: string, eventType: EventType, page?: string, metadata?: Record<string, any>) => void;
  loadEvents: () => void;
}

export const useEventStore = create<EventState>((set) => ({
  events: [],
  addEvent: (userId, eventType, page, metadata) => {
    const newEvent: AppEvent = {
        id: crypto.randomUUID(),
        userId,
        eventType,
        timestamp: Date.now(),
        page,
        metadata
    };
    storage.saveEvent(newEvent);
    set((state) => ({ events: [...state.events, newEvent] }));
  },
  loadEvents: () => {
    const events = storage.getEvents();
    set({ events });
  }
}));
