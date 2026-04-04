export interface Option {
  id: number;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
  correctAnswerId: number;
  correctAnswerText: string;
  explanation: string;
  difficulty: string;
  tags: string[];
}

export interface QuizData {
  quiz: {
    topic: string;
    difficulty: string;
    questions: Question[];
  };
  evaluationLogic: {
    rule: string;
    correctMessage: string;
    wrongMessage: string;
    showExplanation: boolean;
  };
}

export type Difficulty = 'easy' | 'medium' | 'hard';
