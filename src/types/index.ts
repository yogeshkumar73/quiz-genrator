export type UserTier = 'Normal' | 'Active' | 'VIP';

export interface UserSession {
  username: string;
  loginTime: number;
  lastActive: number;
}

export type EventType = 'CLICK' | 'VIEW' | 'SESSION' | 'ACTION';

export interface AppEvent {
  id: string;
  userId: string;
  eventType: EventType;
  timestamp: number;
  page?: string;
  metadata?: Record<string, any>;
}

export interface UserStats {
  score: number;
  tier: UserTier;
  totalClicks: number;
  pageViews: number;
  sessionTimeMinutes: number;
}

export interface QuizData {
  quiz: {
    topic: string;
    difficulty: string;
    questions: Array<{
      id: number;
      question: string;
      options: Array<{ id: number; text: string }>;
      correctAnswerId: number;
      correctAnswerText: string;
      explanation: string;
      difficulty: string;
      tags: string[];
    }>;
  };
  evaluationLogic: {
    rule: string;
    correctMessage: string;
    wrongMessage: string;
    showExplanation: boolean;
  };
}

export type Difficulty = 'easy' | 'medium' | 'hard';
