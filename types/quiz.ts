export interface Question {
  id?: string;
  text: string;
  options: string[];
  correctAnswer: number;
  category: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  description: string;
  timeLimit: number;
  questions: Question[];
}

export interface Team {
  id: string;
  color: "red" | "blue" | "green" | "yellow";
  players: Player[];
  score: number;
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
}

export interface GameLobby {
  id: string;
  quizId: string;
  teams: Team[];
  status: "waiting" | "in-progress" | "completed";
  currentQuestionIndex: number;
  leaderId: string;
}

export type QuizCategory = "general" | "science" | "history" | "geography";

export interface Message {
  type: "user" | "system";
  text: string;
  player: {
    name: string;
    team?: string;
  };
  timestamp: string;
}

export interface QuizRoom {
  members: Player[];
  messages: Message[];
  quiz: Question[];
  quizStarted: boolean;
  currentQuestionIndex: number;
  answers: Map<string, string>;
  correctAnswers: Map<string, number>;
  timerDuration: number;
  timeLeft: number;
  leaderId: string;
  teams: Team[];
  status: string;
  socketToPlayer: Map<string, string>;
}
